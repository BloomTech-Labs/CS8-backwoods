import React from 'react';
import axios from 'axios';
import Archived from './Archived';

class GetArchived extends React.Component {
  constructor(){
    super()
      this.state = {
        trips: []
      }
    this.UnarchiveTrip = this.UnarchiveTrip.bind(this);
  }
  
  componentWillMount() {
    const token = localStorage.getItem('token');
    axios.get(`http://localhost:8000/${this.props.match.params.user}/getArchivedTrips`,{email: this.props.match.params.user}, { headers: { authorization: token } })
      .then(res => {
        this.setState({ trips: res.data.trips })
        console.log(res)
    })
    .catch(error => console.log(error))
  }

  UnarchiveTrip(TripId, index) {
    console.log('from getTrips',this.state.trips);
    const trips = [...this.state.trips]
    const token = localStorage.getItem('token');
    const id = TripId;
    console.log(index);
    axios.put(`http://localhost:8000/${this.props.match.params.user}/archiveTrip`, { id: id, archived: false }, { headers: { authorization: token } })
      .then(res => {
        const newTrips = trips.splice(index, 1)
        this.setState({trips: trips})
        console.log(res)

      }).catch(err => {
        console.log(err)
      })
  }
  render() {
    return (
      <Archived
        trips={this.state.trips}
        UnarchiveTrip={this.UnarchiveTrip}
      />
    )
  }
  
}

export default GetArchived;