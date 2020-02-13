import React from 'react';
import './App.css';
import Item from './Item.jsx';

export default class List extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      items: [],
      popupVisible: false,
      newItemDate: '',
      newItemName: '',
      key: 0,
    }

    this.togglePopup = this.togglePopup.bind(this);
    this.writeItemDate = this.writeItemDate.bind(this);
    this.writeItemName = this.writeItemName.bind(this);
    this.addItem = this.addItem.bind(this);
  }

  addItem() {
    const items = this.state.items;
    const item = {
      name: this.state.newItemName,
      date: this.state.newItemDate,
      key: this.state.key
    }
    items.push(item);
    this.setState({key: this.state.key + 1, items}, () => {
      this.setState({
        newItemDate: '',
        newItemName: '',
        popupVisible: false
      });
    });
  }

  writeItemDate(e) {
    let value = e.target.value;
    this.setState({ newItemDate: value });
  }

  writeItemName(e) {
    let value = e.target.value;
    this.setState({ newItemName: value });
  }

  togglePopup() {
    this.setState({ popupVisible: !this.state.popupVisible})
  }

  render() {
    return (
      <div className='list'>
        <div className='header'>
          <div className='todaydate'>
            {'Thursday, 10th'}
          </div>
          <button
            className='newitem'
            onClick={this.togglePopup}
          >
            +
          </button>
        </div>
        <div
          className='popup'
          style={this.state.popupVisible ? undefined : {display: 'none'}}
        >
          <input
            type='text'
            value={this.state.newItemName}
            onChange={this.writeItemName}
          >
          </input>
          <input
            type='datetime-local'
            value={this.state.newItemDate}
            onChange={this.writeItemDate}
          >
          </input>
          <button onClick={this.addItem}></button>
        </div>
        {this.state.items.map((item) => {
            return <Item item={item} key={item.key}></Item>
          })
        }
      </div>
    );
  }
};
