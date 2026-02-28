const express = require('express');
const prisma = require('./prisma');
const { authenticate } = require('./admin');

const router = express.Router();

/* GET ALL TABLES */
router.get('/', async (req, res) => {
  const tables = await prisma.table.findMany();
  res.json(tables);
});

/* ADD TABLE (ADMIN ONLY) */
router.post('/', authenticate, async (req, res) => {
  const { tableNumber, seats } = req.body;

  const table = await prisma.table.create({
    data: {
      tableNumber,
      seats
    }
  });

  res.json(table);
});

module.exports = router;