import React from 'react';
import './App.css';
import List from './List';


export default class App extends React.Component {
  render() {
    return (
      <div className='background'>
        <List />
      </div>
    );
  }
}
