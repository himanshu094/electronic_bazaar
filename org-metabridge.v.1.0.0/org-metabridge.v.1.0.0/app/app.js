const express = require('express');
const cors = require('cors');
// const passport = require('./config/passport');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');
const passwordResetRoutes = require('./routes/passwordResetRoutes');
const developerRoutes = require('./routes/developerRoutes');
const statisticsRoutes = require('./routes/statisticsRoutes');
const agencyRoutes = require('./routes/agencyRoutes'); // Import the agency routes
const agentRoutes = require('./routes/agentRoutes'); // Import the agent routes
const favoriteRoutes = require('./routes/favoriteRoutes');// Import the routes for favorite and saved properties
const propertyRoutes = require('./routes/propertyRoutes');
const userRoutes = require('./routes/userRoutes');
const emailVerificationRoutes = require('./routes/emailVerificationRoutes'); // Assuming this is the file where you define your email verification routes


require('dotenv').config();
const app = express();
// Connect to MongoDB using Mongoose
const MONGODB_URI = process.env.MONGODB_ATLAS_CONNECTION_STRING;
const MONGODB_URI_PROD = process.env.MONGODB_ATLAS_CONNECTION_STRING_PROD; //For production

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// Connect to MongoDB
mongoose
  .connect(MONGODB_URI_PROD, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });

// Express session setup
app.use(
  session({
    secret: 'metaBridge',
    resave: false,
    saveUninitialized: true,
    cookie: {secure: false}
  })
);

// Initialize Passport and session
// app.use(passport.initialize());
// app.use(passport.session());

// Authentication Routes
app.use('/auth', authRoutes);
app.use('/admin', adminRoutes);
app.use('/password', passwordResetRoutes);
app.use('/auth/email-verification', emailVerificationRoutes); // Mount the routes under '/api/email-verification'

// System Routes
app.use('/developers', developerRoutes);
app.use('/statistics', statisticsRoutes);
app.use('/agencies', agencyRoutes); 
app.use('/favorites', favoriteRoutes);
app.use('/properties', propertyRoutes);
app.use('/user', userRoutes);
app.use('/agent', agentRoutes);



app.use('/auth/logout',(req, res) => {
  req.session.destroy();
  res.send("See you again");
})

app.get("/", (req, res) => {
  res.send("Express on Vercel");
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
