const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const prisma = require('./prisma');

const router = express.Router();

/* LOGIN */
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  const admin = await prisma.admin.findUnique({
    where: { username }
  });

  if (!admin) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const valid = await bcrypt.compare(password, admin.password);

  if (!valid) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign(
    { id: admin.id },
    process.env.JWT_SECRET
  );

  res.json({ token });
});

/* AUTH MIDDLEWARE */
function authenticate(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.admin = decoded;
    next();
  } catch {
    res.status(401).json({ message: 'Invalid token' });
  }
}

module.exports = router;
module.exports.authenticate = authenticate;