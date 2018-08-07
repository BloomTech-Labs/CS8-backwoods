import React from 'react';
import './404.css';
import Typography from '@material-ui/core/Typography';

const BadUrl404 = () => {
  return  ( 
    <div className="BadUrl404">
    <div class="hero-image-404-2">
      <div className="hero-text">
        <Typography 
          variant="display4"
          color="inherit">
          Terribly sorry.
        </Typography>
        <Typography 
          variant="display2"
          color="inherit">
          In all our travels we've never seen a page like the one you asked for...
      </Typography>
      </div>
    </div>
  </div>
  )
}

export default BadUrl404;