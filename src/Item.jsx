import React from 'react';
import './App.css';

export default class List extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      finished: false
    };
    this.check = this.check.bind(this);
  }

  check() {
    this.setState({ finished: !this.state.finished });
  }

  render() {
    const item = this.props.item;
    let date = new Date(item.date)

    return (
      <div className='item'>
        <input
          type='checkbox'
          onChange={this.check}
          value={!this.state.finished}>
        </input>
        <div
          style={this.state.finished ? {textDecoration: 'line-through'} : undefined}
        >
          {item.name}
        </div>
        <div>
          {date.getUTCHours() + ':' + date.getUTCMinutes()}
        </div>
      </div>
    );
  }
};
