import React from 'react';
import classes from './Navbar.css';
import NavigationItems from './NavigationItems/NavigationItems';
const Toolbar = (props) => (
    <header className={classes.Toolbar}>
        <nav className={classes.DesktopOnly}><NavigationItems  /></nav>
    </header>
)
export default Toolbar;