import React, { Component } from "react";
import "./Balance.css";

class Balance extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alternateCurrency: "USD",
      balanceInAlternateCurrency: props.total
    };
  }

  componentDidMount() {
    fetch(`https://api.exchangeratesapi.io/latest?base=GBP`)
      .then((res) => res.json())
      .then((data) => {
        const alternateCurrency = this.state.alternateCurrency;
        const exchangeRates = data.rates[alternateCurrency];
        const newBalance = this.props.total;
        this.setState({
          balanceInAlternateCurrency: (exchangeRates * newBalance).toFixed(2)
        });
      });
    console.log("alternateCurrency");
    console.log("currancies");
  }

  handleCurrencyUpdate = (event) => {
    const handleChange = event.target.value;
    this.setState({
      alternateCurrency: handleChange
    });
    this.componentDidMount();
  };

  render() {
    return (
      <div className="Balance">
        <h2 className="Balance-title">
          Your account balance is
          <span className="Balance-total">£{this.props.total}</span>
        </h2>

        <div className="Balance-alt">
          Your balance is {this.state.balanceInAlternateCurrency} shows the balance on the webpage
          in
          <select defaultValue={this.state.alternateCurrency} onChange={this.handleCurrencyUpdate}>
            {this.props.currencies.map((currency, index) => (
              <option key={index}>{currency}</option>
            ))}
          </select>
          .
        </div>
      </div>
    );
  }
}

export default Balance;
