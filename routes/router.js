const express = require('express');
const UserService = require("../services/user-service")
const SiteService = require("../services/site-service");
const DroneService = require("../services/drone-service");
const MissionService = require("../services/mission-service");

const {authenticateJWT} = require('../middleware/authentication');
const Site = require('../models/site');

const router = express.Router();

module.exports = app => {
    
    router.post('/createUser', UserService.createUser);
    router.post('/loginUser', UserService.loginUser);

    router.use(authenticateJWT);


    // Site resource
    
    router.post('/site/create', SiteService.createSite);
    router.get('/site/getAllSites', SiteService.getAllSites);
    router.get('/site/getSiteById/:id', SiteService.getSiteById);
    router.delete('/site/delete/:id', SiteService.deleteSite);
    router.put('/site/update/:id', SiteService.updateSite);

    //Drone resource

    router.post('/drone/create', DroneService.createDrone);
    router.get('/drone/getAllDrones', DroneService.getAllDrones);
    router.get('/drone/getAllDroneById/:id', DroneService.getDroneById);
    router.delete('/drone/delete/:id', DroneService.deleteDroneById);
    router.put('/drone/update/:id', DroneService.updateDroneById);

    // Mission service
    
    router.post('/mission/create', MissionService.createMission);
    router.post('/mission/getMissionById', MissionService.getMissionById);
    router.get('/mission/getAllMissions/:id', MissionService.getAllMissions);
    router.delete('/mission/delete/:id', MissionService.deleteMissionById);
    router.put('/mission/update/:id', MissionService.updateMissionById);




    app.use(router);

}