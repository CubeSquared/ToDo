import React from 'react';
import styles from './index.module.css';

export default class Header extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      items: [],
      popupVisible: false,
      newItemTime: '12:00',
      newItemName: '',
      key: 0,
    }
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

    const day = dayLib[date.getDay()];
    const month = monthLib[date.getMonth()];
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

    const { numberOfTasks } = this.props;

    return(
      <div className={styles['header']}>
        <div className={styles['header-date-wrapper']}>
          <div className={styles['header-inner-date-wrapper']}>
            <div className={styles['header-day']}>
              {day + ','}
            </div>
            <div className={styles['header-date']}>
              {' ' + num + suffix}
            </div>
          </div>
          <div className={styles['header-month']}>
            {month}
          </div>
        </div>
        <div className={styles['number-of-tasks']}>
          {numberOfTasks === 1 ?
            numberOfTasks + ' Task' :
            numberOfTasks + ' Tasks'
          }
        </div>
      </div>
    );
  }
}
