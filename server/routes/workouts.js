// all our routes of workouts will be in this file

// routes are, in easy words, the different pages of our app

const express = require('express');
const router= express.Router(); //same as app.Rotuer() but we are using express.Router() instead of app because we want to export this router to server.js
const Workout=require('../models/workoutsModel'); //importing the model
const {
    getWorkout,
    getAllWorkouts,
    createWorkout,
    deleteWorkout,
    updateWorkout
}=require('../controllers/workoutController'); //importing the functions

// used to GET all workouts
router.get('/', getAllWorkouts);

//GET single workout
router.get('/:id', getWorkout)

//POST a workout. POST sends data to the server
router.post('/', createWorkout)

//Delete a workout
router.delete('/:id',deleteWorkout)

//Update a workout
router.patch('/:id', updateWorkout)

module.exports=router; //exporting the router (must do this in the end)