// routes/visits.js
const express = require('express');
const router = express.Router();
const visitController = require('../controllers/visitController');
const jwtAuth = require('../middleware/jwtAuth');

// Публичный маршрут: добавление посещения от Raspberry Pi
router.post('/', visitController.createVisit);

// Защищённый маршрут: получение посещений по UID
router.get('/', jwtAuth, visitController.getVisits);

module.exports = router;