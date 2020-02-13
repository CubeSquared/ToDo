import React from 'react';
import './App.css';
import Item from './Item.jsx';

export default class List extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      items: [],
      popupVisible: false,
      newItemTime: '12:00',
      newItemName: '',
      key: 0,
    }

    this.togglePopup = this.togglePopup.bind(this);
    this.writeItemDate = this.writeItemDate.bind(this);
    this.writeItemName = this.writeItemName.bind(this);
    this.addItem = this.addItem.bind(this);
    this.handleOutsideClick = this.handleOutsideClick.bind(this);
  }

  addItem() {
    const items = this.state.items;
    const item = {
      name: this.state.newItemName,
      time: this.state.newItemTime,
      key: this.state.key
    }
    items.push(item);
    this.setState({key: this.state.key + 1, items}, () => {
      this.setState({
        newItemTime: '12:00',
        newItemName: '',
        popupVisible: false
      });
    });
  }

  writeItemDate(e) {
    let value = e.target.value;
    this.setState({ newItemTime: value });
  }

  writeItemName(e) {
    let value = e.target.value;
    this.setState({ newItemName: value });
  }

  togglePopup(e) {
    e.stopPropagation();
    this.setState({ popupVisible: !this.state.popupVisible})
  }

  stopPropagation(e) {
    e.stopPropagation();
  }

  handleOutsideClick() {
    this.setState({ popupVisible: false });
  }

  render() {
    const date = new Date(Date.now());
    const dayLib = {
      0: 'Sunday',
      1: 'Monday',
      2: 'Tuesday',
      3: 'Wednesday',
      4: 'Thursday',
      5: 'Friday',
      6: 'Saturday'
    };
    const monthLib = {
      0: 'January',
      1: 'February',
      2: 'March',
      3: 'April',
      4: 'May',
      5: 'June',
      6: 'July',
      7: 'August',
      8: 'September',
      9: 'October',
      10: 'November',
      11: 'December'
    };
    const day = dayLib[date.getDay()]
    const month = monthLib[date.getMonth()]
    //found a cute solution for date suffixes online: http://jsfiddle.net/mplungjan/jaCnL/
    const num = date.getDate()
    const suffix = (function(num) {
      if (num > 3 && num < 21) return 'th';
      switch (num % 10) {
        case 1:  return "st";
        case 2:  return "nd";
        case 3:  return "rd";
        default: return "th";
      }
    })();


    return (
      <div
        className='list'
        onClick={this.handleOutsideClick}
      >
        <button
          className='create-item'
          onClick={this.togglePopup}
          >
          +
        </button>
        <div className='header'>
          <div className='header-date-wrapper'>
            <div className='header-inner-date-wrapper'>
              <div className='header-day'>
                {day + ','}
              </div>
              <div className='header-date'>
                {' ' + num + suffix}
              </div>
            </div>
            <div className='header-month'>
              {month}
            </div>
          </div>
          <div className='number-of-tasks'>
            {this.state.items.length === 1 ?
              this.state.items.length + ' Task' :
              this.state.items.length + ' Tasks'
            }
          </div>
        </div>
        <div
          className='popup'
          style={this.state.popupVisible ? undefined : {display: 'none'}}
          onClick={this.stopPropagation}
        >
          <div className='popup-flex'>
            <div className='popup-label'>Name:</div>
            <input
              className='popup-input'
              type='text'
              value={this.state.newItemName}
              onChange={this.writeItemName}
            >
            </input>
          </div>
          <div className='popup-flex'>
            <div className='popup-label'>Date:</div>
            <input
              className='popup-input'
              type='time'
              value={this.state.newItemTime}
              onChange={this.writeItemDate}
              >
            </input>
          </div>
          <button
            onClick={this.addItem}
            className='submit-button'
          >
            Submit
          </button>
        </div>
        {this.state.items.map((item) => {
            return <Item item={item} key={item.key}></Item>
          })
        }
      </div>
    );
  }
};
