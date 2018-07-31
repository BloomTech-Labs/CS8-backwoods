import React from 'react';
import Input from '@material-ui/core/Input';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';

const ExpansionPanelForm = () => {
  return (
    <form>
      <TextField
        id="date"
        label="ETA"
        type="date"
        defaultValue="2017-05-24"
        InputLabelProps={{
          shrink: true
        }}
      />
      {/* <Input
        placeholder="Waypoint Name"
        inputProps={{
          'aria-label': 'Description'
        }}
      /> */}
      <Button className="saveTripButton" variant="contained" type="submit">
        Select Location
        <Icon>send</Icon>
      </Button>
    </form>
  );
};

export default ExpansionPanelForm;
