import React from 'react';
import './404.css';
import Typography from '@material-ui/core/Typography';
import {withRouter} from 'react-router-dom';

const UserNotFound404 = (props) => (
  <div className="Wrapper404">
  {console.log(props)}
    <div class="hero-image-404">
      <div className="hero-text">
        <Typography 
          variant="display4"
          color="inherit">
          Sorry
        </Typography>
        <Typography 
          variant="display2"
          color="inherit">
          That user was not found
      </Typography>
      </div>
      
      
    </div>
  </div>
)

export default withRouter(UserNotFound404);