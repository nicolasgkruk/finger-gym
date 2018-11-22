import axios from '../../axios-workouts';

import * as actionTypes from './actionTypes';


export const logWorkoutSuccess = ( id, orderData ) => {
    return {
        type: actionTypes.LOG_WORKOUT_SUCCESS,
        orderId: id,
        orderData: orderData
    };
};

export const logWorkoutFail = ( error ) => {
    return {
        type: actionTypes.LOG_WORKOUT_FAIL,
        error: error
    };
}

export const logWorkoutStart = () => {
    return {
        type: actionTypes.LOG_WORKOUT_START
    };
};

export const logWorkout = ( orderData, token ) => {
    return dispatch => {
        dispatch( logWorkoutStart() );
        axios.post( '/workouts.json?auth=' + token, orderData )
            .then( response => {
                dispatch(logWorkoutSuccess( response.data.name, orderData ) );
                dispatch(fetchWorkouts());
            } )
            .catch( error => {
                dispatch( logWorkoutFail( error ) );
            } );
    };
};

export const logWorkoutInit = () => {
    return {
        type: actionTypes.LOG_WORKOUT_INIT
    };
};

export const fetchWorkoutsSuccess = ( caloriesByUser ) => {
    return {
        type: actionTypes.FETCH_WORKOUTS_SUCCESS,
        caloriesByUser: caloriesByUser,
    };
};

export const fetchWorkoutsFail = ( error ) => {
    return {
        type: actionTypes.FETCH_WORKOUTS_FAIL,
        error: error
    };
};

export const fetchWorkoutsStart = () => {
    return {
        type: actionTypes.FETCH_WORKOUTS_START
    };
};

export const fetchWorkouts = () => {

    return dispatch => {
        dispatch(fetchWorkoutsStart());
            axios.get( 'https://finger-gym.firebaseio.com/workouts.json' )
                .then( response => {
                    const fetchedWorkouts = [];
                    for ( let key in response.data ) {
                        fetchedWorkouts.push( {
                            ...response.data[key],
                            id: key 
                        } );
                    }
                    const caloriesByUser = ( input ) => {
                        const caloriesByUser = input.reduce( (current, { email, calories }) => {
                            current[email] = (current[email] || 0) + calories;
                            return current;
                            }, {} );
                        
                        return Object
                            .keys( caloriesByUser )
                            .map( email => ({ email, calories: caloriesByUser[email] }) );
                    }

                    // only top ten users
                    const totalCaloriesPerUser = caloriesByUser(fetchedWorkouts).sort(function(a, b) {
                        return b.votes - a.votes;
                    }).slice(0, 10);                                    
                    
                dispatch(fetchWorkoutsSuccess(totalCaloriesPerUser));
                } )
                .catch( error => {
                    dispatch(fetchWorkoutsFail(error));
                } );
        };
    };