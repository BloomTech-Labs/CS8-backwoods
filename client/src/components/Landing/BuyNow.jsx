import React from 'react';
import Button from '@material-ui/core/Button';
import green from '@material-ui/core/colors/green';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: green
  }
});

const BuyNow = () => {
  return (
    <MuiThemeProvider theme={theme}>
      <Button variant="contained" color="primary">
        Buy Now
      </Button>
    </MuiThemeProvider>
  );
};

export default BuyNow;
