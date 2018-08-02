import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { CardElement, injectStripe } from 'react-stripe-elements';
import { Typography } from '../../../node_modules/@material-ui/core';

class CheckoutForm extends Component {
  constructor(props) {
    super(props);
    this.state = { complete: false };
    this.submit = this.submit.bind(this);
  }

  async submit(ev) {
    // User clicked submit
    let { token } = await this.props.stripe.createToken({ name: 'Name' });
    let response = await fetch('/charge', {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain' },
      body: token.id
    });
    if (response.ok) this.setState({ complete: true });
  }

  render() {
    if (this.state.complete) return <h1>Purchase Complete</h1>;
    return (
      <Paper className="checkoutForm">
        <Typography className="paymentInfo" variant="headline">
          Payment Information
        </Typography>
        <CardElement />
        <Button
          className="buyNowButton"
          onClick={this.submit}
          variant="contained"
          color="primary"
        >
          Complete Purchase
        </Button>
      </Paper>
    );
  }
}

export default injectStripe(CheckoutForm);
