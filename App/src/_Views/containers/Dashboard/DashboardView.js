
import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { Button, Header, Icon, Segment, Statistic, Table, Image } from 'semantic-ui-react';
import NumberFormat from 'react-number-format';
import PropTypes from "prop-types";
import imgcontributors from '../../styles/img/donator.png';

class DashboardViewContainer extends Component {
  static contextTypes = {
    router: PropTypes.object,

  };


  componentDidMount = async () => {
    await this.props.loadCurrentEvent();
    this.props.updateAppLiveInfo();
    this.props.updateSelfDonations(this.props.liveEvent.id, this.props.uid);
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
        <Col sm={12} md={9}>

          <Segment placeholder>
            <Header icon>
              <Row>
                <Col sm={12} md={3}>
                  <Icon name='home' color='grey' />
                  {`${CurEvent.place}`}
                </Col>
                <Col sm={12} md={6}>
                  <Image src={CurEvent['img-header']} size='small' centered />
                  {`${CurEvent.name}`}
                </Col>
                <Col sm={12} md={3}>
                  <Icon name='calendar check outline' color='grey' />
                  {`${CurEvent.date}`}
                </Col>
              </Row>
            </Header>
          </Segment>
        </Col>
        <Col sm={12} md={3}>
          <Table color={'blue'} >
            <Table.Body>
              <Table.Row>
                <Table.Cell >
                  Target Amount
                </Table.Cell>
                <Table.Cell>
                  <Statistic color='red' size='mini'>
                    <Statistic.Value><NumberFormat value={CurEvent['total-amount']} displayType={'text'} thousandSeparator={true} prefix={'රු '} /></Statistic.Value>
                  </Statistic>
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell >
                  Current Expect
                </Table.Cell>
                <Table.Cell>
                  <Statistic color='red' size='mini'>
                    <Statistic.Value><NumberFormat value={CurEvent['total-expect']} displayType={'text'} thousandSeparator={true} prefix={'රු '} /></Statistic.Value>
                  </Statistic>
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell >
                  Recived
                </Table.Cell>
                <Table.Cell>
                  <Statistic color='red' size='mini'>
                    <Statistic.Value><NumberFormat value={CurEvent['total-recived']} displayType={'text'} thousandSeparator={true} prefix={'රු '} /></Statistic.Value>
                  </Statistic>
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell >
                  Contributors
                </Table.Cell>
                <Table.Cell>
                  <Statistic color='red' size='small'>
                    <Statistic.Value>
                    {CurEvent['total-contributors']}
                    <Image src={imgcontributors} inline circular />  
                   
                    </Statistic.Value>
                  </Statistic>
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell >
                  Members
                </Table.Cell>
                <Table.Cell>
                  <Statistic color='red' size='mini'>
                    <Statistic.Value>{this.props.liveinfo['users-all']}</Statistic.Value>
                  </Statistic>
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>

        </Col>

      </Row>

    );
  };



}


/* Export Component ==================================================================== */
export default DashboardViewContainer;
