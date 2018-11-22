import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from '../../axios-workouts';

import * as actions from '../../store/actions/index';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import BarChart from '../../components/BarChart/BarChart';
import Button from '../../components/UI/Button/Button';
import classes from './FingerGym.module.css';

class FingerGym extends Component {
    
    state = {
        clicksOrTaps: 0,
        isMobile : true,
        caloriePerFingerAction: 1
    }

componentDidMount = () => {
    const isMobile = ((typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1));
    this.setState({isMobile: isMobile}, (isMobile) => {
        if (isMobile) {
            this.setState({caloriePerFingerAction: 0.000095464938114854})
        } else {
            this.setState({caloriePerFingerAction: 0.00142 })
        }
    });
}

addClickOrTapHandler = () => {
    const newState = { ...this.state};
    newState.clicksOrTaps = this.state.clicksOrTaps + 1;
    this.setState({clicksOrTaps: newState.clicksOrTaps});
}

submitClickHandler = (event) => {
    event.preventDefault();

    let typeOfWorkout = null
    if (this.state.isMobile === true) {
        typeOfWorkout = 'taps'
    } else {
        typeOfWorkout = 'clicks'
    }

    const orderData  = {
        email: this.props.email,
        typeOfWorkout: typeOfWorkout,
        clicksOrTaps: this.state.clicksOrTaps,
        calories: this.state.clicksOrTaps * this.state.caloriePerFingerAction
    }
    this.props.onSubmitWorkout(orderData,this.props.token);
    let stringAlert = '';
    if (!this.state.isMobile) {
        stringAlert = 'by clicking like an impatient person during dial up days while a site ridden with bloated images tries to load'
    } else {
        stringAlert = 'by pointlessly tapping at your mobile phone'
    }

    alert(`You have burned ${this.state.clicksOrTaps * this.state.caloriePerFingerAction} calories ${stringAlert}. By the way, that's only ${257 - (this.state.clicksOrTaps * this.state.caloriePerFingerAction)} calories short of burning the equivalent of a BigMac. Keep going champ!`)
    this.setState({clicksOrTaps: 0});
}

    render() {
        
        return(
            <div className={classes.FingerGym}>  
                <p>Current amount of calories burned:</p>
                <h3>{this.state.clicksOrTaps * this.state.caloriePerFingerAction}</h3>
                <Button btnType="PlusAndLess" clicked={this.addClickOrTapHandler}>+</Button>
                <form onSubmit={(event) => this.submitClickHandler(event)}>
                    <Button disabled={this.state.clicksOrTaps === 0} btnType="LogWorkout">Log workout</Button>
                    <BarChart />
                </form>
            </div>
        );
    }
}


const mapStateToProps = state => {
    return {
        token: state.auth.token,
        userId: state.auth.userId,
        email: state.auth.email,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onSubmitWorkout: (orderData, token) => dispatch(actions.logWorkout(orderData, token)),
    }
}

export default connect( mapStateToProps, mapDispatchToProps)( withErrorHandler( FingerGym, axios ) );