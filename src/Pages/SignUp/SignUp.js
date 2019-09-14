import React from 'react';
import SignUpView from './SignUpView.js'
const axios = require('../../api/api')



class SignUp extends React.Component {
  constructor (props) {
    super(props);
    // Bind the this context to the handler function
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      email: '',
      password:'',
      username:'',
      firstName:'',
      lastName:'',
      emailValid: false,
      passwordValid: false,
      usernameValid:false,
      formValid: false,
      submitForm:false,
      errorMessage: ''
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
    this.setState({formValid: this.state.emailValid && this.state.passwordValid}); //note: async
    
  }

  handleSubmit(event) { 
    this.setState({submitForm:true}) // only render errors when form is submitted
    console.log("Form submitted");
    event.preventDefault();
    if (this.state.formValid){ //ensure that form has been validated
      axios.post_api('/user/register',{
        "email": this.state.email,
        "password":  this.state.password,
        "username": this.state.username,
        "first_name": this.state.firstName,
        "last_name": this.state.lastName
        })
      .then((response) => {
        console.log(response.data.response_code)
        this.setState({errorMessage: ''})
        //todo: navigate to login page + display successful registering message

        if(response.data.response_code == 410){
          this.setState({errorMessage: response.data.response_message})
        }        
  
      })
      .catch(error => {
        console.log(error);
        this.setState({errorMessage: "Error registering user."})

      })
    } 
  }
  

  render () {
    return(<SignUpView handleChange = {this.handleChange} handleSubmit = {this.handleSubmit} state= {this.state}/>);
    
  }
}

export default SignUp;