const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.JWT_URL).then(()=>{
    console.log('Connected to MongoDB');
}).catch((err)=>{
    console.log('Error connecting to MongoDB',err.message);
})