import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { CardElement, injectStripe } from 'react-stripe-elements';

class CheckoutForm extends Component {
  constructor(props) {
    super(props);
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
    if (response.ok) console.log("Purchase Complete!")
  }

  render() {
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
