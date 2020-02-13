import React from 'react';
import styles from './index.module.css';

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
    const time = item.time.split(':');
    let meridiem = 'PM';
    let hours = parseInt(time[0]);
    let minutes = time[1];

    if (isNaN(hours)) {
      hours = 0;
    }
    if (isNaN(minutes)) {
      minutes = '00';
    }

    if (hours === 0) {
      meridiem = 'AM';
      hours = 12;
    } else if (hours < 12) {
      meridiem = 'AM'
    } else if (hours > 12){
      hours -= 12;
    }

    return (
      <div className={styles['item']}>
        <input
          className={styles['item-checkbox']}
          type='checkbox'
          onChange={this.check}
          value={!this.state.finished}>
        </input>
        <div
          className={this.state.finished ? styles['finished-item-name'] : styles['item-name']}
        >
          {item.name}
        </div>
        <div className={styles['list-time']}>
          {hours + ':' + minutes + ' ' + meridiem}
        </div>
      </div>
    );
  }
};
