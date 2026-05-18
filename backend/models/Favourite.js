const {Schema, model} = require('mongoose')

const FavouriteSchema = Schema({
    userEmail: {
        type: String,
        required: true
    },
    videoId: {
        type: String,
        required: true
    },
    title:{
        type:String,
        required:true,
        unique:true
    },
    thumbnail:{
        type:String,
    }
})

module.exports = model('Favourite', FavouriteSchema)