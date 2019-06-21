import React, { Component } from "react";
import Button from "./Button";
import "./CalcPayment.css";

class Payment extends Component {
  constructor() {
    super();
    this.state = {
      insertedAmount: 0.0,
      selectedCurrency: "USD",
      amount: 0
    };
  }

  selectCurrency = (event) => {
    const currency = event.target.value;
    this.setState({
      selectedCurrency: currency
    });
  };

  handleAmount = (event) => {
    const amount = event.target.value;
    this.setState({
      amount: amount
    });
  };
  handleChange = (e) => {
    const inputAmount = e.target.value;
    this.setState({ insertedAmount: inputAmount });
  };
  convertAmount = (currency) => {
    return (this.state.insertedAmount / this.props.rates[currency]).toFixed(2);
  };

  clickHandler = () => {
    this.setState({
      amount: this.convertAmount(this.state.selectedCurrency)
    });
  };
  render() {
    return (
      <div className="CalcPayment">
        <h2 className="CalcPayment-label">Calculate Payment in GBP</h2>
        <div className="CalcPayment-control">
          <select onChange={this.selectCurrency} defaultValue={this.state.selectedCurrency}>
            {this.props.currencies.map((currency, index) => (
              <option key={index}>{currency}</option>
            ))}
          </select>
          <input
            className="CalcPayment-amount"
            onChange={this.handleChange}
            type="Number"
            value={this.state.insertedAmount}
            onFocus={() => this.setState({ insertedAmount: "" })}
          />
          is worth <span className="CalcPayment-result">{this.state.amount}</span> in GBP.
          <div className="CalcPayment-calculate">
            <Button onClick={this.clickHandler}>Calculate</Button>
            <Button> Add payments </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default Payment;
