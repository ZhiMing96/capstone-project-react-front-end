import React from 'react';
import LoginView from './LoginView'
import { connect } from "react-redux";
import { doLogin } from "../../redux/actions/auth";
import api from '../../api.js'

class Login extends React.Component {
  constructor (props) {
    super(props);
    // Bind the this context to the handler function
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
        identifier:'' ,
        password:'',
        errorMessage: ''
    }
  }

  handleChange (e) {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({[name]: value});
  }

  async setUserDetails(token) {
    await api.auth.details(token) 
    .then(response => {
      let user = response.data.user
      this.props.doLogin( response.data.user_details) //link to store action to hydrate store, connect             
    }).catch(error => {
                
    })
  }

  // This method will be sent to the child component
  async handleSubmit(event) { 
    console.log("Form submitted")
    event.preventDefault()
    await api.auth.login({
        "identifier": this.state.identifier,
        "password":  this.state.password
        })
    .then((response) => {
        console.log(response.data.response_code)

        if(response.data.response_code === 200){
          this.setState({valid: true})
          let auth_token= response.data.user.token
          window.localStorage.setItem('authToken', auth_token);
          this.setUserDetails(auth_token)
          //todo: navigate to login page + display successful registering message.. should be done by   
          
        } else {
          this.setState({errorMessage: 'Email address/username and password does not match.'})
        }

    })
    .catch(error => {
      this.setState({errorMessage:'Error in user login.'})
        console.log(error);
        
    })
    
  }
  

  render () {
    return(<LoginView handleSubmit = {this.handleSubmit} state={this.state} handleChange={this.handleChange}/>);
    
  }
}

//export default Login;
export default connect(
    null,
    { doLogin }
  )(Login);