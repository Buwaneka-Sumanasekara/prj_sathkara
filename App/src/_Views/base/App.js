import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../styles/css/theme.min.css';
import PropTypes from "prop-types";
import { Container, Row, Col } from 'reactstrap';
import { Dimmer, Loader, Image, Segment,Menu } from 'semantic-ui-react';
//Actions
import * as authActions from '../../redux/auth/action';

class App extends Component {

  
  constructor(props) {
    super();
    this.state = {
      activeItem:""
    }
  }

  static contextTypes = {
    router: PropTypes.object,

  };
  componentDidMount = async () => {
    await this.props.authCheck()
  }


  shouldComponentUpdate(nextProps, nextState) {

      if (this.props.authLoading===true && nextProps.authLoading === false) {
        if(nextProps.isAuthenticated===false){
          this.context.router.history.push(`/Auth/Login`);
        }
       
      }
    

    return true;
  }

  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name });
    if(name==='logout'){
      this.props.authLogout();
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
      <Menu secondary>
        <Menu.Item name='home' active={activeItem === 'home'} onClick={this.handleItemClick} />
        <Menu.Item
          name='messages'
          active={activeItem === 'messages'}
          onClick={this.handleItemClick}
        />
        <Menu.Item
          name='friends'
          active={activeItem === 'friends'}
          onClick={this.handleItemClick}
        />
        <Menu.Menu position='right'>
          <Menu.Item
            name='logout'
            onClick={this.handleItemClick}
          />
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
  authLogout:authActions.authLogout
};
export default connect(mapStateToProps, mapDispatchToProps)(App);

