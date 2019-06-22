import React, { Component } from "react";
import Button from "./Button";
import "./CalcPayment.css";

class Payment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      insertedAmount: 0.0,
      selectedCurrency: "USD",
      amount: 0,
      paymentDataAdd: props.paymentData
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

  addPayment(e) {
    e.preventDefault();
    const { paymentDataAdd } = this.state;
    const newPayment = this.newPayment.value;

    this.setState({
      paymentDataAdd: [...this.props.payment.amount, newPayment]
    });
    this.addForm.reset();
  }

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

            <form
              ref={(input) => (this.addForm = input)}
              className="form-inline"
              onSubmit={(e) => {
                this.addPayment(e);
              }}>
              <div>
                <label> Pay here</label>
                <input ref={(input) => (this.newPayment = input)} type="number" />
              </div>
              <Button type="submit" className="btn btn-primary">
                {" "}
                Make Payment{" "}
              </Button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Payment;
