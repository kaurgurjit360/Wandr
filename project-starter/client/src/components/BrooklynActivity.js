import React from 'react';
import { Link } from 'react-router-dom';

// This is a new component I added. This is what determines how the activity is 
// Shown on the actual webpage. This component is used in another file that shows
// all the activities

function BrooklynActivity({ activity, price, createdAt, id }) {
  return (
    <div className="col-10 col-md-8 col-lg-7">
      <div className="card mb-4 shadow">
        <div className="card-body card-text">
          <Link to={"/brooklyns/"+id}>{ activity }</Link>
        </div>
        <div className="card-footer small text-muted text-right">
          { createdAt }
        </div>
      </div>
    </div>
  );
}

export default BrooklynActivity;