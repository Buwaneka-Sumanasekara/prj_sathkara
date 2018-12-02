
import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { Tab, Button, Message, Table, Icon, Modal, Label } from 'semantic-ui-react';
import * as commonFunctions from '../../../common';

class NotifViewContainer extends Component {

  constructor(props) {
    super();
    this.state = {
      modal_msg_visible: false,
      modal_msg: {}
    }
  }

  componentDidMount = async () => {
    this.props.updateNotifications(this.props.uid);

  }


  shouldComponentUpdate(nextProps, nextState) {

    return true;
  }


  showMsg = (key,notif) => {
    this.setState({ modal_msg_visible: true, modal_msg: notif });
    if (!notif.isseen) {
         
        commonFunctions.updateNotificationState(notif);
    }
  }

  hideMsgModal = () => {
    this.setState({ modal_msg_visible: false, modal_msg: {} });
  }


  render = () => {

    let panes = [
      { menuItem: 'Private', render: () => this.renderPrivateMsg() },
      { menuItem: 'Public', render: () => this.renderPublicMsg() }
    ]

    return (
      <Container>
        <Row>
          <Col md={12}>
            <Tab menu={{ pointing: true }} panes={panes} />
            {this.renderMsgModal()}
          </Col>
        </Row>

      </Container>
    );
  };


  renderPrivateMsg = () => {
    return (
      <Tab.Pane attached={false}>
        <Table celled>
          <Table.Body>
            {this.props.notif_private.length === 0 && (
              <Table.Row key={`first`}>
                <Table.Cell>{` No Messages !`}</Table.Cell>
              </Table.Row>
            )}
            {this.props.notif_private.map(function (notif, i) {
              let date1 = new Date(notif.date);
              return (
                <Table.Row key={`notifP_${i}`} active={!notif.isseen}>
                  <Table.Cell>{date1.toLocaleString()}</Table.Cell>
                  <Table.Cell>{notif.title}</Table.Cell>
                  <Table.Cell>
                    {(notif.isseen) && (
                      <Label as='a' content='Read' icon='eye' onClick={() => { this.showMsg(i,notif) }} />
                    )}
                    {(!notif.isseen) && (
                      <Label as='a' color={'blue'} content='Read' icon='eye' onClick={() => { this.showMsg(i,notif) }} />
                    )}
                  </Table.Cell>
                </Table.Row>
              );
            }.bind(this))}
          </Table.Body>
        </Table>
      </Tab.Pane>
    )
  }

  renderPublicMsg = () => {
    return (
      <Tab.Pane attached={false}>
        <Table celled>
          <Table.Body>
            {this.props.notif_topic.length === 0 && (
              <Table.Row key={`first`}>
                <Table.Cell>{` No Messages !`}</Table.Cell>
              </Table.Row>
            )}
            {this.props.notif_topic.map(function (notif, i) {
              let date1 = new Date(notif.date);
              return (
                <Table.Row key={`notifG_${i}`} active={!notif.isseen}>
                  <Table.Cell>{date1.toLocaleString()}</Table.Cell>
                  <Table.Cell>{notif.title}</Table.Cell>
                  <Table.Cell>{``}</Table.Cell>
                  <Table.Cell>
                    {(notif.isseen) && (
                      <Label as='a' content='Read' icon='eye' onClick={() => { this.showMsg(i,notif) }} />
                    )}
                    {(!notif.isseen) && (
                      <Label as='a' color={'blue'} content='Read' icon='eye' onClick={() => { this.showMsg(i,notif) }} />
                    )}
                  </Table.Cell>
                </Table.Row>
              );
            }.bind(this))}
          </Table.Body>
        </Table>
      </Tab.Pane>
    )
  }

  renderMsgModal = () => {
    let msg = this.state.modal_msg;
    return (
      <Modal open={this.state.modal_msg_visible}
        onClose={() => this.hideMsgModal()}
        centered={false}
        size={'mini'}

      >

        <Modal.Header>{msg.title}</Modal.Header>
        <Modal.Content >
         
            <p>{msg.body}</p>
        </Modal.Content>
        <Modal.Actions>
          <Button color='blue' onClick={() => this.hideMsgModal()}>
            <Icon name='checkmark' /> Ok
      </Button>

        </Modal.Actions>
      </Modal>
    );
  }

}


/* Export Component ==================================================================== */
export default NotifViewContainer;
