
import React, { Component } from 'react';
import PropTypes from "prop-types";
import { Container, Row, Col } from 'reactstrap';
import { Image, Label, Button, Dimmer, Loader, Form, Segment, Message, Icon, Header } from 'semantic-ui-react';
import imgLogo from '../../styles/img/logo.jpg';

const SCREEN_LOGIN = 'Login';
const SCREEN_REGISTER = 'Register';
const SCREEN_VERIFY = 'Verify';

const MSG_SIGNUP_SUCCESS = 'SIGNUP_S';
const MSG_SIGNUP_ERROR = 'SIGNUP';
const MSG_LOGIN_SUCCESS = 'LOGIN_S';
const MSG_LOGIN_ERROR = 'LOGIN';

const PROVIDER_GOOGLE = "Google-SignIn";

class LognViewContainer extends Component {

  static contextTypes = {
    router: PropTypes.object,

  };

  constructor(props) {
    super();
    this.state = {
      screen: SCREEN_LOGIN,
      alertVisible: true,
      error: '',
      error_type: '',
      reg_fname: '',
      reg_lname: '',
      reg_mobile: '',
      reg_email: "",
      reg_pass: "",
      reg_cpass: "",
      login_email: "",
      login_pass: ""
    }
  }

  componentDidMount = async () => {
    console.log(`screen:${this.props.match.params.screen}`);
    await this.props.authCheck();
  }

