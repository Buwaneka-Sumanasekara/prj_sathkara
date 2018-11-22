
import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { Button, Header, Icon, Segment, Statistic, Label,Image } from 'semantic-ui-react';
import NumberFormat from 'react-number-format';
import PropTypes from "prop-types";


class DashboardViewContainer extends Component {
  static contextTypes = {
    router: PropTypes.object,

  };


  componentDidMount = async () => {
    await this.props.loadCurrentEvent();
    this.props.updateAppLiveInfo();
    this.props.updateSelfDonations(this.props.liveEvent.id,this.props.uid);
  }


  shouldComponentUpdate(nextProps, nextState) {

    return true;
  }

  handleDonationPress = () => {
    this.context.router.history.push(`/donations`);
  }



  render = () => {
    let CurEvent = this.props.liveEvent;
    return (
      <Row>
        <Col sm={12}>
          <Row>
            <Col sm={12}>
              <Segment placeholder>
                <Header icon>
                  <Row>
                    <Col sm={12} md={3}>
                      <Icon name='home' color='grey' />
                      {`${CurEvent.place}`}
                    </Col>
                    <Col sm={12} md={6}>
                      <Image src={CurEvent['img-header']} size='small' centered/>
                      {`${CurEvent.name}`}
                    </Col>
                    <Col sm={12} md={3}>
                      <Icon name='calendar check outline' color='grey' />
                      {`${CurEvent.date}`}
                    </Col>
                  </Row>
                  <Row>
                    <Col sm={12}>
                      <br />
                      <Segment >
                        <Row>
                          <Col sm={12} md={3}>
                            <Statistic color='red' size='small'>
                              <Statistic.Value>{CurEvent['total-contributors']}</Statistic.Value>
                              <Statistic.Label>Contributors</Statistic.Label>
                            </Statistic>
                          </Col>
                          <Col sm={12} md={3}>
                            <Statistic color='red' size='small'>
                              <Statistic.Value><NumberFormat value={CurEvent['total-amount']} displayType={'text'} thousandSeparator={true} prefix={'රු '} /></Statistic.Value>
                              <Statistic.Label>Target Amount</Statistic.Label>
                            </Statistic>
                          </Col>
                          <Col sm={12} md={3}>
                            <Statistic color='red' size='small'>
                              <Statistic.Value><NumberFormat value={CurEvent['total-expect']} displayType={'text'} thousandSeparator={true} prefix={'රු '} /></Statistic.Value>
                              <Statistic.Label>Current Expect</Statistic.Label>
                            </Statistic>
                          </Col>
                          <Col sm={12} md={3}>
                            <Statistic color='red' size='small'>
                              <Statistic.Value><NumberFormat value={CurEvent['total-recived']} displayType={'text'} thousandSeparator={true} prefix={'රු '} /></Statistic.Value>
                              <Statistic.Label>Received</Statistic.Label>
                            </Statistic>
                          </Col>
                        </Row>

                      </Segment>
                    </Col>

                  </Row>
                </Header>
              </Segment>
            </Col>
          </Row>

          <Row>
            <Col sm={12} md={4} >
              <Segment textAlign='center'>
                <Statistic color='orange' size='small'>
                  <Statistic.Value>{this.props.liveinfo['users-all']}</Statistic.Value>
                  <Statistic.Label>Members</Statistic.Label>
                </Statistic>
              </Segment>
            </Col>
            <Col sm={12} md={4} >
              <Segment textAlign='center'>
                <Button as='div' labelPosition='right' onClick={()=>this.handleDonationPress()}>
                  <Button color='red'>
                    <Icon name='heart' />
                    Donate
                </Button>
                  <Label as='a' basic color='red' pointing='left'>
                    US
                </Label>
                </Button>
              </Segment>
            </Col>
            <Col sm={12} md={4} >
              <Segment textAlign='center'>
              <Statistic color='olive' size='small'>
                  <Statistic.Value><NumberFormat value={this.props.currentdonation} displayType={'text'} thousandSeparator={true} prefix={'රු '} /></Statistic.Value>
                  <Statistic.Label>Your Donations</Statistic.Label>
                </Statistic>
              </Segment>
            </Col>
          </Row>
        </Col>

      </Row>

    );
  };



}


/* Export Component ==================================================================== */
export default DashboardViewContainer;
