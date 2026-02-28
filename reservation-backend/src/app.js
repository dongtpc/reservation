const express = require('express');
const cors = require('cors');

const adminRoutes = require('./admin');
const tableRoutes = require('./tables');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/admin', adminRoutes);
app.use('/api/tables', tableRoutes);

module.exports = app;