// controllers/visitController.js
const Visit = require('../models/Visit');

// Создание нового события посещения
exports.createVisit = async (req, res) => {
  try {
    const { uid, timestamp } = req.body;
    const visit = await Visit.create({ uid, timestamp });
    return res.status(201).json(visit);
  } catch (err) {
    console.error(err);
    return res.status(400).json({ error: err.message });
  }
};

// Получение списка посещений по UID
exports.getVisits = async (req, res) => {
  try {
    const { uid } = req.query;
    const visits = await Visit.find({ uid })
      .sort({ timestamp: -1 });  // последние первыми
    return res.json(visits);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
  }
};