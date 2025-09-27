//ufpiiOHGlWe2T8m1
require('dotenv').config();
const mongoose =require('mongoose')


function RunServer(){ 
    try {
        mongoose.connect(process.env.MONGO_URI);
        console.log('mongoDB connected')
    } catch (error) {
        console.log('not connected',error)
    }
}

module.exports = RunServer;


