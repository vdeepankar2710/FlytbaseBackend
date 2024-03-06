const Category = require('../models/category');
const Mission = require('../models/mission');
const DroneMission = require('../models/droneMission');
const Drone = require('../models/drone');

const Joi = require('joi');
// Route to create a new site

const categorySchema = Joi.object({
    categoryId: Joi.number().required(),
    name:Joi.string().required(),
});

const createCategory = async (req, res) => {
    try {
        const { error } = categorySchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }
        const existingCategory = await Category.findOne({ name:req.body.name, categoryId:req.body.categoryId});
        if (existingCategory) {
            return res.status(409).json({ error: 'This Category already exists' });
        }
        const newCategory = await Category.create(req.body);
        if (!newCategory) {
            return res.status(500).json({ error: "Internal Server Error, creation failed" });
        }
        res.status(201).json({ message: "Creation successfull", createdObj: newCategory});
    } catch (error) {
        console.error('Error creating category:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

const findByCategorySchema = Joi.object({
   categoryId: Joi.number().required(),
});

const getMissionByCategoryId =  async (req, res) => {
    try {
        const { error } = findByCategorySchema.validate(req.params.categoryId);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }
        const missions = await Mission.find({categoryId: req.params.categoryId});
        if (!missions) {
            return res.status(404).json({ error: 'missions not found' });
        }

        res.status(200).json({ missions: missions });
    } catch (error) {
        console.error('Error fetching mission:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}


const getDronesByCategoryId =  async (req, res) => {
    try {
        const { error } = findByCategorySchema.validate(req.params.categoryId);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }
        const missions = await Mission.find({categoryId: req.params.categoryId});
        if (!missions) {
            return res.status(404).json({ error: 'missions not found' });
        }
        const missionIds = missions.map(mission=> mission.missionId);

        const droneMissions = await DroneMission.find({ missionId: { $in: missionIds } });
        if (!droneMissions) {
            return res.status(404).json({ error: 'DroneMissions not found' });
        }
        
        const droneIds = droneMissions.map(droneMissionEle => droneMissionEle.droneId);
        
        const drones = await Drone.find({ droneId: { $in: droneIds } });
        if (!drones) {
            return res.status(404).json({ error: 'No drones found for the category requested' });
        }

        res.status(200).json({ drones: drones });
    } catch (error) {
        console.error('Error fetching drones:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}




module.exports = {createCategory, getMissionByCategoryId, getDronesByCategoryId}
