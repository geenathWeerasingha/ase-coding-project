require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const { logger } = require('./middleware/logEvents');
const errorHandler = require('./middleware/errorHandler');
const verifyJWT = require('./middleware/verifyJWT');
const cookieParser = require('cookie-parser');
const credentials = require('./middleware/credentials');
 
const connectDB = require('./config/database');
const PORT = process.env.PORT || 3500;



// custom middleware logger
app.use(logger);

// Handle options credentials check - before CORS!
// and fetch cookies credentials requirement
app.use(credentials);

// Cross Origin Resource Sharing
app.use(cors(corsOptions));

// built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }));

// built-in middleware for json 
app.use(express.json());

//middleware for cookies
app.use(cookieParser());



// routes

app.use('/api/Register', require('./routes/register'));
app.use('/api/Auth', require('./routes/auth'));


app.use('/api/RefreshToken', require('./routes/refresh'));
app.use('/api/Logout', require('./routes/logout'));



app.use(verifyJWT);
app.use('/api/User', require('./routes/api/users'));



app.use(errorHandler);
 
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
 