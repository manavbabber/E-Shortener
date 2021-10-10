import React, { Component } from 'react';
import classes from './Layout.css';
import Aux from '../hoc/Aux';
import Input from './Input/Input';
import Button from './Button/Button';
import Toolbar from './Navbar/Navbar';
var tinyUrl = require('tinyurl');
class Layout extends Component{
    state={
        url:{
            elementType:'input',
            elementConfig:{
                type:'text',
                placeholder:'Enter the URL ....'
            },
            value:'',
            validation:{
                required:true,
                minLength:10
            },
            valid:false,
            shouldValidate:true,
            touched:false
        },
        disabled:true,
        valid:false,
        shorten:'',
        copySuccess:false,
        showing:false
    }
    checkValidity(value, rules) {
        let isValid = true;
        if (!rules) {
            return true;
        }
        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }
        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }
        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid
        }
        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }
        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid
        }
        return isValid;
    }
    inputChangeHandler = (e) => {
        let newUrl = {
            ...this.state.url
        };
        newUrl.value = e.target.value;
        let x = newUrl.value.length;
        if(x>12){
            this.setState({disabled:false})
        }
        if(x<12){
            this.setState({showing:false});
        }
        let Validity = this.checkValidity(newUrl.value,newUrl.validation);
        this.setState({url:newUrl,valid:Validity});
    } 

    buttonClicked = (event) => {
        event.preventDefault();
        this.setState({showing:true});
        console.log('OHHO');
        const neww = this.state.url.value;
        console.log(neww);
        tinyUrl.shorten(neww, (res, err) => {
        if (err)
            console.log(err)
            this.setState({shorten:res});
        });
    }

    copyCodeToClipboard = () => {
        const el = this.state.shorten;
        navigator.clipboard.writeText(el);
        this.setState({copySuccess:true});
        setTimeout(()=>{
                this.setState({copySuccess:false});
            },1000)
    }

    render(){
        let xyz = (
                    this.state.copySuccess ?
                    <div style={{"color": "green"}}>
                    Success!
                    </div> : null
        );
        let site =  <p><span style={{color:'blue'}}>Result: </span><span className={classes.shrt}>{this.state.shorten} </span>
                            <span onClick={() => this.copyCodeToClipboard()} className={classes.copy}>Copy</span>
                            {xyz}
                    </p>;
        return(
            <Aux >
                <Toolbar />
                <div className={classes.InputContainer}>
                    <h1>Shrink Your Link Here !!!</h1>
                    <p>Short Urls are easy to use and share..</p>
                    <form  onSubmit={(event)=>this.buttonClicked(event)} className={classes.InputButton}>
                        <span style={{width:'100%'}}>
                            <Input 
                                elementType={this.state.url.elementType}
                                elementConfig={this.state.url.elementConfig}
                                value={this.state.url.value}
                                changed={(event) => this.inputChangeHandler(event)}
                            ></Input>
                        </span>
                        <Button disabled={this.state.disabled}> Submit </Button>
                    </form>
                    {(this.state.showing && this.state.valid) ?
                        <div className={classes.site}>
                            {site}
                        </div>: null
                    }   
                </div>
            </Aux>
        )       
    }
}
export default Layout;