require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const visitsRouter = require('./routes/visits');

const app = express();
const visitsRouter = require('./routes/visits');
app.use(express.json());
app.use('/api/visits', visitsRouter);

// подключение к MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// маршруты
app.use('/api/visits', visitsRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`API listening on port ${PORT}`));