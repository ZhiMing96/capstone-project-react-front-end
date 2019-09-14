import React from 'react';
import LoginView from './LoginView'
const axios = require('../../api/api')


class Login extends React.Component {
  constructor (props) {
    super(props);
    // Bind the this context to the handler function
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
        identifier:'' ,
        password:'',
        valid: true
    }
  }

  handleChange (e) {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({[name]: value});
  }

  // This method will be sent to the child component
  handleSubmit(event) { 
    console.log("Form submitted")
    event.preventDefault()
    axios.post_api('/user/login',{
        "identifier": this.state.identifier,
        "password":  this.state.password
        })
    .then((response) => {
        console.log(response.data.response_code)
        console.log(response.data.auth_key)
        let auth_key= response.data.auth_key
        window.localStorage.setItem('userId', auth_key);
        //todo: deal with store?
    })
    .catch(error => {
        this.setState({valid: false })
        console.log(error);
        
    })

  }
  

  render () {
    return(<LoginView handleSubmit = {this.handleSubmit} state={this.state} handleChange={this.handleChange}/>);
    
  }
}

export default Login;