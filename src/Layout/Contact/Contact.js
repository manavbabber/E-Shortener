import React, { Component } from 'react';
import Input from '../Input/Input';
import classes from './Contact.css';
import Aux from '../../hoc/Aux';
import Navbar from '../Navbar/Navbar';
import Button from '../Button/Button';
import axios from '../../axios-orders';
import { withRouter } from 'react-router';
import Modal from '../Modal/Modal';
class Contact extends Component{
    state={
        name:{
            elementType: 'input',
            elementConfig:{
                type:'text',
                placeholder: 'Your Name'
            },
            value: '',
            validation:{
                required:true
            },
            valid:false,
            shouldValidate:true,
            touched:false
        },
        subject:{
            elementType: 'input',
            elementConfig:{
                type:'text',
                placeholder: 'Enter the issue subject... '
            },
            value: '',
            validation:{
                required:true
            },
            valid:false,
            shouldValidate:true,
            touched:false
        },
        explainedIssue:{
            elementType: 'textarea',
            elementConfig:{
                type:'text',
                placeholder: 'Explain the whole Issue....'
            },
            value: '',
            validation:{
                required:true,
                minLength:5,
                maxLength:5
            },
            valid:false,
            shouldValidate:true,
            touched:false
        },
        disabled:false,
        show:false
    }
    inputChangeName = (e) => {
        let newName = {
            ...this.state.name
        };
        newName.value = e.target.value;
        let x = newName.value.length;
        if(x>0){
            this.setState({disabled:false})
        }
        this.setState({name:newName});
    } 
    inputChangeSubject = (e) => {
        let newSub = {
            ...this.state.subject
        };
        newSub.value = e.target.value;
        let x = newSub.value.length;
        if(x>0){
            this.setState({disabled:false})
        }
        this.setState({subject:newSub});
    } 
    inputChangeExplain = (e) => {
        let newExp = {
            ...this.state.explainedIssue
        };
        newExp.value = e.target.value;
        let x = newExp.value.length;
        if(x>1){
            this.setState({disabled:false})
        }
        this.setState({explainedIssue:newExp});
    } 
    closeModal = () => {
        this.setState({show:false});
        this.props.history.push('/');
    }
    buttonClicked = () => {
        let data = {
            Name:this.state.name.value,
            Subject:this.state.subject.value,
            Issue:this.state.explainedIssue.value
        }
        console.log(data);
        axios.post('/complaints.json',data)
            .then(response => {
                this.setState({show:true});
            })
            .catch(e => {
                console.log(e);
            })
    }
    render(){
        let ModalContent = (
            <div>
                <h3>Your Complaint is Successfully Registered !!!</h3>
                <Button clicked={()=>this.closeModal()}>Ok</Button>
            </div>
        );
        return(
            <Aux>
                <Navbar />
                <h1>Enter the Issue details..</h1>
                <div className={classes.contact}>
                    <div className={classes.InputElement}><Input elementType={this.state.name.elementType} elementConfig={this.state.name.elementConfig} value={this.state.name.value} changed={(event) => this.inputChangeName(event)}></Input></div>
                    <div className={classes.InputElement}><Input className={classes.InputElement} elementType={this.state.subject.elementType} elementConfig={this.state.subject.elementConfig} value={this.state.subject.value} changed={(event) => this.inputChangeSubject(event)}></Input></div>
                    <div className={classes.InputElement}><Input className={classes.InputElement} elementType={this.state.explainedIssue.elementType} elementConfig={this.state.explainedIssue.elementConfig} value={this.state.explainedIssue.value} changed={(event) => this.inputChangeExplain(event)} ></Input></div>
                </div>
                <div className={classes.btn}>
                    <Button btntype="Success"  disabled={this.state.disabled} clicked={() => this.buttonClicked()}> Submit </Button>
                </div>
                <Modal show={this.state.show}>{ModalContent}</Modal>
            </Aux>
        );
    }
}

export default withRouter(Contact);