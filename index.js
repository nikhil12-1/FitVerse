require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const logger = require("./configs/logger");
const authRoutes=require("./routes/auth.js");
const customerRoute=require("./routes/customer_routes.js");
const app = express();
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const slowdown = require('./middleware/slowdown.js');
app.use(helmet());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    logger.info("Connected to database");
  })
  .catch((err) => {
    logger.error(err.message || err);
  });
  app.use(slowdown);

  const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
	standardHeaders: 'draft-8', // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
	ipv6Subnet: 56, // Set to 60 or 64 to be less aggressive, or 52 or 48 to be more aggressive
	// store: ... , // Redis, Memcached, etc. See below.
})

// Apply the rate limiting middleware to all requests.
app.use(limiter)
app.use('/user', authRoutes);
app.use('/customer',customerRoute);
  
app.listen(3000,()=>{
    console.log("connected to port 3000");
});