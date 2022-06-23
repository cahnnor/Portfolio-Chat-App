import React, { Component } from "react";
import ReactDOM from 'react-dom';




class CustomDropDown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeElementType: props.activeElementType
    };
    this.topic = this.props.value
    this.topics = this.props.topics;
    /* */
    
  }
  

  dropDownComp() {

    let testFunc = (topic, topics) => {

      if(topics !== "null"){
        
        topics.map((topic) => <option key={topic?.value} value={topic?.value}>{topic?.label}</option>)
      
      /*let newSelect = document.createElement('select');*/
      
      let options = [React.createElement("option", {value: "none", key: "none"}, "-------")]
      for (const [key, value] of Object.entries(topics)) {
        let val = value.id;
        let inner = value.name;
        options.push(React.createElement("option", {value: inner, key: key}, inner))
      }
      options.push(React.createElement("option", {value: "custom", key: "custom"}, "custom"))
      let topicDropDown = React.createElement("select", {value: this.props.value, onChange: this.props.onChangeValue, className: "dropdown"}, 
        options
      )
      return topicDropDown
      }
      return ""
    }
    /*
    <select className="dropdown" value={this.props.value} onChange={this.props.onChangeValue}>
        
        <option key="aaa" value="1">Option 1</option>
        <option key="aab" value="2">Option 2</option>
        <option key="abb" value="3">Option 3</option>
        <option key="bbb" value="custom">Type Your own</option>
      </select>*/

    return (
      <div>
      {testFunc(this.props.value, this.props.topics)}
      
      </div>
    );
  }

  inputFieldComp() {
    return <input className="text-field" value={this.props.value} onChange={this.props.onChangeValue} />;
  }

  render() {
    return (
      
      <div>

        
        {this.props.activeElementType.activeElementType === "dropdown"
          ? this.dropDownComp()
          : this.inputFieldComp()}
      </div>
      
    );
  }
}

export default CustomDropDown;