  componentWillUnmount() {
    this.isCancelled = true;
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.authLoading === true && nextProps.authLoading === false) {
      console.log(`Auth statues:${nextProps.isAuthenticated}`)
      if (nextProps.isAuthenticated === false) {
        if (this.props.match.params.screen === undefined) {
          this.changeScreen(SCREEN_LOGIN);
        } else {
          this.changeScreen(this.props.match.params.screen);
        }
      } else {
        this.redirectToHome();
      }

    }
    else if (this.props.message.msg_type !== nextProps.message.msg_type) {
      this._setMessage(nextProps.message.msg_type, nextProps.message.msg_txt, 3000);
    }
    return true;
  }




  /*ERROR HANDLING*/

  _setMessage(methodtype, msg, time) {
    //console.log(`error set:${methodtype},${msg}`)
    if (methodtype === MSG_LOGIN_SUCCESS) {
      this.redirectToHome();
    } else {
      this.setState({ error_type: methodtype, error: msg });
      if (time === undefined) {
        setTimeout(() => {
          this.setState({ error_type: '', error: '' })
        }, 2000)
      } else {
        setTimeout(() => {
          this.setState({ error_type: '', error: '' })
        }, time)
      }

      this.clearForm(methodtype);
      window.scrollTo(0, 0);
    }

  }
  /*END:ERROR HANDLING*/

  clearForm = (typ) => {
    if (typ === MSG_SIGNUP_SUCCESS) {
      this.setState({
        reg_fname: '',
        reg_lname: '',
        reg_mobile: '',
        reg_email: "",
        reg_pass: "",
        reg_cpass: "",
      })
    }
  }

  redirectToHome = () => {
    this.context.router.history.push(`/`);
  }

  validateReg = () => {
    this.setState({ error_type: '', error: '' });
    let state = true;
    let msg = "";

    if (this.state.reg_fname === '') {
      state = false;
      msg = 'Please enter your first name';
    } else if (this.state.reg_lname === '') {
      state = false;
      msg = 'Please enter your Last name';
    } else if (this.state.reg_mobile === '') {
      state = false;
      msg = 'Please enter your mobile no';
    } else if (this.state.reg_email === '') {
      state = false;
      msg = 'Please enter your email';
    } else if (this.state.reg_pass === '') {
      state = false;
      msg = 'Please enter your password';
    } else if (this.state.reg_pass !== this.state.reg_cpass) {
      state = false;
      msg = 'passwords should be matched!';
    }

    if (state === false) {
      this._setMessage(MSG_SIGNUP_ERROR, msg, 3000);
    }
    return state;
  }
  handleRegister = async () => {
    if (this.validateReg()) {
      let user = {};
      user['fname'] = this.state.reg_fname;
      user['lname'] = this.state.reg_lname;
      user['mobile'] = this.state.reg_mobile;
      user['email'] = this.state.reg_email;
      user['pass'] = this.state.reg_pass;
      user['authtyp'] = 'EMAIL';
      user['img'] = 'https://firebasestorage.googleapis.com/v0/b/sathkara-bb902.appspot.com/o/defaults%2Fuser.png?alt=media&token=69817bb3-ac5b-4be8-ab7d-a155bff173c1';

      await this.props.registerUser(user);
    }
  }

  validateLogin = () => {
    this.setState({ error_type: '', error: '' });
    let state = true;
    let msg = "";

    if (this.state.login_email === '') {
      state = false;
      msg = 'Please enter your email';
    } else if (this.state.login_pass === '') {
      state = false;
      msg = 'Please enter your password';
    }

    if (state === false) {
      this._setMessage(MSG_LOGIN_ERROR, msg, 3000);
    }
    return state;
  }
  handleLogin = async (provider) => {
    if (provider === '') {
      if (this.validateLogin()) {
        let user = {};
        user['email'] = this.state.login_email;
        user['pass'] = this.state.login_pass;
        await this.props.loginUser(user);
      }
    } else {
      this.props.signInWithGoogle();
    }

  }

  onchangetext = (para, value) => {
    if (para === 'reg_fname') {
      this.setState({ reg_fname: value });
    } else if (para === 'reg_lname') {
      this.setState({ reg_lname: value });
    } else if (para === 'reg_mobile') {
      this.setState({ reg_mobile: value });
    } else if (para === 'reg_email') {
      this.setState({ reg_email: value });
    } else if (para === 'reg_pass') {
      this.setState({ reg_pass: value });
    } else if (para === 'reg_cpass') {
      this.setState({ reg_cpass: value });
    }
  }
  onchangetext_login = (para, value) => {
    if (para === 'login_email') {
      this.setState({ login_email: value });
    } else if (para === 'login_pass') {
      this.setState({ login_pass: value });
    }
  }

  changeScreen = async (newscreen) => {

    this.setState({
      screen: newscreen
    }, () => {
      this.context.router.history.push(`/Auth/${newscreen}`);
    });


  }



  /*RENDER FUNCTIONS*/
  render = () => {
    if (this.props.authLoading) {
      return (
        <Container>
          <Row>
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
          </Row>
        </Container>
      );
    }

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

        <Row>


          {this.state.screen === SCREEN_LOGIN && (
            this.renderLogin()
          )}
          {this.state.screen === SCREEN_REGISTER && (
            this.renderSignup()
          )}


        </Row>
      </Container>
    );
  };

  renderLogin = () => {
    let showError = (this.state.error_type === MSG_LOGIN_ERROR && this.state.error !== '');
    let showSuccess = (this.state.error_type === MSG_LOGIN_SUCCESS && this.state.error !== '');
    return (
      <Col md={{ size: 4, offset: 4 }}>
        <Message
          hidden={!showError}
          error
          content={this.state.error}
        />
        <Message
          hidden={!showSuccess}
          positive
          content={this.state.error}
        />



        <Segment >
          <center>
            <Segment.Inline>
              <Button color='google plus' onClick={() => this.handleLogin(PROVIDER_GOOGLE)}>
                <Icon name='google plus g' /> Signin with Your Google Acount
          </Button>

              <p>OR</p>
            </Segment.Inline>

          </center>
        </Segment>


        <Form loading={this.props.isLoading || this.props.authLoading} onSubmit={() => this.handleLogin('')}>

          <Form.Field>
            <label>Email</label>
            <input type="email" placeholder='abc@example.com' value={this.state.login_email} onChange={(evt) => this.onchangetext_login('login_email', evt.target.value)} />
          </Form.Field>
          <Form.Field>
            <label>Password</label>
            <input type="password" value={this.state.login_pass} onChange={(evt) => this.onchangetext_login('login_pass', evt.target.value)} />
          </Form.Field>
          <Button color='blue'>Login</Button>
        </Form>
        <Segment vertical></Segment>
        <br />
        <Button.Group>
          <Label>If your not registerd yet </Label>
          <Button.Or text='->' />
          <Button color='teal' onClick={() => this.changeScreen(SCREEN_REGISTER)}>Sign up here</Button>
        </Button.Group>

      </Col>
    );
  }

  renderSignup = () => {
    let showError = (this.state.error_type === MSG_SIGNUP_ERROR && this.state.error !== '');
    let showSuccess = (this.state.error_type === MSG_SIGNUP_SUCCESS && this.state.error !== '');

    return (
      <Col md={{ size: 6, offset: 3 }}>
        <Message
          hidden={!showError}
          error
          content={this.state.error}
        />
        <Message
          hidden={!showSuccess}
          positive
          content={this.state.error}
        />
        <Segment>
          <center>
            <Button color='google plus' onClick={() => this.handleLogin(PROVIDER_GOOGLE)}>
              <Icon name='google plus g' /> Signup with Your Google Acount
          </Button>

            <p>OR</p>
          </center>
        </Segment>

        <Form loading={this.props.isLoading} onSubmit={() => this.handleRegister()}>
          <Row>
            <Col sm={12} md={6}>
              <Form.Field>
                <label>First Name</label>
                <input placeholder='First Name' value={this.state.reg_fname} onChange={(evt) => this.onchangetext('reg_fname', evt.target.value)} />
              </Form.Field>
              <Form.Field>
                <label>Last Name</label>
                <input placeholder='Last Name' value={this.state.reg_lname} onChange={(evt) => this.onchangetext('reg_lname', evt.target.value)} />
              </Form.Field>
              <Form.Field>
                <label>Mobile No</label>
                <input placeholder='+94770000000' value={this.state.reg_mobile} onChange={(evt) => this.onchangetext('reg_mobile', evt.target.value)} />
              </Form.Field>

            </Col>
            <Col sm={12} md={6}>
              <Form.Field>
                <label>Email</label>
                <input placeholder='abc@example.com' value={this.state.reg_email} onChange={(evt) => this.onchangetext('reg_email', evt.target.value)} />
              </Form.Field>
              <Form.Field>
                <label>Password</label>
                <input type='password' value={this.state.reg_pass} onChange={(evt) => this.onchangetext('reg_pass', evt.target.value)} />
              </Form.Field>
              <Form.Field>
                <label>Confirm Password</label>
                <input type='password' value={this.state.reg_cpass} onChange={(evt) => this.onchangetext('reg_cpass', evt.target.value)} />
              </Form.Field>
            </Col>
          </Row><br />
          <Row>
            <Col sm={12}>
              <Button type='submit' positive >Register</Button>
            </Col>
          </Row>

        </Form>
        <Row>
          <Col sm={12}>
            <Segment vertical></Segment>
            <br />
            <Label>If your already registered ?
        <Button onClick={() => this.changeScreen(SCREEN_LOGIN)}> Sign-in here</Button> </Label>
          </Col>
        </Row>
      </Col>
    );
  }



}


/* Export Component ==================================================================== */
export default LognViewContainer;
