import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../styles/css/theme.min.css';
import PropTypes from "prop-types";
import { Container, Row, Col } from 'reactstrap';
import { Dimmer, Loader, Image, Segment, Menu, Icon } from 'semantic-ui-react';
//Actions
import * as authActions from '../../redux/auth/action';



let SCREEN_LOGOUT = 'Logout';

class App extends Component {


  constructor(props) {
    super();
    this.state = {
      activeItem: "",
    }
  }

  static contextTypes = {
    router: PropTypes.object,

  };
  componentDidMount = async () => {
    await this.props.authCheck()
  }


  shouldComponentUpdate(nextProps, nextState) {

    if (this.props.authLoading === true && nextProps.authLoading === false) {
      if (nextProps.isAuthenticated === false) {
        this.context.router.history.push(`/Auth/Login`);
      }

    }


    return true;
  }

  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name });
    if (name === SCREEN_LOGOUT) {
      this.props.authLogout();
    }else if(name==='Home'){
      this.context.router.history.push(`/`); 
    } 

  }


  render() {


    return (
      <Container>
        <Row>
          {this.props.authLoading && (
            <Col sm={12}>
              <Segment>

                <br />

                <Dimmer active inverted>
                  <Loader size='large'>Loading</Loader>
                </Dimmer>

                <br />
              </Segment>
            </Col>
          )}
          {this.props.authLoading === false && (
            <Col sm={12}>
              {this._renderMenues()}
              {this.props.children}
            </Col>
          )}

        </Row>
      </Container>
    );
  }

  _renderMenues = () => {
    const { activeItem } = this.state
    return (
      <Menu secondary  icon='labeled'>
        <Menu.Item name='සත්කාර' header />
        <Menu.Item
            name={"Home"}
            onClick={this.handleItemClick}
          >
          <Icon name='home' />
          Home
          </Menu.Item>

        <Menu.Menu position='right'>
          <Menu.Item
            name={SCREEN_LOGOUT}
            onClick={this.handleItemClick}
          ><Icon name='window close' />
          Logout
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    )
  }




}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  authLoading: state.auth.isAuthChecking
});
const mapDispatchToProps = {
  authCheck: authActions.authCheck,
  authLogout: authActions.authLogout
};
export default connect(mapStateToProps, mapDispatchToProps)(App);

