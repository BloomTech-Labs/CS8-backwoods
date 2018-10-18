import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import { CardElement, injectStripe } from "react-stripe-elements";
import Typography from "@material-ui/core/Typography";
import BillingSnackbar from "../Snackbar/BillingSnackbar";

class CheckoutForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      snackbarPurchase: false,
      snackbarError: false,
      snackbarVertical: "top",
      snackbarHorizontal: "center"
    };
    this.submit = this.submit.bind(this);
  }

  handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    this.setState({ snackbarUnArchive: false });
    this.setState({ snackbarError: false });
  };

  async submit() {
    // User clicked submit
    const { stripe } = this.props;
    const { token } = await stripe.createToken({ name: "Name" });
    const response = await fetch("/charge", {
      method: "POST",
      headers: { "Content-Type": "text/plain" },
      body: token.id
    });
    if (response.ok) {
      this.setState({ snackbarPurchase: true });
    } else {
      this.setState({ snackbarError: true });
    }
  }

  render() {
    const { ...snackbarState } = this.state;
    return (
      <Paper className="checkoutForm">
        <BillingSnackbar
          {...snackbarState}
          handleSnackbarClose={this.handleSnackbarClose}
        />
        <div className="checkoutName">
          <Typography className="paymentInfo" variant="headline">
            Payment Information
          </Typography>
        </div>
        <div>
          <CardElement />
        </div>
        <div>
          <Button
            id="buyNowButton"
            onClick={this.submit}
            variant="contained"
            color="primary"
          >
            Complete Purchase
          </Button>
        </div>
      </Paper>
    );
  }
}

export default injectStripe(CheckoutForm);
