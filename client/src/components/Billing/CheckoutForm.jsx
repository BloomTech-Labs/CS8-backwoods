import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { CardElement, injectStripe } from 'react-stripe-elements';

class CheckoutForm extends Component {
  constructor(props) {
    super(props);
    this.state = { complete: false };
    this.submit = this.submit.bind(this);
  }

  async submit(ev) {
    // User clicked submit
    let { token } = await this.props.stripe.createToken({ name: "Name" });
    let response = await fetch("/charge", {
      method: "POST",
      headers: { "Content-Type": "text/plain" },
      body: token.id
    })
    if (response.ok) this.setState({ complete: true });
  }

  render() {
    if (this.state.complete) return <h1>Purchase Complete</h1>;
    return (
      <Paper className="checkoutForm">
        <p>Payment Info</p>
        <CardElement />
        <Button
          className="buyNowButton"
          onClick={this.submit}
          variant="contained"
          color="primary"
        >
          Buy Now
        </Button>
      </Paper>
    );
  }
}

export default injectStripe(CheckoutForm);
