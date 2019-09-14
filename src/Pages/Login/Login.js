import React from 'react';
import LoginView from './LoginView.js'



class Login extends React.Component {
  constructor (props) {
    super(props);
    // Bind the this context to the handler function
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
        valid: true
    }
  }

  // This method will be sent to the child component
  handleSubmit(event) { 
    console.log("Form submitted");
    event.preventDefault();
   
    // API FROM ERN TEK
    if(true){

    }else{
        this.setState({valid: false })
    }
  }
  

  render () {
    return(<LoginView handleSubmit = {this.handleSubmit} state={this.state}/>);
    
  }
}

export default Login;