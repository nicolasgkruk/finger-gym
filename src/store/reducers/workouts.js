import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    caloriesByUser: null,
    loading: false,
};

const logWorkoutInit = ( state, action ) => {
    return updateObject( state );
};

const logWorkoutStart = ( state, action ) => {
    return updateObject( state, { loading: false } );
};

const logWorkoutSuccess = ( state, action ) => {
    return updateObject( state, {
        loading: false,
    } );
};

const logWorkoutFail = ( state, action ) => {
    return updateObject( state, { loading: false } );
};

const fetchWorkoutsStart = ( state, action ) => {
    return updateObject( state, { loading: true } );
};

const fetchWorkoutsSuccess = ( state, action ) => {

    return updateObject(state, {
        caloriesByUser: action.caloriesByUser,
        loading: false
    } );
};

const fetchWorkoutsFail = ( state, action ) => {
    return updateObject( state, { loading: false } );
};

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.LOG_WORKOUT_INIT: return logWorkoutInit( state, action );
        case actionTypes.LOG_WORKOUT_START: return logWorkoutStart( state, action );
        case actionTypes.LOG_WORKOUT_SUCCESS: return logWorkoutSuccess( state, action )
        case actionTypes.LOG_WORKOUT_FAIL: return logWorkoutFail( state, action );
        case actionTypes.FETCH_WORKOUTS_START: return fetchWorkoutsStart( state, action );
        case actionTypes.FETCH_WORKOUTS_SUCCESS: return fetchWorkoutsSuccess( state, action );
        case actionTypes.FETCH_WORKOUTS_FAIL: return fetchWorkoutsFail( state, action );
        default:
            return state;
    }
};

export default reducer;