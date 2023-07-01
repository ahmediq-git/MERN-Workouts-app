import { useEffect, useState } from "react";
import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForm from "../components/WorkoutForm";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";

//"proxy": "http://localhost:4000/", <put this in package.json to avoid CORS error

//one way is to use useEffect and fetch the data from the backend
//another way is to use the useWorkoutsContext hook

const Home = () => {
    // const [workouts, setWorkouts] = useState([]);
    const { workouts, dispatch } = useWorkoutsContext();
    // to retrieve from backend
    useEffect(() => {
        const getWorkouts = async () => {
            const response = await fetch('api/workouts');
            const json = await response.json();

            if (response.ok) {
                // setWorkouts(json);
                dispatch({ type: 'SET_WORKOUTS', payload: json });
            }
        }

        getWorkouts();
    }, [dispatch]);

    return (
        <div>
            {/* workouts is used as a flag to see if they exist so display else no */}
            {workouts && workouts.map((workout) => (
                <WorkoutDetails key={workout._id} workout={workout}/>
            ))}
            <WorkoutForm />

        </div>
    );
};

export default Home;