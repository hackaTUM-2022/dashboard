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
import OrderView from "components/OrderListView";
import { useLocation } from "react-router-dom";


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
  const URL = "http://131.159.213.251:8000";
  const location = useLocation();

  const [stockList, setStockList] = useState([{}])
  const [pendingList, setPendingList] = useState([{}])
  const [name, setName] = useState('')
  const [qty, setQty] = useState(0.0)
  const [price, setPrice] = useState(0.0)
  const [user, setUser] = useState('')
  const [detail, setDetail] = useState("")

  function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
  }

  const doSetup = () => {
    getAllStocksOfUserHandler();
    getAllOrdersOfUserHandler();
  }

  useEffect(() => {
    setUser(location.state.detail);
  }, [location]);

  // Post a Stock
  const addStockHandler = () => {
    axios.post(URL + '/api/stock', { 'name': name, 'price': price, 'qty': qty, 'user' : user })
      .then(res => console.log(res));
  };

  const addMatchingHandler = () => {
    axios.post(URL + '/api/match/'+ {"name": "ibm", "side": "BUY", "qty": "5", "price": "10", "customer": "suckerboi"} )
      .then(res => console.log(res));
  };  

  const getAllStocksOfUserHandler = () => {
    axios.get(URL + '/api/stock/' + user)
    .then(res => {
      setStockList(res.data)
    })
  };

  const getAllOrdersOfUserHandler = () => {
    axios.get(URL + '/api/order/' + user)
    .then(res => {
      setPendingList(res.data)
    })
  };

  // Post an order
  const addOrderHandlerBuy = () => {
    axios.post(URL + '/api/order', { 'name': name, 'side' : 'BUY', 'qty': qty, 'price': price, 'customer' : user })
      .then(res => console.log(res));
      getAllStocksOfUserHandler();
      getAllOrdersOfUserHandler();
  };

  const addOrderHandlerSell = () => {
    axios.post(URL + '/api/order', { 'name': name, 'side' : 'SELL' ,'qty': qty, 'price': price, 'customer' : user })
      .then(res => console.log(res));
      getAllStocksOfUserHandler();
      getAllOrdersOfUserHandler();
  };

  const getAllPendingHandler = () => {
    axios.get(URL + '/api/order')
      .then(res => {
        setPendingList(res.data)
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
                    <h5 className="card-category">{user}'s Portfolio</h5>
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
                        onClick={doSetup}
                      >
                        <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                          Refresh Transactions
                        </span>
                        <span className="d-block d-sm-none">
                          <i className="tim-icons icon-single-02" />
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
                Create Orders
              </h4>
                <Tabs
                  defaultActiveKey="buy"
                  className="mb-3"
                >
                  <Tab eventKey="buy" title="Buy">
                  <Form.Group className="mb-3" controlId="stockID">
                  <Form.Label>Stock ID</Form.Label>
                  <Form.Control type="text" placeholder="enter stock id" onChange={event => setName(event.target.value)}/>
                    <Form.Label>Ask</Form.Label>
                    <Form.Control type="text" placeholder="enter bidding price" onChange={event => setPrice(event.target.value)}/>
                    <Form.Label>Quantity</Form.Label>
                    <Form.Control type="text" placeholder="enter quantity" onChange={event => setQty(event.target.value)}/>
                    <Button onClick={addOrderHandlerBuy}>Issue Buying Order</Button>
                  </Form.Group>
                  </Tab>
                  <Tab eventKey="sell" title="Sell">
                  <Form.Group className="mb-3" controlId="stockID">
                  <Form.Label>Stock ID</Form.Label>
                    <Form.Control type="text" placeholder="enter stock id" onChange={event => setName(event.target.value)}/>
                    <Form.Label>Ask</Form.Label>
                    <Form.Control type="text" placeholder="enter asking price" onChange={event => setPrice(event.target.value)}/>
                    <Form.Label>Quantity</Form.Label>
                    <Form.Control type="text" placeholder="enter quantity" onChange={event => setQty(event.target.value)}/>
                    <Button onClick={addOrderHandlerSell}>Issue Selling Order</Button>
                  </Form.Group>
                  </Tab>
                  <Tab eventKey="addStock" title="Add stock">
                  <Form.Group className="mb-3" controlId="stockID">
                  <Form.Label>Stock ID</Form.Label>
                    <Form.Control type="text" placeholder="enter the stock" onChange={event => setName(event.target.value)}/>
                    <Form.Label>Ask</Form.Label>
                    <Form.Control type="text" placeholder="enter the est. value" onChange={event => setPrice(event.target.value)}/>
                    <Form.Label>Quantity</Form.Label>
                    <Form.Control type="text" placeholder="enter quantity" onChange={event => setQty(event.target.value)}/>
                    <Form.Label>Owner</Form.Label>
                    <Form.Control type="text" placeholder="enter stock owner" onChange={event => setUser(event.target.value)}/>
                    <Button onClick={addMatchingHandler}>Issue Selling Order</Button>
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
                    <StockView  stockList={stockList} />
                  </tbody>
                </Table>
                <h4>
                    Pending Orders
                </h4>
                <Table className="tablesorter" responsive>
                  <thead className="text-primary">
                    <tr>
                      <th>Name</th>
                      <th>Offer</th>
                      <th>Quantity</th>
                      <th>Side</th>
                    </tr>
                  </thead>
                  <tbody>
                    <OrderView  stockList={pendingList} />
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
