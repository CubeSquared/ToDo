import React from 'react';
import styles from './index.module.css';

export default class Popup extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      newItemTime: '12:00',
      newItemName: '',
      key: 0
    };

    this.writeItemTime = this.writeItemTime.bind(this);
    this.writeItemName = this.writeItemName.bind(this);
    this.addItem = this.addItem.bind(this);
  }

  stopPropagation(e) {
    e.stopPropagation();
  }

  writeItemTime(e) {
    let value = e.target.value;
    this.setState({ newItemTime: value });
  }

  writeItemName(e) {
    let value = e.target.value;
    this.setState({ newItemName: value });
  }

  addItem() {
    const { newItemName, newItemTime, key } = this.state;
    this.setState({key: this.state.key + 1, }, () => {
      this.setState({
        newItemTime: '12:00',
        newItemName: '',
        key: key + 1
      }, () => {
          this.props.addItem(newItemName, newItemTime, key);
      });
    });
  }

  render() {
    const { popupVisible } = this.props;

    return (
      <div
        className={styles['popup']}
        style={popupVisible ? undefined : {display: 'none'}}
        onClick={this.stopPropagation}
      >
        <div className={styles['popup-flex']}>
          <div className={styles['popup-label']}>Name:</div>
          <input
            className={styles['popup-input']}
            type='text'
            value={this.state.newItemName}
            onChange={this.writeItemName}
          >
          </input>
        </div>
        <div className={styles['popup-flex']}>
          <div className={styles['popup-label']}>Date:</div>
          <input
            className={styles['popup-input']}
            type='time'
            value={this.state.newItemTime}
            onChange={this.writeItemTime}
          >
          </input>
        </div>
        <button
          onClick={this.addItem}
          className={styles['submit-button']}
        >
          Submit
        </button>
      </div>
    );
  }
}
