const Site = require('../models/site');
const SiteUser = require('../models/siteUser');
const Joi = require('joi');
// Route to create a new site

const siteSchema = Joi.object({
    sitename: Joi.string().required(),
    siteId:Joi.number().required(),
    lattitude: Joi.number().required(),
    longitude: Joi.number().required(),
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

// const siteByUserSchema = Joi.object({
//     userId: Joi.number().required(),
// });

// Route to get a specific site by ID
// const getSiteByUserId =  async (req, res) => {
//     const { error } = siteByUserSchema.validate(req.params.userId);
//     if (error) {
//         return res.status(400).json({ error: error.details[0].message });
//     }
//     try {
//         const site = await SiteUser.find({userId: req.params.userId});
//         if (!site) {
//             return res.status(404).json({ error: `No Sites found for userId ${req.params.userId}` });
//         }
//         res.status(200).json(site);
//     } catch (error) {
//         console.error('Error fetching site:', error);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// }


// Route to update a site by ID

const siteByUserIdSiteIdSchema = Joi.object({
    userId: Joi.number().required(),
    siteId: Joi.number().required(),
});

const addSiteByUserIdSiteId = async (req, res) => {
    const { error } = siteByUserIdSiteIdSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    
    try {
        const existingSiteUser = await SiteUser.findOne({ userId: req.body.userId, siteId: req.body.siteId});
        if (existingSiteUser) {
            return res.status(409).json({ error: 'This SiteUser already exists' });
        }
        const addedSiteUser = await SiteUser.create({ userId: req.body.userId, siteId: req.body.siteId});
        res.status(201).json({ message: 'Added site under user successfully', addedObj:addedSiteUser});
    } catch (error) {
        console.error('Error adding site:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}



const updateSiteByUserIdSiteId = async (req, res) => {
    const { error } = siteByUserIdSiteIdSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    
    try {
        const foundSiteUser = await SiteUser.findOne({ userId: req.body.userId, siteId: req.body.siteId });
         
        if (!foundSiteUser) {
            return res.status(404).json({ error: 'SiteUser not found' });
        }
        const foundSite = await Site.findOne({ siteId: req.body.siteId });
         
        if (!foundSite) {
            return res.status(404).json({ error: 'Site not found' });
        }

        const newSiteName = req.body.sitename || foundSite.sitename;
        const newUpdatedAt = new Date();
        foundSite.sitename = newSiteName;
        foundSite.updatedAt = newUpdatedAt;
        await foundSite.save();

        res.status(200).json({ message:"updated site is::", site:foundSite });
    } catch (error) {
        console.error('Error updating site:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

// Route to delete a site by ID
const deleteSiteByUserIdSiteId = async (req, res) => {
    const { error } = siteByUserIdSiteIdSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    
    try {
        const deletedSite = await SiteUser.deleteOne({ userId: req.body.userId, siteId: req.body.siteId });
        if (!deletedSite) {
            return res.status(404).json({ error: 'No sites to be deleted' });
        }
        res.status(200).json({ message: 'Site deleted successfully', deleteCount:deletedSite });
    } catch (error) {
        console.error('Error deleting site:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}



module.exports = {deleteSiteByUserIdSiteId, createSite, updateSiteByUserIdSiteId, addSiteByUserIdSiteId};
