import React from 'react';
import moment from 'moment';

const Card = ({data}) => {
  return (
    <div className="col s12 m6 yellow-text">
      <div className="card large card-panel teal darken-2">
        <h5 style={{textTransform: 'uppercase'}}>{data.title}</h5>
        <div className="divider"></div>
        <div className="white-text">
          <p className="flow-text">{data.blurb}</p>
          <div style={{color: '#FFDEAD'}} className="card-action">
            <p>By: {data.by}</p>
            <div style={{textTransform: 'uppercase'}}>
              Amount: {data.currency} {data["amt.pledged"]}
            </div>
            <div>
              End Time: { moment(data["end.time"]).format('DD/MM/YYYY') }
            </div>
            <div>Location: {data.location}, {data.state}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Card;