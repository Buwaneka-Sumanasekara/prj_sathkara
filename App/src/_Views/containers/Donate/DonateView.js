
import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { Tab, Button, Form, Message, List, Image, Label, Divider } from 'semantic-ui-react';
import NumberFormat from 'react-number-format';
import BOCLogo from '../../styles/img/boc.jpg';
import bankIcon from '../../styles/img/bankicon.jpg';


const MSG_CREATE_SUCCESS = 'CREATE_S';
const MSG_CREATE_ERROR = 'CREATE';

class DonateViewContainer extends Component {

  constructor(props) {
    super();
    this.state = {
      error: '',
      error_type: '',
      donation_save_file: null,
      donation_save_amount: 0.0
    }
  }

  componentDidMount = async () => {


  }


  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.isLoading_save === true && nextProps.isLoading_save === false) {
      if (nextProps.saveError !== '') {
        this._setMessage(MSG_CREATE_ERROR, nextProps.saveError, 3000);
      }else{
        this._setMessage(MSG_CREATE_SUCCESS, nextProps.saveError, 3000);
      }
    }
    return true;
  }

  _setMessage(methodtype, msg, time) {


    this.setState({ error_type: methodtype, error: msg });
    if (time === undefined) {
      setTimeout(() => {
        this.setState({ error_type: '', error: '' })
      }, 2000);
    } else {
      setTimeout(() => {
        this.setState({ error_type: '', error: '' })
      }, time)
    }

    this.clearForm(methodtype);
    window.scrollTo(0, 0);


  }

  clearForm = () => {
    this.setState({ donation_save_file: null, donation_save_amount: 0.0 })
  }

  makeDonation = () => {
    if(this.state.donation_save_amount > 0){
      let obj = {};
      obj['eventid'] = this.props.liveEvent.id;
      obj['uid'] = this.props.uid;
      obj['amt'] = this.state.donation_save_amount;
      obj['img'] = this.state.donation_save_file;
  
      console.log(this.state.donation_save_file)
      this.props.saveDonation(obj);
    }else{
      this._setMessage(MSG_CREATE_ERROR,'Please Enter your Amount',3000);
    }
  
  }

  handleselectedFile = event => {
    console.log(event.target.files[0])
    this.setState({
      donation_save_file: event.target.files[0]
    });
  }




  render = () => {

    const panes = [
      { menuItem: 'Make Donation', render: () => this.renderDonation() },
      { menuItem: 'Pending', render: () => this.renderPendingDonation() },
      { menuItem: 'Approved', render: () => <Tab.Pane attached={false}>Tab 2 Content</Tab.Pane> }
    ]

    return (
      <Container>
        <Tab menu={{ pointing: true }} panes={panes} />

      </Container>
    );
  };






  renderPendingDonation = () => {
    return (
      <Tab.Pane attached={false}>

      </Tab.Pane>
    );
  }

  renderDonation = () => {
    let showError = (this.state.error_type === MSG_CREATE_ERROR && this.state.error !== '');
    let showSuccess = (this.state.error_type === MSG_CREATE_SUCCESS && this.state.error !== '');

    return (
      <Tab.Pane attached={false}>
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

        <Form loading={this.props.isLoading_save} onSubmit={() => this.makeDonation()}>
          <Message
            icon='bullhorn'
            header='ඔබගේ අවදානයට'
            content={
              <Row>
                <Col sm={12}>
                  <p>ඔබගේ සියලු ආධාර මුදල් පහත සදහන් අපගේ බැංකු ගිණුම වෙත යොමු කොට එම රිසිට් පත / බැරපතෙහි පිටපතක්
                මෙහි කරන මෙන් කාරුනිකව ඉල්ලා සිටිමු.</p>
                </Col>
                <Col sm={12}>
                  <List horizontal size={'huge'}>
                    <List.Item>
                      <Image avatar src={BOCLogo} />
                      <List.Content>
                        <List.Header>ලංකා බැංකුව - බම්බලපිටිය</List.Header>
                        <List.Header>BOC - Bambalapitiya</List.Header>
                      </List.Content>
                    </List.Item>
                    <List.Item>
                      <Image avatar src={bankIcon} />
                      <List.Content>

                        Account No
                        <List.Header>0081625372</List.Header>
                      </List.Content>
                    </List.Item>

                  </List>
                </Col>
              </Row>
            }
          />

          <Form.Input label='Payment Reciept'
            type='file'
            accept="image/png, image/jpeg , application/pdf"
            onChange={this.handleselectedFile} />

          <Form.Field>
            <label>Amount</label>
            <NumberFormat thousandSeparator={true} prefix={'රු '} value={this.state.donation_save_amount}
              onValueChange={(values) => {
                const { formattedValue, value } = values;
                // formattedValue = $2,223
                // value ie, 2223
                this.setState({ donation_save_amount: value })
              }}
            />
          </Form.Field>
          <Divider hidden />
          <Form.Button primary>Submit</Form.Button>
        </Form>
      </Tab.Pane>
    );
  }



}




/* Export Component ==================================================================== */
export default DonateViewContainer;
