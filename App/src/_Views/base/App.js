import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../styles/css/theme.min.css';
import PropTypes from "prop-types";
import { Container, Row, Col } from 'reactstrap';

class App extends Component {
  static contextTypes = {
    router: PropTypes.object,

  };
  componentWillMount = async () => {

  }


  render() {


    return (
      <Container>
        <Row>
          <Col sm={12}>
            {this.props.children}
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = state => ({

});
const mapDispatchToProps = {

};
export default connect(mapStateToProps, mapDispatchToProps)(App);

