import React, { Component } from "react";
import Balance from "./components/Balance";
import CalcPayment from "./components/CalcPayment";
import Payments from "./components/Payments";
import currencies from "./data/currencies";
import "./App.css";
import payments from "./data/payments";

class App extends Component {
  constructor() {
    super();
    this.state = {
      paymentData: payments,
      currencies: currencies,
      balance: 87.43, // This is the current balance in GBP
      rates: {}
    };
  }
  componentDidMount() {
    fetch("https://api.exchangeratesapi.io/latest?base=GBP")
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          rates: data.rates
        });
      });
  }
  filterPaymnts = (filterElement) => {
    if (filterElement === "Pending")
      return this.state.paymentData.filter((payment) => payment.status === "Pending");
    else return this.state.paymentData.filter((payment) => payment.status === "Completed");
  };
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Payments</h1>
        </header>
        <Balance
          total={this.state.balance}
          currencies={this.state.currencies}
          paymentData={this.state.paymentData}
        />
        <CalcPayment
          paymentData={this.state.paymentData}
          currencies={this.state.currencies}
          rates={this.state.rates}
        />
        <h2>Payments</h2>
        <Payments rates={this.state.rates} paymentData={this.state.paymentData} />
      </div>
    );
  }
}

export default App;
