import React, { Component } from "react";
import Button from "../components/Button";
import "./Payments.css";

class TableRow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      paymentData: this.props.paymentData
    };
  }

  render() {
    return (
      <tr>
        <td>{this.props.payment.date}</td>
        <td>{this.props.payment.currency}</td>
        <td>{this.props.payment.amount}</td>
        <td>{this.props.payment.description}</td>
        <td>{this.props.payment.status}</td>
        <td>
          {this.props.payment.status === "Pending" ? (
            <Button onClick={this.props.cancelPendingPayments}>Cancel</Button>
          ) : null}
        </td>
      </tr>
    );
  }
}
class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      paymentData: this.props.paymentData
    };
  }
  cancelPendingPayments = (amount) => {
    this.setState({ paymentData: this.state.paymentData.filter((payment) => payment !== amount) });
  };

  render() {
    return (
      <table className="Payments">
        <thead>
          <tr>
            <th>Date</th>
            <th>Cur</th>
            <th>Amount</th>
            <th className="Payments-description">Description</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {this.state.paymentData
            .filter((item) => item.status === this.props.filterFactor)
            .map((item, index) => (
              <TableRow
                key={index}
                payment={item}
                cancelPendingPayments={() => this.cancelPendingPayments(item)}
              />
            ))}
        </tbody>
        <tfoot>
          <tr>
            <td />
            <td />
            <td>
              {this.state.paymentData.filter((item) => item.status === this.props.filterFactor)
                .length === 0
                ? "0.00"
                : this.state.paymentData
                    .filter((item) => item.status === this.props.filterFactor)
                    .map((item) => {
                      return item.amount / this.props.rates[item.currency];
                    })
                    .reduce((accumulator, current) => accumulator + current, 0)
                    .toFixed(2)}
            </td>
            <td>Total (GBP)</td>
            <td />
            <td />
          </tr>
        </tfoot>
      </table>
    );
  }
}

class Payments extends Component {
  render() {
    return (
      <div>
        <Table
          paymentData={this.props.paymentData}
          rates={this.props.rates}
          filterFactor="Pending"
        />
        <Table
          paymentData={this.props.paymentData}
          rates={this.props.rates}
          filterFactor="Complete"
        />
      </div>
    );
  }
}

export default Payments;
