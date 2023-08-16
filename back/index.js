const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 3000;
const authRoutes = require('./routes/auth');
const authSecured = require('./routes/authSecured');
const general = require('./routes/general');

app.use(express.json());

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));

app.use('/api/auth', authRoutes);
app.use('/api/authSecured', authSecured);
app.use('/general', general);

app.get('/', (req, res) => {
  res.send('Hello from Express backend!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});