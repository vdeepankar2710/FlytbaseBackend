const Drone = require('../models/drone');
const Joi = require('joi');

const droneSchema = Joi.object({
    droneId: Joi.string().required(),
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
        res.json(drones);
    } catch (error) {
        console.error('Error fetching drones:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

// Route to get a specific drone by ID
const getDroneById = async (req, res) => {
    try {
        const drone = await Drone.findById(req.params.id);
        if (!drone) {
        return res.status(404).json({ error: 'Drone not found' });
        }
        res.json(drone);
    } catch (error) {
        console.error('Error fetching drone:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

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

module.exports = {deleteDroneById, createDrone, updateDroneById, getAllDrones, getDroneById};


