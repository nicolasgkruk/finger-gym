import React from 'react';

import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = ( props ) => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/" exact>Finger Workout Room</NavigationItem>
        {props.isAuthenticated ? <NavigationItem link="/logout">Logout</NavigationItem> : null}
    </ul>
);

export default navigationItems;