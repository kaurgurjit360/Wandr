import React from 'react';
import BrooklynActivity from '../components/BrooklynActivity';
import Loading from '../components/Loading';

// When the URL ends in '/brooklyns' all of the activities from the 
// brooklyn table in the database are shown. Show if we have 9 activities
// in the brooklyn table, all 9 will be shown and its due to this file

class BkActivityPage extends React.Component {
  state = {
    activities: [],
    loading: true,
  }

  componentDidMount() {
    fetch("/api/brooklyns")
      .then(res => res.json())
      .then(activities => {
        this.setState({
          loading: false,
          activities: activities.map((p,ii) => <BrooklynActivity {...p} key={ii} />),
        });
      })
      .catch(err => console.log("API ERROR: ", err));
  }

  render() {
    if(this.state.loading) {
      return <Loading />;
    }

    return (
      <div className="container-fluid text-center">
        <div className="row justify-content-center">
          { this.state.activities }
        </div>
      </div>
    );
  }
}

export default BkActivityPage;