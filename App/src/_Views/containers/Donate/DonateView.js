
import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { Tab, Button, Form, Message, List, Image, Label,Divider } from 'semantic-ui-react';
import NumberFormat from 'react-number-format';
import BOCLogo from '../../styles/img/boc.jpg';
import bankIcon from '../../styles/img/bankicon.jpg';


class DonateViewContainer extends Component {

  constructor(props) {
    super();
    this.state = {

    }
  }

  componentDidMount = async () => {


  }


  shouldComponentUpdate(nextProps, nextState) {

    return true;
  }



  makeDonation = () => {

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
    return (
      <Tab.Pane attached={false}>
        <Form>
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
                  <List horizontal  size={'huge'}>
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
         
          <Form.Input label='Payment Reciept' type='file' />
          
          <Form.Field>
          <label>Amount</label>
          <NumberFormat thousandSeparator={true} prefix={'රු '} />
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
