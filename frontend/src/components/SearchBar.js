import React, {Component}from 'react'

class CustomSearchBar extends Component{
    constructor(props) {
        super(props);
      }
      render() {
        return (
          
          <div>
            <input className="searchbar" type="text" placeholder='Browse Topics' value={this.props.value} onChange={this.props.onChangeValue}/>
          </div>
          
        );
      }

}


export default CustomSearchBar