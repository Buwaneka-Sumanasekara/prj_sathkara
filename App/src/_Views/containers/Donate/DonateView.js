
import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { Tab, Button, Form, Message, List, Image, Table, Icon, Divider, Header } from 'semantic-ui-react';
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
    this.props.updateSelfDonationsList(this.props.liveEvent.id, this.props.uid);

  }


  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.isLoading_save === true && nextProps.isLoading_save === false) {
      if (nextProps.saveError !== '') {
        this._setMessage(MSG_CREATE_ERROR, nextProps.saveError, 4000);
      } else {
        this._setMessage(MSG_CREATE_SUCCESS, 'Success', 4000);
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

    if (methodtype === MSG_CREATE_SUCCESS) {
      this.clearForm(methodtype);
    }

    window.scrollTo(0, 0);


  }

  clearForm = () => {
    this.setState({ donation_save_file: null, donation_save_amount: 0.0 })
  }

  makeDonation = () => {

    if (this.state.donation_save_amount > 0) {
      if (this.state.donation_save_file !== null) {
        let obj = {};
        obj['eventid'] = this.props.liveEvent.id;
        obj['uid'] = this.props.uid;
        obj['amt'] = this.state.donation_save_amount;
        obj['img'] = this.state.donation_save_file;

        console.log(this.state.donation_save_file)
        this.props.saveDonation(obj);
      } else {
        this._setMessage(MSG_CREATE_ERROR, 'Please Upload your Bank slip / Payment Recipt', 3000);
      }
    } else {
      this._setMessage(MSG_CREATE_ERROR, 'Please Enter your Amount', 3000);
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
      { menuItem: 'History', render: () => this.renderPendingDonation() }
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
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Date</Table.HeaderCell>
              <Table.HeaderCell>Payment</Table.HeaderCell>
              <Table.HeaderCell>Statues</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {this.props.currentdonations.length === 0 && (
              <Row>
                <Col md={{ size: 8, offset: 2 }}>
                  <br />
                  <Header as='h2'>
                    <Icon.Group size='large'>
                      <Icon name='meh outline' />

                    </Icon.Group>
                    No Payment Records Found!
                 </Header>
                 <br />
                </Col>
              </Row>

            )}

            {this.props.currentdonations.map(function (don, i) {
              let date1 = new Date(don.crdate);
              return (
                <Table.Row key={`his${i}`}>
                  <Table.Cell>{date1.toLocaleString()}</Table.Cell>
                  <Table.Cell><NumberFormat value={don.amount} displayType={'text'} thousandSeparator={true} prefix={'රු '} /></Table.Cell>
                  {(don['donation-state'] === 0) && (
                    <Table.Cell warning>
                      <Icon name='warning sign' />
                      Not Verified
                    </Table.Cell>
                  )}
                  {(don['donation-state'] === 1) && (
                    <Table.Cell positive>
                      <Icon name='checkmark' />
                      Approved
                    </Table.Cell>
                  )}
                  {(don['donation-state'] === 2) && (
                    <Table.Cell negative>
                      <Icon name='close' />
                      Cancelled
                    </Table.Cell>
                  )}

                </Table.Row>
              );
            })}

          </Table.Body>


        </Table>
      </Tab.Pane>
    );
  }

  renderDonation = () => {
    let showError = (this.state.error_type === MSG_CREATE_ERROR && this.state.error !== '');
    let showSuccess = (this.state.error_type === MSG_CREATE_SUCCESS && this.state.error !== '');
    console.log(showSuccess)
    return (
      <Tab.Pane attached={false}>
        <Message
          hidden={!showError}
          error
          content={<div><Icon name='close' size='large' />{this.state.error}</div>}
        />
        <Message
          success
          hidden={!showSuccess}
          content={<div><Icon name='thumbs up outline' size='large' />{'Thank you for your contribution.We`ll let you know once your payment verifed'}</div>}
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
