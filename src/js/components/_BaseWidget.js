class BaseWidget{
  constructor(wrapperElement, initialValue){
    const thisWidget = this; 

    thisWidget.dom = {};
    thisWidget.dom.wrapper = wrapperElement;

    thisWidget.correctValue = initialValue;

  }

  get value(){
    const thisWidget = this;
    return thisWidget.correctValue;

  }

  set value(value){
    const thisWidget = this;
    const newValue = this.parseValue(value);
  
    /*TODO: Add Validation*/
      
    if(newValue != thisWidget.correctValue && thisWidget.isValid(newValue)){
      thisWidget.correctValue = newValue;

      setTimeout(() => {
        thisWidget.announce();
      }, 0); 
     
    }

    thisWidget.renderValue();
  }
  setValue(value){
    const thisWidget = this;

    thisWidget.value = value;

  }

  parseValue(value){
    return parseInt(value);
  }

  isValid(value){
    return !isNaN(value);

  }

  renderValue(){
    const thisWidget = this;

    thisWidget.dom.input.innerHTML = thisWidget.value;
  }

  announce(){
    const thisWidget = this;

    //const event = new Event('updated');
      
    const event = new CustomEvent('updated', {
      bubbles: true
    });
      
    thisWidget.dom.wrapper.dispatchEvent(event);
  }

}

export default BaseWidget; 