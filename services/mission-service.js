const Mission = require('../models/mission');
const SiteMission = require('../models/siteMission');
const Joi = require('joi');

// Route to create a new mission

const missionSchema = Joi.object({
    missionId: Joi.number().required(),
    alt: Joi.string().required(),
    speed: Joi.string().required(),
    name: Joi.string().required(),
    categoryId:Joi.number().required(),
});

const createMission = async (req, res) => {
    try {
        const { error } = missionSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }
        const existingMission = await Mission.findOne({ missionId: req.body.missionId, alt:req.body.alt, name:req.body.name, speed:req.body.speed, categoryId:req.body.categoryId});
        if (existingMission) {
            return res.status(409).json({ error: 'This Mission already exists' });
        }
        const newMission = await Mission.create(req.body);
        if (!newMission) {
            return res.status(500).json({ error: "Internal Server Error, creation failed" });
        }
        res.status(201).json({ message: "Creation successfull", createdObj: newMission});
    } catch (error) {
        console.error('Error creating mission:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}
// Route to get a specific mission by ID

const findBySiteSchema = Joi.object({
    siteId: Joi.number().required(),
});
const getMissionBySiteId =  async (req, res) => {
    try {
        const { error } = findBySiteSchema.validate(req.params.siteId);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }
        const missions = await SiteMission.find({siteId:req.params.siteId});
        if (!missions) {
            return res.status(404).json({ error: 'Missions not found' });
        }
        const missionIds = missions.map(mission=> mission.missionId);

        const missionArr = await Mission.find({ missionId: { $in: missionIds } });
        
        res.status(200).json({ missions: missionArr });
    } catch (error) {
        console.error('Error fetching mission:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

const userIdSiteIdMissionIdSchema = Joi.object({
    userId: Joi.number().required(),
    siteId: Joi.number().required(),
    missionId:Joi.number().required()
});

const addMissionByUserIdSiteId = async (req, res) => {
    const { error } = userIdSiteIdMissionIdSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    
    try {
        const existingSiteMission = await SiteMission.findOne({ userId: req.body.userId, siteId: req.body.siteId, missionId:req.body.missionId});
        if (existingSiteMission) {
            return res.status(409).json({ error: 'This SiteMission already exists' });
        }
        const addedSiteMission = await SiteMission.create({ userId: req.body.userId, siteId: req.body.siteId,  missionId:req.body.missionId});
        res.status(201).json({ message: 'Added mission under site successfully', addedObj:addedSiteMission});
    } catch (error) {
        console.error('Error adding site:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

const updateMissionByUserIdSiteId = async (req, res) => {
    const { error } = userIdSiteIdMissionIdSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    
    try {
        const existingSiteMission = await SiteMission.findOne({ userId: req.body.userId, siteId: req.body.siteId, missionId:req.body.missionId});
        if (existingSiteMission) {
            return res.status(409).json({ error: 'This SiteMission already exists' });
        }
        const foundMission = await Mission.findOne({ missionId:req.body.missionId});
        if (!foundMission) {
            return res.status(404).json({ error: 'Mission not found' });
        }
        const newUpdatedAt = new Date();
        const newName = req.body.name || foundMission.name;
        const newAlt = req.body.alt || foundMission.alt;
        const newSpeed = req.body.speed || foundMission.speed;
        const newWaypoints = req.body.waypoints || foundMission.waypoints;

        foundMission.updatedAt = newUpdatedAt;
        foundMission.name = newName;
        foundMission.alt = newAlt;
        foundMission.speed = newSpeed;
        foundMission.waypoints = newWaypoints
        existingSiteMission.updatedAt = newUpdatedAt

        await SiteMission.save(existingSiteMission);
        await Mission.save(foundMission);

        res.status(200).json({ message: 'Updated mission under site successfully', addedObj: addedSite });
    } catch (error) {
        console.error('Error adding site:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}


const deleteMissionByUserIdSiteId = async (req, res) => {
    const { error } = userIdSiteIdMissionIdSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    try {
        const deletedSiteMission = await SiteMission.deleteOne({ userId: req.body.userId, siteId: req.body.siteId,  missionId:req.body.missionId});
        if (!deletedSiteMission) {
            return res.status(404).json({ error: 'This SiteMission does not exists' });
        }
        res.status(200).json({ message: 'Deleted mission under site successfully', deletedMission: foundMission });
    } catch (error) {
        console.error('Error adding site:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}


module.exports = {deleteMissionByUserIdSiteId, updateMissionByUserIdSiteId,addMissionByUserIdSiteId, createMission, getMissionBySiteId};