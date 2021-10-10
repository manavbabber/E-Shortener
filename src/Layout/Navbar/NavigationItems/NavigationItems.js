import React from 'react';
import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';
const NavigationItems = (props) => (
    <div className={classes.NavigationItems}>
        <NavigationItem exact link="/" active>Home</NavigationItem>
        <NavigationItem exact link="/contact">Contact</NavigationItem>
    </div>
);
export default NavigationItems;