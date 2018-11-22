import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from '../../axios-workouts';

import  { Chart } from 'react-google-charts';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';


class BarChart extends Component {

    componentDidMount () {
        this.props.onFetchWorkouts();
    }

    render() {

        let dataForBarChart = []
        console.log(this.props.caloriesByUser);
        const arrayCopy = { ...this.props.caloriesByUser}
        const propToIterableArray = Object.values(arrayCopy);
        dataForBarChart = propToIterableArray.map(item=>Object.values(item).concat("old", null));
        dataForBarChart.unshift(['Username',
        'Calories',
            { role: 'style' },
            { sourceColumn: 0,
                role: 'annotation',
                type: 'string',
                calc: 'stringify',
            },
        ])
        
        if (propToIterableArray.length === 0) {
            dataForBarChart.push(['Be the first one to log your finger workout!', 0, 'gold', null]);
        }

        return (
            <Chart
        width={'500px'}
        height={'300px'}
        chartType="BarChart"
        loader={<Spinner />}
        data={dataForBarChart}
        options={{
        title: 'Top 10 Calorie-Burning Users',
        width: 600,
        height: 400,
        bar: { groupWidth: '95%' },
        legend: { position: 'none' },
        }}
    />
        )
    }
}

const mapStateToProps = state => {
    return {
        caloriesByUser: state.workouts.caloriesByUser,
        loading: state.workouts.loading,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchWorkouts: () => dispatch( actions.fetchWorkouts())
    }
}

export default connect( mapStateToProps, mapDispatchToProps)( withErrorHandler( BarChart, axios ) );