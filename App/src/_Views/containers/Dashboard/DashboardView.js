
import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { Button, Header, Icon, Segment, Statistic, Table, Image,Message } from 'semantic-ui-react';
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
        <Col md={12}>
          <Row>
            <Col sm={12} md={9}>
              {this.renderHeader()}
            </Col>
            <Col sm={12} md={3}>
              {this.renderRightSizeTop()}
            </Col>
          </Row>
          <Row>
            <Col sm={12} md={9}>
            <Image src={CurEvent['img-banner1']} centered />
            <Message>
   
    <p>
    ගියවර පැවැත්වූ තැඹිලි දානයේ මතක සටහන් කිහිපයක්
    </p>
  </Message>
            
              <Image src={CurEvent['img-banner2']} centered />
            </Col>
            <Col sm={12} md={3}>
              {this.renderRightSizeBottom()}
            </Col>
          </Row>
        </Col>
      </Row>

    );
  };


  renderHeader = () => {
    let CurEvent = this.props.liveEvent;
    return (
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
          <Row>
            <Col>
              <br />
              <Button color='red' onClick={()=> this.handleDonationPress()}>
                Donate Us Now !
              </Button>
            </Col>
          </Row>
        </Header>
      </Segment>
    )
  }

  renderRightSizeTop = () => {
    let CurEvent = this.props.liveEvent;
    return (
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
            <Table.Cell>
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
    );
  }

  renderRightSizeBottom = () => {
    let CurEvent = this.props.liveEvent;
    return (
      <Table>
        <Table.Header>
          <Table.Row><Table.Cell>රෝගීන්ට ලබාදෙන දෑ</Table.Cell><Table.Cell></Table.Cell></Table.Row>
        </Table.Header>
        <Table.Body>
          <Table.Row>
            <Table.Cell>
              <Statistic color='orange' size='mini'>
                <Statistic.Value>තැඹිලි ගෙඩි</Statistic.Value>
              </Statistic>
            </Table.Cell>
            <Table.Cell>
              <Statistic color='grey' size='mini'>
                <Statistic.Value>1000</Statistic.Value>
              </Statistic>
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>
              <Statistic color='orange' size='mini'>
                <Statistic.Value>දෙළුම්</Statistic.Value>
              </Statistic>
            </Table.Cell>
            <Table.Cell>
              <Statistic color='grey' size='mini'>
                <Statistic.Value>500</Statistic.Value>
              </Statistic>
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>
              <Statistic color='orange' size='mini'>
                <Statistic.Value>කොමඩු</Statistic.Value>
              </Statistic>
            </Table.Cell>
            <Table.Cell>
              <Statistic color='grey' size='mini'>
                <Statistic.Value>500</Statistic.Value>
              </Statistic>
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    );
  }

}


/* Export Component ==================================================================== */
export default DashboardViewContainer;
