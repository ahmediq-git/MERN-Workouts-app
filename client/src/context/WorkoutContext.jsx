import { createContext, useReducer } from 'react';
// context is a global variable
export const WorkoutContext = createContext();

//these just are use to manage state locally. The real sending is done by the method
export const workoutReducer =(state, action)=>{
    switch(action.type){
        case 'SET_WORKOUTS':
            return {
                workouts: action.payload
            }
        case 'CREATE_WORKOUT':
            return {
                // to add to the array of the workouts
                // used to keep the local state in sync with the database
                workouts: [action.payload, ...state.workouts]
            }
        case 'DELETE_WORKOUT':
            return {
                workouts: state.workouts.filter((workout) => workout._id !== action.payload._id)
            }
        default:
            return state;
    }
}

export const WorkoutContextProvider = ({ children }) => {
    const [state, dispatch]= useReducer(workoutReducer, {workouts: null});

    return (
        // using this we can feed a value to all the pages or children using value
        <WorkoutContext.Provider value={{...state, dispatch}}>
            { children }
        </WorkoutContext.Provider>
    )
}