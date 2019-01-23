
import React, { Component } from 'react';
import PropTypes from "prop-types";
import { Container, Row, Col } from 'reactstrap';
import { Tab, Button, Message, Table, Icon, Modal, Label, Segment,List,Image } from 'semantic-ui-react';

class ContactViewContainer extends Component {

  static contextTypes = {
    router: PropTypes.object,

  };
  constructor(props) {
    super();

  }

  componentDidMount = async () => {


  }


  shouldComponentUpdate(nextProps, nextState) {

    return true;
  }

  showAccount = (str)=>{
    if(str==='B'){
     
     window.open('https://www.facebook.com/buwaneka.sumanasekara', '_blank');
     //window.location = 'https://www.facebook.com/buwaneka.sumanasekara'
    }else{
     
      window.open('https://www.facebook.com/indika.sahan', '_blank');
    }
  }

  render = () => {
    return (
      <Container>
        <Row>
          <Col md={{ size: 8, offset: 2 }}>
            <Segment basic>
              <List size={'massive'}>
              <List.Item >
                  <Image avatar src='https://scontent.fcmb2-1.fna.fbcdn.net/v/t1.0-1/p160x160/44088694_2200849493282891_6667100037345968128_n.jpg?_nc_cat=108&_nc_ht=scontent.fcmb2-1.fna&oh=148d1cec40ad891d409312ede3dd7b06&oe=5C9ECFDB' />
                  <List.Content>
                    <List.Header >Buwaneka Sumanasekara</List.Header>
                    <List.Description>
                    <p>Email: <a href="mailto:buwanekasumanasekara@gmail.com">buwanekasumanasekara@gmail.com</a> </p>
                    Contact No: +94776161689
        </List.Description>
                  </List.Content>
                </List.Item>
                
                <List.Item >
                  <Image avatar src='https://scontent.fcmb2-1.fna.fbcdn.net/v/t1.0-1/p160x160/46744463_2221268391219426_7922833957983354880_n.jpg?_nc_cat=101&_nc_ht=scontent.fcmb2-1.fna&oh=98c9905358ef67fb92969eeb5c24f21c&oe=5CA8AF5A' />
                  <List.Content>
                    <List.Header >Sahan Wijesekara</List.Header>
                    <List.Description>
                    <p>Email: <a href="mailto:indikasahan2010@gmail.com">indikasahan2010@gmail.com</a> </p>
                    Contact No: +94773355726
        </List.Description>
                  </List.Content>
                </List.Item>
                
              </List>
            </Segment>
          </Col>
        </Row>

      </Container>
    );
  };



}


/* Export Component ==================================================================== */
export default ContactViewContainer;
