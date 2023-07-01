// all the functions you need to carry out are located here


const Workout = require('../models/workoutsModel'); //importing the model
const mongoose = require('mongoose') //for checking the id

//get all workouts
const getAllWorkouts = async (req, res) => {
    const workouts = await Workout.find({}).sort({createdAt: -1}) //this will find all the workouts in the DB (you pass empty bracket to find all)

    res.status(200).json(workouts)
}

//get a single workout
const getWorkout = async (req, res) => {
    const { id }=req.params //to obtain the :id from the url

    // need  to check if ID is valid before we even try anything
    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({msg: `No workout with id: ${id}`})
    }

    const workout = await Workout.findById(id) //this will find all the workouts in the DB (you pass empty bracket to find all)

    if (!workout){
        res.status(404).json({msg: `No workout with id: ${id}`})
    }

    res.status(200).json(workout) //if everything is fine
}

//create new workout
const createWorkout = async (req, res) => {
    //pick from request body
    const {title, reps, load}=req.body

    //trying to put the data into the DB
    console.log(req.body)
    try{
        const workout =await Workout.create({title, reps, load})
        res.status(200).json(workout) //just to make sure it is working
    }
    catch(error){
        res.status(400).json({error: error.message})
    }

}

//delete a workout

const deleteWorkout = async (req, res)=>{
    const { id }=req.params //to obtain the :id from the url

    // need  to check if ID is valid before we even try anything
    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({msg: `No workout with id: ${id}`})
    }

    const workout = await Workout.findOneAndDelete({_id:id}) //this will find all the workouts in the DB (you pass empty bracket to find all)

    if (!workout){
        res.status(404).json({msg: `No workout with id: ${id}`})
    }

    res.status(200).json(workout) //if everything is fine
}

//updatea workout

const updateWorkout = async (req, res)=>{
    const { id }=req.params //to obtain the :id from the url

    // need  to check if ID is valid before we even try anything
    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({msg: `No workout with id: ${id}`})
    }

    const workout = await Workout.findOneAndUpdate({_id:id}, {
        ...req.body
    })

    if (!workout){
        res.status(404).json({msg: `No workout with id: ${id}`})
    }

    res.status(200).json(workout) //if everything is fine
}


// exporting the functions
module.exports={
    getWorkout,
    getAllWorkouts,
    createWorkout,
    deleteWorkout,
    updateWorkout
}