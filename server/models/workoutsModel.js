const mongoose = require('mongoose')

const Schema = mongoose.Schema

//this is the property of mongoose to make the schema like this So we define the types for each record
const workoutSchema = new Schema({
    title:{
        type:String,
        required: true
    },
    reps:{
        type:Number,
        required: true
    },
    load:{
        type:Number, 
        required: true
    }
}, {timestamps:true}) //this will add the timestamps to the schema

// now we export the model and give the model a name, and export the schema model
module.exports = mongoose.model('Workout', workoutSchema) //this will create a collection called workouts in the DB