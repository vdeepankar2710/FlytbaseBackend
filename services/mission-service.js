const Mission = require('../models/mission');

const Joi = require('joi');

// Route to create a new mission

const missionSchema = Joi.object({
    missionId: Joi.number().required(),
    alt: Joi.string().required(),
    speed: Joi.string().required(),
    name: Joi.string().required(),
});

const createMission = async (req, res) => {
    try {
        const { error } = missionSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }
        const existingMission = await Mission.findOne({ missionId: req.body.missionId, alt:req.body.alt, name:req.body.name, speed:req.body.speed});
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

// Route to get all missions
const getAllMissions = async (req, res) => {
  try {
    const missions = await Mission.find();
    res.json(missions);
  } catch (error) {
    console.error('Error fetching missions:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

// Route to get a specific mission by ID
const getMissionById =  async (req, res) => {
  try {
    const mission = await Mission.findById(req.params.id);
    if (!mission) {
      return res.status(404).json({ error: 'Mission not found' });
    }
    res.json(mission);
  } catch (error) {
    console.error('Error fetching mission:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

// Route to update a mission by ID
const updateMissionById = async (req, res) => {
  try {
    const updatedMission = await Mission.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedMission) {
      return res.status(404).json({ error: 'Mission not found' });
    }
    res.json(updatedMission);
  } catch (error) {
    console.error('Error updating mission:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

// Route to delete a mission by ID
const  deleteMissionById =  async (req, res) => {
  try {
    const deletedMission = await Mission.findByIdAndDelete(req.params.id);
    if (!deletedMission) {
      return res.status(404).json({ error: 'Mission not found' });
    }
    res.json({ message: 'Mission deleted successfully' });
  } catch (error) {
    console.error('Error deleting mission:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}


module.exports = {deleteMissionById, createMission, updateMissionById, getAllMissions, getMissionById};