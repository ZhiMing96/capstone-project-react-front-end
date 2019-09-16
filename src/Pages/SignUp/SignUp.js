import React from 'react';
import SignUpView from './SignUpView.js'
import api from '../../api.js'
import { connect } from "react-redux";
import { doLogin } from "../../redux/actions/auth";



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

  async setUserDetails(token) {
    await api.auth.details(token) 
    .then(response => {
      let user = response.data.user
      this.props.doLogin(user) //link to store action to hydrate store, connect             
    }).catch(error => {
                
    })
  }

  async handleSubmit(event) { 
    this.setState({submitForm:true}) // only render errors when form is submitted
    console.log("Form submitted");
    event.preventDefault();
    if (this.state.formValid){ //ensure that form has been validated
      await api.auth.register({
        "email": this.state.email,
        "password":  this.state.password,
        "username": this.state.username,
        "first_name": this.state.firstName,
        "last_name": this.state.lastName
        })
      .then((response) => {
        console.log(response)
        this.setState({errorMessage: ''}) //reset

        if(response.data.response_code === 200){
          let auth_token= response.data.token.token
          window.localStorage.setItem('authToken', auth_token);
          this.setUserDetails(auth_token)
          //todo: navigate to home page + display successful registering message
        }

        else if(response.data.response_code === 410){
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


//export default SignUp;
export default connect(
  null,
  { doLogin }
)(SignUp);
