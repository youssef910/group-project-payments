import React, { Component } from "react";
import Balance from "./components/Balance";
import CalcPayment from "./components/CalcPayment";
import Payments from "./components/Payments";
import currencies from "./data/currencies";
import "./App.css";
import payments from "./data/payments";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      historicRates: {},
      paymentData: payments,
      currencies: currencies,
      balance: 87.43, // This is the current balance in GBP
      rates: {},
      isLoading: true,
      error: null
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
    fetch("https://api.exchangeratesapi.io/history?start_at=2017-08-30&end_at=2018-09-01&base=GBP")
      .then((res) => {
        if (res.status >= 200 && res.status < 300) {
          return res;
        } else {
          throw new Error("HTTP error");
        }
      })
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          historicRates: data.rates,
          isLoading: !this.state.isLoading
        });
      })
      .catch((err) => {
        this.setState({
          isLoading: false,
          err: err
        });
      });
  }
  filterPaymnts = (filterElement) => {
    if (filterElement === "Pending")
      return this.state.paymentData.filter((payment) => payment.status === "Pending");
    else return this.state.paymentData.filter((payment) => payment.status === "Completed");
  };
  render() {
    return this.state.isLoading ? (
      <div>
        <p>LOADING......</p>
      </div>
    ) : this.state.error ? (
      <span>Something went wrong </span>
    ) : (
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
        <Payments
          rates={this.state.rates}
          paymentData={this.state.paymentData}
          historicRates={this.state.historicRates}
        />
      </div>
    );
  }
}

export default App;
