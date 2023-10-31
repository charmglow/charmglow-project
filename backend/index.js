require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./src/routes');
const app = express();
const mongoose = require('mongoose');
// Node.js body parsing middleware
app.use(bodyParser.json());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/uploads', express.static('uploads'));
// Simple Usage (Enable All CORS Requests)
app.use(cors());

// USER auth routes
app.use('/api', routes.authUserRoutes);
// Admin auth routes
app.use('/api', routes.authAdminRoutes);

// Admin Products auth routes
app.use('/api', routes.productRoutes);
// ADMIN DASHBOARD Routes
app.use('/api', routes.dashboardAdminRoutes);
// home routes
app.use('/api', routes.homeRoutes);

app.get('/', (req, res) => {
  res.send('CHARM GLOW SERVER IS UP AND RUNNING. .....');
});
// Connect to MongoDB
async function ConnectDb() {
  await mongoose
    .connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log('Connected to MongoDB');
    })
    .catch((error) => {
      console.error('Failed to connect to MongoDB', error);
      process.exit(1);
    });
}
ConnectDb().then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`Example app listening on port ${process.env.PORT}`);
  });
});
