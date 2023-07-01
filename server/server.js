// npm init -y
// npm install express
// npm install -g nodemon 
// run the server by writing nodemon server.js in the terminal
//     "dev": "nodemon server.js" in package.json under scripts
//write npm run dev in the terminal to run the server
//npm install mongoose

// start up code to make the express instance

require('dotenv').config(); //for the dotenv
const express = require('express');
const mongoose= require('mongoose'); //importing mongoose
const workoutRoutes = require('./routes/workouts'); //importing the router from workouts.js

const app = express();



// middleware
app.use(express.json()); //this is a middleware that will parse the json data that we send to the server

app.use((req,res, next)=>{
    console.log(req.path, req.method);
    next(); //next is a function that will run the next middleware
})

app.use('/api/workouts',workoutRoutes) //same as doing app.get('/', (req,res)=>{}); here but we are making the routes elsewhere and bringing them in here
// this means when we go to /api/workouts, THEN use the routes in workoutRoutes

// to respond to the get request
// app.get('/', (req,res)=>{
//     res.json({msg:"Welcome to the app"}) //sends json string for us
// })
// if you go to localhost:4000 you will see the json string above

//middlewares: they are used to modify the request and response objects

//app.get is a middleware for example. We will make a global middleware

//connect to DB
mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log("Connected to DB")
    //essentally we want to listen to the requests only once we are connected to the DB
    // listen for the requests
    app.listen(process.env.PORT, () => {
        console.log('listening for requests on', process.env.PORT);
    })

}).catch((err)=>{
    console.log("Incorrect URI, not connected")
})



// the only reason routes are not here is so as to not bloat out our server.js file

// app.get(), app.post(), app.put(), app.delete() are all used to handle routes