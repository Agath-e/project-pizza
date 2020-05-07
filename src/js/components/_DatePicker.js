/* global flatpickr */ // eslint-disable-line no-unused-vars

import {settings, select} from '../settings.js';
import utils from '../utils.js';
import BaseWidget from './_BaseWidget.js';

class DatePicker extends BaseWidget{
  constructor(wrapper){
    super(wrapper, utils.dateToStr(new Date()));
    const thisWidget = this;

    thisWidget.dom.input = thisWidget.dom.wrapper.querySelector(select.widgets.datePicker.input);

    thisWidget.initPlugin();

  }
  initPlugin(){
    const thisWidget = this;

    thisWidget.minDate = new Date(thisWidget.value);
    thisWidget.maxDate = new Date().fp_incr(settings.datePicker.maxDaysInFuture);

    
    const element = thisWidget.dom.input;
    const options = {
      minDate: thisWidget.minDate,
      maxDate: thisWidget.maxDate,
      disable: [
        function(date) {
          // return true to disable
          return (date.getDay() === 1);
        }
      ],
      locale: {
        firstDayOfWeek: 1,
      },
      onChange: function(selectedDates, dateStr) {
        thisWidget.value = dateStr;
      }
    };
    flatpickr(element, options);

  }
  addDays(date, days){
    const dateObj = new Date(date);
    dateObj.setDate(dateObj.getDate() + days);
    return dateObj;
  }

  parseValue(date){
    return date;
  }

  isValid(){
    return true;
  }

  renderValue(){

  }
}

export default DatePicker;