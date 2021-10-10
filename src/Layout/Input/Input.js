import React from 'react';
import classes from './Input.css';
import Aux from '../../hoc/Aux';
const Input = (props) => {
    let InputNeeded = null;
    // alert(props.elementType);
    switch(props.elementType){  
        case('input'):
            InputNeeded=(<input
                    className={classes.InputElement}
                    type={props.elementConfig.type}
                    placeholder={props.elementConfig.placeholder}
                    value={props.value}
                    onChange={props.changed}
                ></input>);
                break;
        case('textarea'):
            InputNeeded=(<textarea
                    className={classes.InputElement}
                    type={props.elementConfig.type}
                    placeholder={props.elementConfig.placeholder}
                    value={props.value}
                    onChange={props.changed}
                ></textarea>);
                break;
        default:
            InputNeeded=(<input
                className={classes.InputElement}
                type={props.elementConfig.type}
                placeholder={props.elementConfig.placeholder}
                value={props.value}
                onChange={props.changed}
            ></input>);
            break;
    }
    
    return(
        <Aux>
        {InputNeeded}
        </Aux>
    );
} 

export default Input;