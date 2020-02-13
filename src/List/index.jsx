import React from 'react';
import styles from './index.module.css';
import Item from '../Item';
import Popup from '../Popup';
import Header from '../Header';

export default class List extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      items: [],
      popupVisible: false
    }

    this.togglePopup = this.togglePopup.bind(this);
    this.addItem = this.addItem.bind(this);
    this.handleOutsideClick = this.handleOutsideClick.bind(this);
  }

  addItem(newItemName, newItemTime, key) {
    const items = this.state.items;
    const item = {
      name: newItemName,
      time: newItemTime,
      key: key
    }
    items.push(item);
    this.setState({ items, popupVisible: false });
  }

  togglePopup(e) {
    e.stopPropagation();
    this.setState({ popupVisible: !this.state.popupVisible})
  }

  handleOutsideClick() {
    this.setState({ popupVisible: false });
  }

  render() {
    return (
      <div
        className={styles['list']}
        onClick={this.handleOutsideClick}
      >
        <button
          className={styles['create-item']}
          onClick={this.togglePopup}
          >
          +
        </button>
        <Header numberOfTasks={this.state.items.length} />
        <Popup
          popupVisible={this.state.popupVisible}
          addItem={this.addItem}
        />
        {this.state.items.map((item) => {
            return <Item item={item} key={item.key}></Item>
          })
        }
      </div>
    );
  }
};
