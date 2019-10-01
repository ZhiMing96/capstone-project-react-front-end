import React from 'react';
import LoginView from './LoginView'
import { connect } from "react-redux";
import { doLogin } from "../../redux/actions/auth";
import api from '../../api.js'
import SnackBar from '../../Components/Snackbar'
import LoginIcon from '@material-ui/icons/Input'



class Login extends React.Component {
  constructor (props) {
    super(props);
    // Bind the this context to the handler function
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.state = {
        identifier:'' ,
        password:'',
        errorMessage: '',
        registerSnackbar: this.props.location.state && this.props.location.state.registerSnackbar,
        errorSnackbar: false
    }
    console.log(this.state)
  }

  handleChange (e) {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({[name]: value});
  }

  async setUserDetails(token) {
    await api.profile.get() 
    .then(response => {
      let userId = response.data.profile.user_id
      this.props.doLogin(userId) //link to store action to hydrate store, connect     
      this.props.history.push("/");        
    }).catch(error => {
       console.log(error);
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
          let auth_token= response.data.user.token
          window.localStorage.setItem('authToken', auth_token);
          this.setUserDetails(auth_token)
         
        } else {
          this.setState({errorMessage: 'Email address/username and password does not match.'})
          this.setState({errorSnackbar: true})
          console.log(this.state)
        }

    })
    .catch(error => {
      this.setState({errorMessage:'Error in user login.'})
      this.setState({errorSnackbar: true})
      
        
    })
    
  }

  handleClose (reason)  {
    if (reason === 'clickaway') {
      return;
    }
    this.setState({registerSnackbar: false})
    this.setState({errorSnackbar: false})

  };

  
  render () {
    return(
    <div>
        <SnackBar
        open={this.state.registerSnackbar}
        handleClose={this.handleClose}
        variant="success"
        message="Successfully registered. Please login with your new account."
        />
        <SnackBar
        open={this.state.errorSnackbar}
        handleClose={this.handleClose}
        variant="error"
        message={this.state.errorMessage}
        />
        
      
      <LoginView handleSubmit = {this.handleSubmit} state={this.state} handleChange={this.handleChange}/>
    </div>
    );
    
  }
}


//export default Login;
export default connect(
    null,
    { doLogin }
  )(Login);
  