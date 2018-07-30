import React from 'react';
import TripCreateForm from './TripCreateForm.jsx';
import Map from './Map.jsx';
import ExpansionPanels from './ExpansionPanels.jsx';
import slugify from 'slugify';
import axios from 'axios';

class TripCreate extends React.Component {
  constructor(props) {
    super(props); 
    this.state = {
      tripName: '',
      numberOfWaypoints: [],
      startDate: '',
      endDate: '',
      email: '',
      fireRedirect: false,
    }
  }
  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const token = localStorage.getItem('token')
    const { tripName, startDate, endDate } = this.state;
    const { email } = this.props;
    const slug = slugify(tripName)
    // Deploy axios call
    // axios.post(`https://ancient-inlet-94126.herokuapp.com/createTrips`, { tripName, startDate, endDate, email }, { headers: { authorization: token } })
    // Test axios call
    axios.post(`http://localhost:8000/createTrips`, { tripName, startDate, endDate, email, slug: slug }, { headers: { authorization: token } })
      .then(res => {
        this.props.getUsersAgain();
        this.setState({ fireRedirect: true })
        console.log(res);
      }).catch(error => {
        console.log(error);
      })
  }

  render() {
    return (
      <div>
        <TripCreateForm 
          email={this.props.email}
          handleSubmit={this.handleSubmit}
          handleChange={this.handleChange}
          fireRedirect={this.state.fireRedirect}
          />
        <Map />
        <ExpansionPanels />
      </div>
    );
  }
};

export default TripCreate;
