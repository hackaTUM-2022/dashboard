/*!

=========================================================
* Black Dashboard React v1.2.1
=========================================================

* Product Page: https://www.creative-tim.com/product/black-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/black-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { useEffect, useState } from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// react plugin used to create charts
import { Line, Bar } from "react-chartjs-2";
import Form from 'react-bootstrap/Form';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import axios from 'axios';
import StockView from '../components/StockListView';


// reactstrap components
import {
  Button,
  ButtonGroup,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col,
} from "reactstrap";

// core components
import {
  chartExample1,
} from "variables/charts.js";

function Dashboard(props) {
  const [stockList, setStockList] = useState([{}])
  const [pendingList, setPendingList] = useState([{}])
  const [name, setName] = useState('')
  const [qty, setQty] = useState(0.0)
  const [price, setPrice] = useState(0.0)
  const [user, setUser] = useState('')
  const [lastOrder, setLastOrder] = useState({})

  // Post a Stock
  const addStockHandler = () => {
    axios.post('http://131.159.213.251:8000/api/stock', { 'name': name, 'price': price, 'qty': qty, 'user' : 'me' })
      .then(res => console.log(res))
  };

  // Post an order
  const addOrderHandlerBuy = () => {
    axios.post('http://131.159.213.251:8000/api/order', { 'name': name, 'side' : 'BUY', 'qty': qty, 'price': price, 'customer' : 'me' })
      .then(res => console.log(res));
      getHandler();
      lastOrderHandler();
  };

  const addOrderHandlerSell = () => {
    axios.post('http://131.159.213.251:8000/api/order', { 'name': name, 'side' : 'SELL' ,'qty': qty, 'price': price, 'customer' : 'me' })
      .then(res => console.log(res));
      getHandler();
      lastOrderHandler();
  };

  const getHandler = () => {
    axios.get('http://131.159.213.251:8000/api/order')
      .then(res => {
        setPendingList(res.data)
      })
  };

  const lastOrderHandler = () => {
    axios.get('http://131.159.213.251:8000/api/lastorder')
      .then(res => {
        setLastOrder(res.data)
      })
  };

  const [bigChartData, setbigChartData] = React.useState("data1");
  const setBgChartData = (name) => {
    setbigChartData(name);
  };
  return (
    <>
      <div className="content">
        <Row>
          <Col xs="12">
            <Card className="card-chart">
              <CardHeader>
                <Row>
                  <Col className="text-left" sm="6">
                    <h5 className="card-category">My Portfolio</h5>
                    <CardTitle tag="h2">Performance</CardTitle>
                  </Col>
                  <Col sm="6">
                    <ButtonGroup
                      className="btn-group-toggle float-right"
                      data-toggle="buttons"
                    >
                      <Button
                        tag="label"
                        className={classNames("btn-simple", {
                          active: bigChartData === "data1"
                        })}
                        color="info"
                        id="0"
                        size="sm"
                        onClick={() => setBgChartData("data1")}
                      >
                        <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                          Accounts
                        </span>
                        <span className="d-block d-sm-none">
                          <i className="tim-icons icon-single-02" />
                        </span>
                      </Button>
                      <Button
                        color="info"
                        id="1"
                        size="sm"
                        tag="label"
                        className={classNames("btn-simple", {
                          active: bigChartData === "data2"
                        })}
                        onClick={() => setBgChartData("data2")}
                      >
                        <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                          Purchases
                        </span>
                        <span className="d-block d-sm-none">
                          <i className="tim-icons icon-gift-2" />
                        </span>
                      </Button>
                      <Button
                        color="info"
                        id="2"
                        size="sm"
                        tag="label"
                        className={classNames("btn-simple", {
                          active: bigChartData === "data3"
                        })}
                        onClick={() => setBgChartData("data3")}
                      >
                        <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                          Sessions
                        </span>
                        <span className="d-block d-sm-none">
                          <i className="tim-icons icon-tap-02" />
                        </span>
                      </Button>
                    </ButtonGroup>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <div className="chart-area">
                  <Line
                    data={chartExample1[bigChartData]}
                    options={chartExample1.options}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
        </Row>
        <Row>
          <Col lg="6" md="12">
            <Card className="card-tasks">
              <CardBody>
              <h4>
                Register Orders
              </h4>
                <Tabs
                  defaultActiveKey="buy"
                  className="mb-3"
                >
                  <Tab eventKey="buy" title="Buy">
                  <Form.Group className="mb-3" controlId="stockID">
                  <Form.Label>Stock ID</Form.Label>
                  <Form.Control type="text" placeholder="enter the stock" onChange={event => setName(event.target.value)}/>
                    <Form.Label>Ask</Form.Label>
                    <Form.Control type="text" placeholder="enter your asking price" onChange={event => setPrice(event.target.value)}/>
                    <Form.Label>Quantity</Form.Label>
                    <Form.Control type="text" placeholder="enter the quantity" onChange={event => setQty(event.target.value)}/>
                    <Button onClick={addOrderHandlerBuy}>Issue Buying Order</Button>
                  </Form.Group>
                  </Tab>
                  <Tab eventKey="sell" title="Sell">
                  <Form.Group className="mb-3" controlId="stockID">
                  <Form.Label>Stock ID</Form.Label>
                    <Form.Control type="text" placeholder="enter the stock" onChange={event => setName(event.target.value)}/>
                    <Form.Label>Ask</Form.Label>
                    <Form.Control type="text" placeholder="enter your asking price" onChange={event => setPrice(event.target.value)}/>
                    <Form.Label>Quantity</Form.Label>
                    <Form.Control type="text" placeholder="enter the quantity" onChange={event => setQty(event.target.value)}/>
                    <Button onClick={addOrderHandlerSell}>Issue Selling Order</Button>
                  </Form.Group>
                  </Tab>
                </Tabs>
              </CardBody>
            </Card>
          </Col>
          <Col lg="6" md="12">
            <Card>
              <CardBody>
              <h4>
                Portfolio
              </h4>
                <Table className="tablesorter" responsive>
                  <thead className="text-primary">
                    <tr>
                      <th>Name</th>
                      <th>Est. Value</th>
                      <th>Quantity</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{lastOrder.name}</td>
                      <td>{lastOrder.price}</td>
                      <td>{lastOrder.qty}</td>
                    </tr>
                  </tbody>
                </Table>
                <h4>
                Pending Orders
              </h4>
                <Table className="tablesorter" responsive>
                  <thead className="text-primary">
                    <tr>
                      <th>Name</th>
                      <th>Est. Value</th>
                      <th>Quantity</th>
                    </tr>
                  </thead>
                  <tbody>
                    <StockView stockList={pendingList} />
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Dashboard;
