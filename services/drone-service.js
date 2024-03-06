const Drone = require('../models/drone');
const SiteDrone = require('../models/siteDrone');

const Joi = require('joi');

const droneSchema = Joi.object({
    droneId: Joi.number().required(),
    name: Joi.string().required(),
});

const createDrone = async (req, res) => {
    try {
        const { error } = droneSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }
        const existingDrone = await Drone.findOne({ droneId: req.body.droneId, name:req.body.name});
        if (existingDrone) {
            return res.status(409).json({ error: 'This Drone already exists' });
        }
        const newDrone = await Drone.create(req.body);
        if (!newDrone) {
            return res.status(500).json({ error: "Internal Server Error, creation failed" });
        }

        res.status(201).json({ message: "Creation successfull", createdObj: newDrone});
    } catch (error) {
        console.error('Error creating drone:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

// Route to get all drones
const getAllDrones =  async (req, res) => {
    try {
        const drones = await Drone.find();
        res.status(200).json(drones);
    } catch (error) {
        console.error('Error fetching drones:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

// Route to get a specific drone by ID
// const getDroneBySiteId = async (req, res) => {
//     const { error } = droneSchema.validate(req.params.id);
//     if (error) {
//         return res.status(400).json({ error: error.details[0].message });
//     }
//     try {
//         const drone = await Drone.findById(req.params.id);
//         if (!drone) {
//             return res.status(404).json({ error: 'Drone not found' });
//         }
//         res.status(200).json(drone);
//     } catch (error) {
//         console.error('Error fetching drone:', error);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// }

// Route to update a drone by ID
const updateDroneById = async (req, res) => {
    try {
        const updatedDrone = await Drone.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedDrone) {
        return res.status(404).json({ error: 'Drone not found' });
        }
        res.json(updatedDrone);
    } catch (error) {
        console.error('Error updating drone:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

// Route to delete a drone by ID
const deleteDroneById =  async (req, res) => {
    try {
        const deletedDrone = await Drone.findByIdAndDelete(req.params.id);
        if (!deletedDrone) {
        return res.status(404).json({ error: 'Drone not found' });
        }
        res.json({ message: 'Drone deleted successfully' });
    } catch (error) {
        console.error('Error deleting drone:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}


const findBySiteSchema = Joi.object({
    siteId: Joi.number().required(),
});

const getDroneBySiteId =  async (req, res) => {
    try {
        const { error } = findBySiteSchema.validate(req.params.siteId);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }
        const drones = await SiteDrone.find({siteId:req.params.siteId});
        if (!drones) {
            return res.status(404).json({ error: 'Drones not found' });
        }
        let droneArr = [];
        for (let droneEle of drones) {
            droneArr.push(await Drone.findOne({siteId:droneEle.siteId}))
        }
        
        res.status(200).json({ drones: droneArr });
    } catch (error) {
        console.error('Error fetching mission:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

const userIdSiteIdDroneIdSchema = Joi.object({
    userId: Joi.number().required(),
    siteId: Joi.number().required(),
    droneId:Joi.number().required()
});

const addDroneByUserIdSiteId = async (req, res) => {
    const { error } = userIdSiteIdDroneIdSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    
    try {
        const existingSiteDrone = await SiteDrone.findOne({ userId: req.body.userId, siteId: req.body.siteId, droneId:req.body.droneId});
        if (existingSiteDrone) {
            return res.status(409).json({ error: 'This SiteDrone already exists' });
        }
        const addedSite = await SiteDrone.create({ userId: req.body.userId, siteId: req.body.siteId, droneId:req.body.droneId});
        res.status(201).json({ message: 'Added drone under site successfully', addedObj:addedSite});
    } catch (error) {
        console.error('Error adding site:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

const updateDroneSiteToSiteSchema = Joi.object({
    userId: Joi.number().required(),
    prevSiteId: Joi.number().required(),
    droneId: Joi.number().required(),
    newSiteId:Joi.number().required(),
});

const updateDroneFromSiteToSiteByUserIdSiteId = async (req, res) => {
    const { error } = updateDroneSiteToSiteSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    
    try {
        const existingSiteDrone = await SiteDrone.findOne({ userId: req.body.userId, siteId: req.body.prevSiteId, droneId:req.body.droneId});
        if (!existingSiteDrone) {
            return res.status(409).json({ error: 'No SiteDrone already exists' });
        }
        const newUpdatedAt = new Date();
        existingSiteDrone.siteId = req.body.newSiteId
        existingSiteDrone.updatedAt = newUpdatedAt
        
        await SiteDrone.save(existingSiteDrone);

        res.status(200).json({ message: 'Updated drone under site successfully', addedObj: existingSiteDrone });
    } catch (error) {
        console.error('Error adding site:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

const updateDroneByUserIdSiteId = async (req, res) => {
    const { error } = userIdSiteIdDroneIdSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    
    try {
        const existingSiteDrone = await SiteDrone.findOne({ userId: req.body.userId, siteId: req.body.siteId, droneId:req.body.droneId});
        if (existingSiteDrone) {
            return res.status(409).json({ error: 'This SiteDrone already exists' });
        }
        const foundDrone = await Drone.findOne({ droneId:req.body.droneId});
        if (!foundDrone) {
            return res.status(404).json({ error: 'Drone not found' });
        }
        const newUpdatedAt = new Date();
        const newName = req.body.name || foundDrone.name;
        const newDroneType = req.body.droneType || foundDrone.droneType;
        foundDrone.updatedAt = newUpdatedAt;
        foundDrone.name = newName;
        foundDrone.droneType = newDroneType;
        
        await Drone.save(foundDrone);

        res.status(200).json({ message: 'Updated drone under site successfully', addedObj: addedSite });
    } catch (error) {
        console.error('Error adding site:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}


const deleteDroneByUserIdSiteId = async (req, res) => {
    const { error } = userIdSiteIdDroneIdSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    try {
        const deltedSiteDrone = await SiteDrone.deleteOne({ userId: req.body.userId, siteId: req.body.siteId, droneId:req.body.droneId});
        if (!deltedSiteDrone) {
            return res.status(404).json({ error: 'This SiteDrone does not exists' });
        }
        res.status(200).json({ message: 'Deleted drone under site successfully', deletedDrone: foundDrone });
    } catch (error) {
        console.error('Error adding site:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}


module.exports = {updateDroneFromSiteToSiteByUserIdSiteId,updateDroneByUserIdSiteId, addDroneByUserIdSiteId, deleteDroneByUserIdSiteId, deleteDroneById, createDrone, updateDroneById, getAllDrones, getDroneBySiteId};


