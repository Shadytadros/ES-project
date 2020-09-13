import React from 'react';
import InputField from './inputField';
import SubmitButton from './submitButton';
import axios from 'axios';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      response: '',
      error: '',
      isLoggedIn: false,
      buttonDisabled: false
    }
    this.doLogin = this.doLogin.bind(this)
  }


  setInputValue(property, val) {
    val = val.trim();
    if (val.length > 12) {
      return;
    }
    this.setState({
      [property]: val
    })
  }

  resetFrom() {
    this.setState({
      username: '',
      password: '',
      buttonDisabled: false
    })
  }

  doLogin () {
    axios.post('http://localhost:3000/login', {
        username: this.state.username,
        password: this.state.password
      }, { validateStatus: false })
      .then((response) => {
        if(response.status == 200){
          this.setState({response: response, error: '', isLoggedIn: true})
          localStorage.setItem("jwt", response.data);
          console.log(response)
          console.log(localStorage.jwt)
        }
        else
          this.setState({error: response.data})
          console.log(localStorage.jwt)
        // console.log(response)
      })
      .catch((error) => {
        console.log(error);
      });
  }
  Post = e => {
    e.preventDefault();
    const file = document.getElementById("inputGroupFile01").files;
    const formData = new FormData();

    formData.append("img", file[0]);

    fetch("http://localhost:3000/", {
      method: "POST",
      body: formData
    }).then(r => {
      console.log(r);
    });

    document
      .getElementById("img")
      .setAttribute("src", `http://localhost:3000/${file[0].name}`);
    console.log(file[0]);
  };

  render() {
    if (localStorage.jwt) {
      return (
        <div className="container">
          <div className="jumbotron">
          </div>
          <div className="input-group mb-3">
            <div className="custom-file">
              <input
                type="file"
                className="custom-file-input"
                id="inputGroupFile01"
                aria-describedby="inputGroupFileAddon01"
              />
            </div>
          </div>
          <button type="button" className="btn btn-primary" onClick={this.Post}>
            Upload image
          </button>
          <img
            id="img"
            style={{
              display: "block"
            }}
          ></img>
        </div>
      );
    }
    else if  (!localStorage.jwt) {
      return (
        <div className="LoginForm">
        <p>{this.state.error}</p>
          login
          <InputField
            type='text'
            placeholder='Username'
            value={this.state.username ? this.state.username : '' }
            onChange={ (val) => this.setInputValue('username', val) }
          />
          <InputField
            type='password'
            placeholder='password'
            value={this.state.password ? this.state.password : '' }
            onChange={ (val) => this.setInputValue('password', val) }
          />
          <SubmitButton
            text={'login'}
            disabled={this.state.buttonDisabled}
            onClick={this.doLogin}
          />
        </div>
      );
    }
  }
}

export default LoginForm;
