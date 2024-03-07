const express = require('express');
const UserService = require("../services/user-service")
const SiteService = require("../services/site-service");
const DroneService = require("../services/drone-service");
const MissionService = require("../services/mission-service");
const CategoryService = require('../services/category-service')
const {authenticateJWT} = require('../middleware/authentication');
const Site = require('../models/site');

const router = express.Router();

module.exports = app => {
    
    router.post('/createUser', UserService.createUser);
    router.post('/loginUser', UserService.loginUser);

    router.use(authenticateJWT);


    // Site resource
    
    router.post('/site/create', SiteService.createSite);
    router.post('/site/addSiteByUserIdSiteId', SiteService.addSiteByUserIdSiteId);
    // router.get('/site/getSiteById/:id', SiteService.getSiteByUserId);
    router.post('/site/delete', SiteService.deleteSiteByUserIdSiteId);
    router.post('/site/update', SiteService.updateSiteByUserIdSiteId);

    //Drone resource

    router.post('/drone/create', DroneService.createDrone);
    router.post('/drone/updateDroneFromSiteToSiteByUserIdSiteId', DroneService.updateDroneFromSiteToSiteByUserIdSiteId);
    router.get('/drone/getDroneBySiteId', DroneService.getDroneBySiteId);
    router.post('/drone/addDroneByUserIdSiteId', DroneService.addDroneByUserIdSiteId);
    router.post('/drone/updateDroneByUserIdSiteId', DroneService.updateDroneByUserIdSiteId);
    router.post('/drone/deleteDroneByUserIdSiteId', DroneService.deleteDroneByUserIdSiteId);

    // Mission service
    
    router.post('/mission/create', MissionService.createMission);
    router.get('/mission/getMissionBySiteId', MissionService.getMissionBySiteId);
    router.post('/mission/addMissionByUserIdSiteId', MissionService.addMissionByUserIdSiteId);
    router.post('/mission/updateMissionByUserIdSiteId', MissionService.updateMissionByUserIdSiteId);
    router.post('/mission/deleteMissionByUserIdSiteId', MissionService.deleteMissionByUserIdSiteId);

    //Category service

    router.post('/category/create', CategoryService.createCategory);
    router.get('/category/getMissionByCategoryId', CategoryService.getMissionByCategoryId);
    router.get('/category/getDronesByCategoryId', CategoryService.getDronesByCategoryId);

    app.use(router);

}