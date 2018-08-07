import React from 'react';
import CheckoutForm from './CheckoutForm.jsx';
import { Elements } from 'react-stripe-elements';
import './Billing.css';
import Fade from '@material-ui/core/Fade';


const BillingForm = () => {
  return (
  <Fade in={true}>
    <div className="billing">
      <Elements>
        <CheckoutForm />
      </Elements>
    </div>
  </Fade>
  );
};

export default BillingForm;
