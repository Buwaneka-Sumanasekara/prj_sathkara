import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../styles/css/theme.min.css';
import { messaging } from '../../constants/firebase';
import PropTypes from "prop-types";
import { Container, Row, Col, Collapse, Nav, Navbar, NavItem, NavLink, NavbarBrand, NavbarToggler } from 'reactstrap';
import { Dimmer, Loader, Image, Segment, Header, Icon, Label, Button } from 'semantic-ui-react';
import { NotificationContainer, NotificationManager } from 'react-notifications';
//Actions
import * as authActions from '../../redux/auth/action';


import imgLogo from '../styles/img/logo.jpg';


let SCREEN_LOGOUT = 'Logout';

class App extends Component {


  constructor(props) {
    super();
    this.toggle = this.toggle.bind(this);

    this.state = {
      activeItem: "",
      isOpen: false
    }
  }

  static contextTypes = {
    router: PropTypes.object,

  };

  componentWillMount = async () => {
    await this.props.authCheck();

  }

  componentDidMount = async () => {
    try {
      if (messaging !== null) {
        messaging.onMessage(function (payload) {
          //  console.log("Message received . ", payload);
          var result = payload['notification'];
          /*console.log("Message received . ", result);
          let myColor = { background: '#8B0000', text: "#FFFFFF" };
          notify.show(result['body'], "custom", 10000, myColor);*/
          NotificationManager.info(result.body,result.title, 5000,()=> console.log(),true);

        });

        if ('serviceWorker' in navigator) {
          navigator.serviceWorker.register('../firebase-messaging-sw.js')
            .then(function (registration) {
              messaging.useServiceWorker(registration);
            }).catch(function (err) {
              console.log('Service worker registration failed, error:', err);
            });
        }

      }


    } catch (error) {
      console.log(`error in App message setup`)
    }

  }


  shouldComponentUpdate(nextProps, nextState) {

    if (this.props.authLoading === true && nextProps.authLoading === false) {
      if (nextProps.isAuthenticated === false) {
        this.context.router.history.push(`/Auth/Login`);
      }

    }


    return true;
  }

  handleItemClick = (name) => {
    this.setState({ activeItem: name });
    if (name === SCREEN_LOGOUT) {
      this.props.authLogout();
    } else if (name === 'Home') {
      this.context.router.history.push(`/`);
    } else if (name === 'Donation') {
      this.context.router.history.push(`/donations`);
    } else if (name === 'Notification') {
      this.context.router.history.push(`/notifications`);
    } else if (name === 'Contactus') {
      this.context.router.history.push(`/contact-us`);
    }

  }


  render() {


    return (
      <Container>
        <Row>
          <Col>
            <NotificationContainer />
          </Col>
        </Row>
        <Row>
          {this.props.authLoading && (
            <Col sm={12}>
              <Segment basic>

                <center>
                  <Image src={imgLogo} />
                </center><br />

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
              {this._renderFooter()}
            </Col>
          )}

        </Row>
      </Container>
    );
  }


  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  _renderFooter = () => {
    return (
      
        <Row>
          <Col>
          <br/>
            <Segment clearing>
              <p>© Team සත්කාර</p>
            </Segment>
          </Col>
        </Row>

    );
  }

  _renderMenues = () => {
    const { activeItem } = this.state
    return (
      <Navbar light expand="md">
        <NavbarBrand onClick={(e) => this.handleItemClick("Home")}><Image src={imgLogo} size='tiny' /></NavbarBrand>
        <Nav className="ml-auto" navbar>
          <NavItem onClick={(e) => this.handleItemClick("Home")}>
            <NavLink >
              <Label image color='blue' basic>
                <Icon
                  name={"home"}
                  size='large'
                  color='blue'
                />
                Home
                </Label>
            </NavLink>
          </NavItem>
          <NavItem onClick={(e) => this.handleItemClick("Donation")}>
            <NavLink >
              <Label image color='red' basic>
                <Icon
                  name={"heartbeat"}
                  size='large'
                  color='red'
                />
                Donate Now !
                </Label>
            </NavLink>
          </NavItem>
          <NavItem onClick={(e) => this.handleItemClick("Contactus")}>
            <NavLink >
              <Label image color='blue' basic>
                <Icon
                  name={"phone"}
                  size='large'
                  color='blue'
                />
                Contact Us
                </Label>
            </NavLink>
          </NavItem>


        </Nav>
        <NavbarToggler onClick={this.toggle} />
        <Collapse isOpen={this.state.isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem onClick={(e) => this.handleItemClick("Notification")}>
              <NavLink >
                <Label color='orange' >
                  <Icon name='bell outline' />{(this.props.notif_private_count + this.props.notif_topic_count)}
                </Label>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink >
                <Label image color='blue' basic>
                  <img src={this.props.user.img} />
                  {`${this.props.user.fname} ${this.props.user.lname}`}
                </Label>
              </NavLink>
            </NavItem>

            <NavItem>
              <NavLink onClick={(e) => this.handleItemClick(SCREEN_LOGOUT)}>
                <Label color='blue' basic>
                  <Icon
                    name={"close"}
                    size='large'
                    color='blue'
                  />
                  Logout
              </Label>
              </NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>


    )
  }




}

const mapStateToProps = state => ({
  user: state.auth.user,
  isAuthenticated: state.auth.isAuthenticated,
  authLoading: state.auth.isAuthChecking,
  notif_private_count: state.notifications.notif_private_count,
  notif_topic_count: state.notifications.notif_topic_count
});
const mapDispatchToProps = {
  authCheck: authActions.authCheck,
  authLogout: authActions.authLogout,
};
export default connect(mapStateToProps, mapDispatchToProps)(App);

