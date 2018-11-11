
import React, { Component } from 'react';


class DashboardViewContainer extends Component {



  componentDidMount = async () => {
    console.log(`ww`);

  }


  shouldComponentUpdate(nextProps, nextState) {

    return true;
  }

  render = () => {
    return (
      <div>
       DASHBOARD
      </div>
    );
  };



}


/* Export Component ==================================================================== */
export default DashboardViewContainer;
