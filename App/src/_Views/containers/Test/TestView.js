
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
         <h1>{`Req URL:${this.props.match.url} `}</h1>
     
        
      </div>
     );
  };

 

}


/* Export Component ==================================================================== */
export default TestViewContainer;
