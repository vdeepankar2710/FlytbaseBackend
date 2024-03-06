const Site = require('../models/site');

const Joi = require('joi');
// Route to create a new site

const siteSchema = Joi.object({
    sitename: Joi.string().required(),
    siteId:Joi.number().required(),
    lattitude: Joi.number().required(),
    longitude: Joi.number().required()
});

const createSite = async (req, res) => {
    try {
        const { error } = siteSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }
        const existingSite = await Site.findOne({ sitename: req.body.sitename, siteId:req.body.siteId, lattitude:req.body.lattitude, longitude:req.body.longitude});
        if (existingSite) {
            return res.status(409).json({ error: 'This Site already exists' });
        }
        const newSite = await Site.create(req.body);
        if (!newSite) {
            return res.status(500).json({ error: "Internal Server Error, creation failed" });
        }
        res.status(201).json({ message: "Creation successfull", createdObj: newSite});
    } catch (error) {
        console.error('Error creating site:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

// Route to get all sites
const getAllSites = async (req, res) => {
    try {
        const sites = await Site.find();
        res.json(sites);
    } catch (error) {
        console.error('Error fetching sites:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

// Route to get a specific site by ID
const getSiteById =  async (req, res) => {
    try {
        const site = await Site.findById(req.params.id);
        if (!site) {
            return res.status(404).json({ error: 'Site not found' });
        }
        res.json(site);
    } catch (error) {
        console.error('Error fetching site:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

// Route to update a site by ID
const updateSite = async (req, res) => {
    try {
        const updatedSite = await Site.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedSite) {
            return res.status(404).json({ error: 'Site not found' });
        }
        res.json(updatedSite);
    } catch (error) {
        console.error('Error updating site:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

// Route to delete a site by ID
const deleteSite =  async (req, res) => {
    try {
        const deletedSite = await Site.findByIdAndDelete(req.params.id);
        if (!deletedSite) {
            return res.status(404).json({ error: 'Site not found' });
        }
        res.json({ message: 'Site deleted successfully' });
    } catch (error) {
        console.error('Error deleting site:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}


module.exports = {deleteSite, createSite, updateSite, getAllSites, getSiteById};
