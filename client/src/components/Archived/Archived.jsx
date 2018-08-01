import React from 'react';
import axios from 'axios'
class Archived extends React.Component {
  state = {
    trips: []
  }
  componentWillMount() {
    const token = localStorage.getItem('token');
    // console.log('match',this.props.match.params.user)
    // console.log('state from archived',this.state.trips)
    // console.log(token)
    axios.get(`http://localhost:8000/${this.props.match.params.user}/getArchivedTrips`,{email: this.props.match.params.user}, { headers: { authorization: token } })
      .then(res => {
        this.setState({ trips: res.data.trips })
        console.log(res)
    })
    .catch(error => console.log(error))
  }
  render() {
    return (
      <div>
        {/* {console.log(this.props.match.params.user)}
        {console.log('state from archived',this.state.trips)} */}
        hello
      </div>
    )
  }
  
}

export default Archived;