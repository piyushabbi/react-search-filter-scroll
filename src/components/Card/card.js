import React from 'react'

const Card = ({data}) => {
  return (
    <div className="col s12 m6 yellow-text">
      <div className="card medium card-panel teal">
        <h5 style={{textTransform: 'uppercase'}}>{data.title}</h5>
        <div className="divider"></div>
        <div className="white-text">
          <p className="flow-text">{data.blurb}</p>
          <div className="card-action">
            <p>By: {data.by}</p>
            <div style={{textTransform: 'uppercase'}}>
              Amount: {data.currency} {data["amt.pledged"]}
            </div>
            <div>Location: {data.location}, {data.state}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Card;