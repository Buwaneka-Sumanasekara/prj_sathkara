
import React, { Component } from 'react';


class TestViewContainer extends Component {
  
  constructor(props){
    super();
    this.state ={
      value:0
    }
  }

  componentDidMount = async () => {
    
   
  }

  
  shouldComponentUpdate(nextProps, nextState) {

    return true;
  }

  handleChange = (event) => {
    this.setState({value: event.target.value});
  }
   
  clickButton = () =>{
    this.props.multiplyValue(this.state.value);
  }


  render = () => {
     return (
    <div>
         <h1>{`TestView URL:${this.props.match.url} `}</h1>
     
        <h2>{`Redux State: ${this.props.mymarks}`}</h2>
        <label>
          Name:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <button onClick={this.clickButton}>Add</button>


      </div>
     );
  };

 

}


/* Export Component ==================================================================== */
export default TestViewContainer;
