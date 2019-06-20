import React, { Component } from "react";
import Button from "./Button";
import "./CalcPayment.css";

class Payment extends Component {
  constructor() {
    super();
    this.state = {
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
    console.log(amount);
    this.setState({
      amount: amount
    });
  };

  convertAmount = (event) => {
    console.log(this.state.selectedCurrency);
    var url = "https://api.exchangeratesapi.io/latest?base=GBP";
    fetch(url)
      .then((resp) => resp.json())
      .then((rate) => {
        let rateValue = rate.rates[this.state.selectedCurrency];
        //console.log(rate.rates[this.state.selectedCurrency])
        console.log(rateValue);
        let result = this.state.amount * rateValue;
        //console.log(result)

        this.setState({
          result: result
        });
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
            onChange={this.handleAmount}
            className="CalcPayment-amount"
            type="Number"
            defaultValue="0.00"
          />
          is worth <span className="CalcPayment-result">{this.state.result}</span> in GBP.
          <div className="CalcPayment-calculate">
            <Button onClick={this.convertAmount}>Calculate</Button>
          </div>
        </div>
      </div>
    );
  }
}

export default Payment;
