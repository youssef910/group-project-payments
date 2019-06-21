import React, { Component } from "react";
import Button from "../components/Button";
import "./Payments.css";
import payments from "../data/payments.js";

class Payments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      paymentData: payments
    };
  }

  sumValues = () =>
    this.state.paymentData
      .reduce((accumulator, current) => accumulator + current.amount, 0)
      .toFixed(2);

  netValue = () =>
    this.state.paymentData
      .filter((element) => {
        return element.status !== "Pending";
      })
      .reduce((accumulator, current) => accumulator + current.amount, 0);

  cancelPendingPayments = (amount) => {
    this.setState({ paymentData: this.state.paymentData.filter((payment) => payment !== amount) });
  };

  render() {
    return (
      <div>
        <table className="Payments">
          <tr>
            <th>Date</th>
            <th>Cur</th>
            <th>Amount</th>
            <th className="Payments-description">Description</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
          {this.state.paymentData.map((amount) => {
            return (
              <tr>
                <td>{amount.date}</td>
                <td>{amount.currency}</td>
                <td>{amount.amount}</td>
                <td>{amount.description}</td>
                <td>{amount.status}</td>
                <td>
                  {" "}
                  {amount.status === "Pending" ? (
                    <Button onClick={() => this.cancelPendingPayments(amount)} />
                  ) : null}
                </td>
              </tr>
            );
          })}
          ;
          <tfoot>
            <tr>
              <td />
              <td />
              <td>{this.sumValues()}</td>
              <td>Total (GBP)</td>
              <td />
              <td />
            </tr>
          </tfoot>
        </table>
      </div>
    );
  }
}

export default Payments;
