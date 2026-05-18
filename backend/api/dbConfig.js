const mongoose = require('mongoose')

const dbConnection = async() => {
    try {
       await mongoose.connect(process.env.MONGO_URI);

       console.log('DB Online')
        
    } catch (error) {
        console.log(error)
        throw new Error('Error at initiating data base ')
    }
}

module.exports = {dbConnection}