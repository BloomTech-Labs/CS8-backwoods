import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { CardElement, injectStripe } from 'react-stripe-elements';
import { Typography } from '../../../node_modules/@material-ui/core';
import MySnackbarContent from '../Snackbar/MySnackbarContent';
import Snackbar from '@material-ui/core/Snackbar';
import green from '@material-ui/core/colors/green';
import { withStyles } from '@material-ui/core/styles';

const styles1 = theme => ({
  success: {
    backgroundColor: green[600]
  },
  error: {
    backgroundColor: theme.palette.error.dark
  },
  icon: {
    fontSize: 20
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing.unit
  },
  message: {
    display: 'flex',
    alignItems: 'center'
  }
});

const MySnackbarContentWrapper = withStyles(styles1)(MySnackbarContent);

class CheckoutForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      snackbarPurchase: false,
      snackbarError: false,
      snackbarVertical: 'top',
      snackbarHorizontal: 'center',
    };
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
    if (response.ok) {
      this.setState({ snackbarPurchase: true })
    } else {
      this.setState({ snackbarError: true })
    }
  }

  handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    this.setState({ snackbarUnArchive: false });
    this.setState({ snackbarError: false });
  };

  render() {
    return (
      <Paper className="checkoutForm">
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
           <Snackbar
          anchorOrigin={{
            vertical: this.state.snackbarVertical,
            horizontal: this.state.snackbarHorizontal
          }}
          open={this.state.snackbarPurchase}
          onClose={this.handleSnackbarClose}
          autoHideDuration={2000}
        >
          <MySnackbarContentWrapper
            onClose={this.handleSnackbarClose}
            variant="success"
            message="Purchase Completed Successfully!"
          />
        </Snackbar>
        <Snackbar
          anchorOrigin={{
            vertical: this.state.snackbarVertical,
            horizontal: this.state.snackbarHorizontal
          }}
          open={this.state.snackbarError}
          onClose={this.handleSnackbarClose}
          autoHideDuration={2000}
        >
          <MySnackbarContentWrapper
            onClose={this.handleSnackbarClose}
            variant="error"
            message="Cannot Complete Purchase!"
          />
        </Snackbar>
    </Paper>
    );
  }
}

export default injectStripe(CheckoutForm);
