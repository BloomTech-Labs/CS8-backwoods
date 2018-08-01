import React from 'react';
import CheckoutForm from './CheckoutForm.jsx';
import { Elements } from 'react-stripe-elements';
import './Billing.css';

const BillingForm = () => {
  return (
    <div className="billing">
      <Elements>
        <CheckoutForm />
      </Elements>
    </div>
  );
};

export default BillingForm;
