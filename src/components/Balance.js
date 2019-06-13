import React, { Component } from "react";
import "./Balance.css";

class Balance extends Component {
  constructor() {
    super();
    this.state = {
      alternateCurrency: "USD",
      selectedCurrency: null
    };
  }

  handelChange = (event) => {
    this.setState({ selectedCurrency: event.target.value });
  };
  // componentDidMount(){fetch(" https://api.exchangeratesapi.io/latest HTTP/1.1").then(res=>res.json()).then(data=>console.log(data))

  // }
  // CalculateBalanceonselected =()=>{this.props.total*1.3}}

  render() {
    console.log(this.state.selectedCurrency);
    return (
      <div className="Balance">
        <h2 className="Balance-title">
          Your account balance is
          <span className="Balance-total">£{this.props.total}</span>
        </h2>
        <div className="Balance-alt">
          Your balance is {this.props.total * 1.3} in{this.state.selectedCurrency}
          <select onChange={this.handelChange} defaultValue={this.state.alternateCurrency}>
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
