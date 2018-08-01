import React from 'react';
import Carousel from './Carousel.jsx';
import BuyNow from './BuyNow';
import './Landing.css';

const Landing = () => {
  return (
    <div>
      <h1>Back Woods</h1>
      <Carousel />
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam eget
        scelerisque velit, sed condimentum augue. Nunc rutrum venenatis enim, a
        faucibus quam vehicula vitae. Aenean luctus nibh neque, quis tempor
        ligula commodo eu. Ut vel arcu quis ligula sollicitudin interdum non nec
        tellus. Pellentesque fringilla dui nisi, nec efficitur nunc elementum
        in. Phasellus condimentum, nisi in maximus dictum, neque lacus suscipit
        purus, sit amet placerat eros diam nec metus. Please buy our application
        we have families to feed thank you{' '}
      </p>
      <BuyNow />
    </div>
  );
};

export default Landing;
