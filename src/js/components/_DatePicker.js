import {settings, select} from '../settings.js';
import utils from '../utils.js';
import BaseWidget from './BaseWidget.js';

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
    //thisWidget.maxDate = utils.addDays(thisWidget.minDate, thisWidget.maxDaysInFuture = thisWidget.dom.wrapper.querySelector(settings.datePicker.maxDaysInFuture));
    thisWidget.maxDate = new Date().fp_incr(settings.datePicker.maxDaysInFuture);

    
    const element = thisWidget.dom.input;
    const options = {
        minDate: "today",
        maxDate: new Date().fp_incr(14),
        disable: [
          function(date) {
            // return true to disable
            return (date.getDay() === 0 || date.getDay() === 6);
          }
        ]
        locale: {
            firstDayOfWeek: 1,
        }
    }

    
    flatpickr(element, options);
    


  }
  parseValue(){

  }

  isValid(){
    return true;
  }

  renderValue(){

  }
}

export default DatePicker;