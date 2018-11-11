
import React, { Component } from 'react';
import PropTypes from "prop-types";
import { Container, Row, Col } from 'reactstrap';
import { Image, Label, Button, Checkbox, Form, Segment, Message } from 'semantic-ui-react';
import imgLogo from '../../styles/img/logo.jpg';
import * as fireb from '../../../constants/firebase';

const SCREEN_LOGIN = 'Login';
const SCREEN_REGISTER = 'Register';
const SCREEN_VERIFY = 'Verify';

class TestViewContainer extends Component {

  static contextTypes = {
    router: PropTypes.object,

  };

  constructor(props) {
    super();
    this.state = {
      screen: SCREEN_LOGIN,
      alertVisible: true,
      reg_fname:'',
      reg_lname:'',
      reg_mobile:'',
    }
  }

  componentDidMount = async () => {
    console.log(`screen:${this.props.match.params.screen}`)
    if (this.props.match.params.screen === undefined) {
      this.changeScreen(SCREEN_LOGIN);
    } else {
      this.changeScreen(this.props.match.params.screen);
    }

  }


  shouldComponentUpdate(nextProps, nextState) {
    return true;
  }


  handleRegister = () => {
    const appVerifier = fireb.auth.RecaptchaVerifier(
      "recaptcha-container"
    );
  }

  onchangetext = (para, value) => {
    switch (para){
       case 'reg_fname':this.setState({reg_fname:value});
       case 'reg_lname':this.setState({reg_lname:value});
       case 'reg_mobile':this.setState({reg_mobile:value});
       default:break;
    }
  }

  changeScreen = (newscreen) => {

    this.setState({
      screen: newscreen
    }, () => {
      this.context.router.history.push(`/Auth/${newscreen}`);
    });

  }

  handleAlertDismiss = () => {
    this.setState({ alertVisible: false })
  }

  /*RENDER FUNCTIONS*/
  render = () => {
    return (
      <Container>
        <Row>
          <Col md={{ size: 6, offset: 3 }}>
            <Row>
              <Col md={{ size: 4, offset: 4 }}>
                <Image src={imgLogo} size='small' wrapped />
              </Col>
            </Row>


          </Col>
        </Row>
        {(this.state.screen === SCREEN_REGISTER && this.state.alertVisible) && (
          <Row>
            <Col md={{ size: 8, offset: 2 }}>
              <Message info
               
                onDismiss={()=>this.handleAlertDismiss()}
                header='අවදානයට'
                content="ඔබගේ පහසුව උදෙසා ඔබගේ ජංගම දුරකථන අංකය හරහා ඇප් එකට අතුලු වීමට අවස්තාව සලසා ඇති බැවින් ඔබ නිතර භාවිත කරන අංකයක් මේ සදහා යොදන ලෙස කාරුනිකව ඉල්ලා සිටිමු " />

            </Col>
          </Row>
        )}
        <Row>

          <Col md={{ size: 4, offset: 4 }}>
            {this.state.screen === SCREEN_LOGIN && (
              this.renderLogin()
            )}
            {this.state.screen === SCREEN_REGISTER && (
              this.renderSignup()
            )}

          </Col>
        </Row>
      </Container>
    );
  };

  renderLogin = () => {
    return (
      <Form>
        <Form.Field>
          <label>Mobile No</label>
          <input placeholder='+94770000000' />
        </Form.Field>
        <Button color='blue'>Login</Button>
        <Segment vertical></Segment>
        <br />
        <Button.Group>
          <Label>If your not registerd yet </Label>
          <Button.Or text='->' />
          <Button color='teal' onClick={() => this.changeScreen(SCREEN_REGISTER)}>Sign up here</Button>
        </Button.Group>
      </Form>
    );
  }

  renderSignup = () => {
    return (
      <Form>
        <Form.Field>
          <label>First Name</label>
          <input placeholder='First Name' value={this.state.reg_fname} onChange={(data,evt)=>this.onchangetext('reg_fname',data.value)}/>
        </Form.Field>
        <Form.Field>
          <label>Last Name</label>
          <input placeholder='Last Name' value={this.state.reg_lname} onChange={(data,evt)=>this.onchangetext('reg_lname',data.value)}/>
        
        </Form.Field>
        <Form.Field>
          <label>Mobile No</label>
          <input placeholder='+94770000000' />
        </Form.Field>
        <div className='recaptcha-container'>

        </div>
        <Button type='submit' positive onClick={()=>this.handleRegister()}>Register</Button>
        <Segment vertical></Segment>
        <br />
        <Label>If your already registered ?
        <Button onClick={() => this.changeScreen(SCREEN_LOGIN)}> Sign-in here</Button> </Label>
      </Form>
    );
  }



}


/* Export Component ==================================================================== */
export default TestViewContainer;
