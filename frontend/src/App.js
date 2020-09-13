import React from 'react';
import { observer } from 'mobx-react';
import LoginForm from './LoginForm';
import './App.css';

class App extends React.Component {
 // componentDidMount(){
 //  this.timer = setInterval(()=> (localStorage.clear()), 300)
 // }

  render() {

    return (
      <div className="app">
         <div className= 'container'>

          <LoginForm />
         </div>
      </div>
    );
  }
}

export default observer(App);
