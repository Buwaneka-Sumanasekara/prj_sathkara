
import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { Tab, Button, Form, Message, List, Image, Table, Icon, Divider, Header, Label, Segment, Modal } from 'semantic-ui-react';
import NumberFormat from 'react-number-format';
import BOCLogo from '../../styles/img/boc.jpg';
import bankIcon from '../../styles/img/bankicon.jpg';


const MSG_CREATE_SUCCESS = 'CREATE_S';
const MSG_CREATE_ERROR = 'CREATE';

const MSG_UPLOAD_REC_SUCCESS = 'UPLOAD_REC_S';
const MSG_UPLOAD_REC_ERROR = 'UPLOAD_REC';

class DonateViewContainer extends Component {

  constructor(props) {
    super();
    this.state = {
      error: '',
      error_type: '',
      donation_id: '',
      donation_save_file: null,
      donation_save_amount: 0.0,
      donation_update_file: null,
      modal_upload_visible: false,
    }
  }

  componentDidMount = async () => {
    await this.props.loadCurrentEvent();
    this.props.updateSelfDonationsList(this.props.liveEvent.id, this.props.uid);
    if (this.props.user.user_type === 1) {
      this.props.LoadAllUsersDonations(this.props.liveEvent.id);
    }


  }


  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.isLoading_save === true && nextProps.isLoading_save === false) {
      if (nextProps.saveError !== '') {
        this._setMessage(MSG_CREATE_ERROR, nextProps.saveError, 4000);
      } else {
        this._setMessage(MSG_CREATE_SUCCESS, 'Success', 4000);
      }
    }
    if (this.props.isReciptUploading === true && nextProps.isReciptUploading === false) {
      if (nextProps.uploadError !== '') {
        this._setMessage(MSG_UPLOAD_REC_ERROR, nextProps.uploadError, 4000);
      } else {
        this._setMessage(MSG_UPLOAD_REC_SUCCESS, 'Success', 4000);
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
    } else if (methodtype === MSG_UPLOAD_REC_SUCCESS) {
      this.clearForm(methodtype);

    }

    window.scrollTo(0, 0);


  }

  clearForm = () => {
    this.setState({ donation_save_file: null, donation_save_amount: 0.0, donation_update_file: null, modal_upload_visible: false })
  }

  makeDonation = () => {

    if (this.state.donation_save_amount > 0) {

      let obj = {};
      obj['eventid'] = this.props.liveEvent.id;
      obj['uid'] = this.props.uid;
      obj['amt'] = this.state.donation_save_amount;
      obj['img'] = this.state.donation_save_file;

      console.log(this.state.donation_save_file)
      this.props.saveDonation(obj);

    } else {
      this._setMessage(MSG_CREATE_ERROR, 'Please Enter your Amount', 3000);
    }
  }

  updateDonationUser = () => {

    let obj = {};
    obj['eventid'] = this.props.liveEvent.id;
    obj['uid'] = this.props.uid;
    obj['img'] = this.state.donation_update_file;
    obj['id'] = this.state.donation_id;

    console.log(this.state.donation_update_file)
    this.props.uploadDonationImgOnlyAction(obj);
    if (this.props.user.user_type === 1) {
      this.props.LoadAllUsersDonations(this.props.liveEvent.id);
    }
  }

  handleselectedFile = event => {
    console.log(event.target.files[0])
    this.setState({
      donation_save_file: event.target.files[0]
    });
  }
  handleselectedFileUpdate = event => {
    console.log(event.target.files[0])
    this.setState({
      donation_update_file: event.target.files[0]
    });
  }


  updateDonationStateUI = async(donid, state,uid) => {
/*
const eventid = req.body.eventid;
        const uid = req.body.uid;
        const trnid = req.body.trnid;
        const donstate = req.body.donstate;
        const token = req.body.token;
*/

      let obj={};
      obj['eventid']=this.props.liveEvent.id;
      obj['uid']=uid;
      obj['trnid']=donid;
      obj['donstate']=state;
      obj['token']=this.props.notif_token;
      await this.props.updateDonationState(obj);    
      if (this.props.user.user_type === 1) {
        this.props.LoadAllUsersDonations(this.props.liveEvent.id);
      }
  }

  render = () => {


    let panes = [
      { menuItem: 'Make Donation', render: () => this.renderDonation() },
      { menuItem: 'History', render: () => this.renderPendingDonation() }
    ]

    if (this.props.user.user_type === 1) {
      panes = [
        { menuItem: 'Make Donation', render: () => this.renderDonation() },
        { menuItem: 'History', render: () => this.renderPendingDonation() },
        { menuItem: 'Pending', render: () => this.renderAprovesDonation() },
        { menuItem: 'Approved', render: () => this.renderAlreadyApprovedDonation() }


      ]
    }

    return (
      <Container>
        <Tab menu={{ pointing: true }} panes={panes} />

      </Container>
    );
  };






  renderPendingDonation = () => {
    let showError = (this.state.error_type === MSG_UPLOAD_REC_ERROR && this.state.error !== '');
    let showSuccess = (this.state.error_type === MSG_UPLOAD_REC_SUCCESS && this.state.error !== '');
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


        {this.renderUpdateDonationUser()}
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Date</Table.HeaderCell>
              <Table.HeaderCell>Payment</Table.HeaderCell>
              <Table.HeaderCell>Reciept</Table.HeaderCell>
              <Table.HeaderCell>Statues</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {this.props.currentdonations.length === 0 && (

              <Table.Row key={`first`}>
                <Table.Cell>{` No Payment Records Found!`}</Table.Cell>

              </Table.Row>


            )}

            {this.props.currentdonations.map(function (don, i) {
              let date1 = new Date(don.crdate);
              return (
                <Table.Row key={`his${i}`}>
                  <Table.Cell>{date1.toLocaleString()}</Table.Cell>
                  <Table.Cell><NumberFormat value={don.amount} displayType={'text'} thousandSeparator={true} prefix={'රු '} /></Table.Cell>

                  <Table.Cell>
                    {(don['donation-state'] !== 2 && don['imgurl-available']) && (
                      <Label as='a' content='View' icon='eye' onClick={() => { this.showDonUrl(don.imgurl) }} />
                    )}
                    {(don['donation-state'] !== 2 && don['imgurl-available'] === false) && (
                      <Label as='a' content='Upload your Reciept' icon='cloud upload' onClick={() => { this.showUploadModal(don.id) }} />

                    )}

                  </Table.Cell>
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
            }.bind(this))}

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
                මෙහි කරන මෙන් කාරුනිකව ඉල්ලා සිටිමු. </p>
                  <b>ඔබ බලාපොරොත්තු වන ආධාර මුදලද මෙහි දැමිය හැකි අතර, එම අවස්තාවේදී රිසිට් පත Upload කිරීම අවශය නොවේ,මුදල් බැංකුවට බැර කල පසු, History ටැබය වෙතට ගොස් එය අදාල ස්ථානයේ Upload කරන්න.</b>
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

  hideUploadModal = () => {
    this.setState({
      modal_upload_visible: false,
      donation_id: ''
    });
  }

  showUploadModal = (trnid) => {
    console.log(`trnid:${trnid}`);
    this.setState({
      modal_upload_visible: true,
      donation_update_file: null,
      donation_id: trnid
    });
  }

  showDonUrl = (url) => {
    window.open(url, "_blank")
  }

  renderUpdateDonationUser = () => {


    return (
      <Modal open={this.state.modal_upload_visible}
        onClose={() => this.hideUploadModal()}
        centered={false}
        size={'mini'}
        closeIcon
      >

        <Modal.Header>Upload Your Payment Receipt</Modal.Header>
        <Modal.Content >
          <Modal.Description>

            <Form loading={this.props.isReciptUploading} onSubmit={() => this.updateDonationUser()}>

              <Form.Input label='Upload your Payment Reciept'
                type='file'
                accept="image/png, image/jpeg , application/pdf"
                onChange={this.handleselectedFileUpdate}
              />
              <Form.Button primary>Update</Form.Button>
            </Form>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button color='red' onClick={() => this.hideUploadModal()}>
             cancel
      </Button>

        </Modal.Actions>
      </Modal>
    );
  }


  renderAprovesDonation = () => {

    return (
      <Tab.Pane attached={false}>
       {this.renderUpdateDonationUser()}
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Date</Table.HeaderCell>
              <Table.HeaderCell>Member</Table.HeaderCell>
              <Table.HeaderCell>Payment</Table.HeaderCell>
              <Table.HeaderCell>Reciept</Table.HeaderCell>
              <Table.HeaderCell>Statues</Table.HeaderCell>
              <Table.HeaderCell>Action</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {this.props.currentDonations_All_Pending !== undefined && this.props.currentDonations_All_Pending.length === 0 && (

              <Table.Row key={`first`}>
                <Table.Cell>{` No Payment Records Found Yet for Approve!`}</Table.Cell>

              </Table.Row>


            )}

            {this.props.currentDonations_All_Pending !== undefined && this.props.currentDonations_All_Pending.length>0 && this.props.currentDonations_All_Pending.map(function (don, i) {
              let date1 = new Date(don.crdate);
              return (
                <Table.Row key={`his${i}`}>
                  <Table.Cell>{date1.toLocaleString()}</Table.Cell>
                  <Table.Cell>
                    <Header as='h4' image>
                      <Image src={don.user.img} rounded size='mini' />
                      <Header.Content>
                        {don.user.fname}
                        <Header.Subheader> {don.user.lname}</Header.Subheader>
                      </Header.Content>
                    </Header>

                  </Table.Cell>
                  <Table.Cell><NumberFormat value={don.amount} displayType={'text'} thousandSeparator={true} prefix={'රු '} /></Table.Cell>

                  <Table.Cell>
                    {(don['donation-state'] !== 2 && don['imgurl-available']) && (
                      <Label as='a' content='View' icon='eye' onClick={() => { this.showDonUrl(don.imgurl) }} />
                    )}
                    {(don['donation-state'] !== 2 && don['imgurl-available'] === false) && (
                      <Label as='a' content='Upload your Reciept' icon='cloud upload' onClick={() => { this.showUploadModal(don.id) }} />

                    )}

                  </Table.Cell>

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

                  <Table.Cell warning>
                    {(don['donation-state'] === 0) && (
                      <Segment>
                        <Button onClick={() => { this.updateDonationStateUI(don.id, 1,don.user.id) }} color='green'>Approve</Button>
                        <Button onClick={() => { this.updateDonationStateUI(don.id, 2,don.user.id) }} color='red'>Cancel</Button>
                      </Segment>

                    )}
                    {(don['donation-state'] === 1 || don['donation-state'] === 2) && (
                      <Button onClick={() => { this.updateDonationStateUI(don.id, 0,don.user.id) }} color='orange'>Reset</Button>
                    )}
                  </Table.Cell>
                </Table.Row>
              );
            }.bind(this))}

          </Table.Body>


        </Table>
      </Tab.Pane>
    );
  }


  renderAlreadyApprovedDonation = () => {

    return (
      <Tab.Pane attached={false}>
             
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Date</Table.HeaderCell>
              <Table.HeaderCell>Member</Table.HeaderCell>
              <Table.HeaderCell>Payment</Table.HeaderCell>
              <Table.HeaderCell>Reciept</Table.HeaderCell>
              <Table.HeaderCell>Statues</Table.HeaderCell>
              <Table.HeaderCell>Action</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {this.props.currentDonations_All_changed!== undefined && this.props.currentDonations_All_changed.length>0 && this.props.currentDonations_All_changed.length === 0 && (

              <Table.Row key={`first`}>
                <Table.Cell>{` No Payment Records Found Yet for Approve!`}</Table.Cell>

              </Table.Row>


            )}

            {this.props.currentDonations_All_changed!== undefined && this.props.currentDonations_All_changed.map(function (don, i) {
              let date1 = new Date(don.crdate);
              console.log(don)
              return (
                <Table.Row key={`his${i}`}>
                  <Table.Cell>{date1.toLocaleString()}</Table.Cell>
                  <Table.Cell>
                    <Header as='h4' image>
                      <Image src={don.user.img} rounded size='mini' />
                      <Header.Content>
                        {don.user.fname}
                        <Header.Subheader> {don.user.lname}</Header.Subheader>
                      </Header.Content>
                    </Header>

                  </Table.Cell>
                  <Table.Cell><NumberFormat value={don.amount} displayType={'text'} thousandSeparator={true} prefix={'රු '} /></Table.Cell>

                  <Table.Cell>
                    {(don['donation-state'] !== 2 && don['imgurl-available']) && (
                      <Label as='a' content='View' icon='eye' onClick={() => { this.showDonUrl(don.imgurl) }} />
                    )}
                    {(don['donation-state'] !== 2 && don['imgurl-available'] === false) && (
                      <Label as='a' content='Upload your Reciept' icon='cloud upload' onClick={() => { this.showUploadModal(don.id) }} />

                    )}

                  </Table.Cell>

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

                  <Table.Cell warning>
                    {(don['donation-state'] === 0) && (
                      <Segment>
                        <Button onClick={() => { this.updateDonationStateUI(don.id, 1) }} color='green'>Approve</Button>
                        <Button onClick={() => { this.updateDonationStateUI(don.id, 2) }} color='red'>Cancel</Button>
                      </Segment>

                    )}
                    {(don['donation-state'] === 1 || don['donation-state'] === 2) && (
                      <Button onClick={() => { this.updateDonationStateUI(don.id, 0) }} color='orange'>Reset</Button>
                    )}
                  </Table.Cell>
                </Table.Row>
              );
            }.bind(this))}

          </Table.Body>


        </Table>
      </Tab.Pane>
    );
  }


}




/* Export Component ==================================================================== */
export default DonateViewContainer;
