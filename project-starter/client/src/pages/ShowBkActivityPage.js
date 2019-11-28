import React from 'react';
import BrooklynActivity from '../components/BrooklynActivity';
//import BkActivityPage from '../components/BkActivityPage';
import Loading from '../components/Loading';
import { Redirect } from 'react-router-dom';

// This page just shows an independant activity based on the ID
// If the user types in the URL something like '/brooklyns/#'
// The webpage will load the activity from the database with an 
// ID of #

class ShowBkActivityPage extends React.Component {
  state = {
    loading: true,
    activity: null,
    notFound: false,
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    fetch("/api/brooklyns/"+id)
      .then(res => res.json())
      .then(bkActivity => {
        this.setState({
          activity: <BrooklynActivity {...bkActivity} />,
          loading: false,
        });
      })
      .catch(err => {
        this.setState({
          notFound: true,
        });
      });
  }


  render() {
    if(this.state.notFound) return <Redirect to="/" />;
    if(this.state.loading) return <Loading />;
    return this.state.activity;
  }
}

export default ShowBkActivityPage;