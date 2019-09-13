import React from 'react';
import SignUpView from './SignUpView.js'



class SignUp extends React.Component {
  constructor (props) {
    super(props);
    // Bind the this context to the handler function
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      email: '',
      password:'',
      emailValid: false,
      passwordValid: false,
      formValid: false,
      submitForm:false
    }

  }

  // This method will be sent to the child component
  //for validation onChange for input fields
  handleChange (e) {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({[name]: value}, 
      () => { this.validateField(name, value) });
  }

  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let emailValid = this.state.emailValid;
    let passwordValid = this.state.passwordValid;
  
    switch(fieldName) {
      case 'email':
        emailValid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value);       
        break;
      case 'password':
        passwordValid = value.length >= 6;
        break;
      default:
        break;
    }
    this.setState({emailValid: emailValid,
                    passwordValid: passwordValid
                  }, this.validateForm);
  }
  
  validateForm() {
    this.setState({formValid: this.state.emailValid && this.state.passwordValid});
    //GOT PROBLEM formValid is false even thou emailValid and passwordValid are true
    console.log(this.state.formValid,this.state.emailValid,this.state.passwordValid);
  }

  handleSubmit(event) { 
    this.setState({submitForm:true}) // only render errors when form is submitted
    console.log("Form submitted");
    event.preventDefault();
    if (this.state.formValid){
      // API FROM ERN TEK
    } 
  }
  

  render () {
    return(<SignUpView handleChange = {this.handleChange} handleSubmit = {this.handleSubmit} state= {this.state}/>);
    
  }
}

export default SignUp;