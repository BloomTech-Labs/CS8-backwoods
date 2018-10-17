import React from "react";
import { Elements } from "react-stripe-elements";
import "./Billing.css";
import Fade from "@material-ui/core/Fade";
import CheckoutForm from "./CheckoutForm";

const BillingForm = () => (
  <Fade in>
    <div className="billing">
      <Elements>
        <CheckoutForm />
      </Elements>
    </div>
  </Fade>
);

export default BillingForm;
