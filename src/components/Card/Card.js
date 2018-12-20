import React from 'react'

export const Card = ({ title, releaseDate, overview, id, poster, isFavorite }) => {
  return(
    <div className="card" key={id} style={{backgroundImage:`URL(${poster})`}}>
    <button><i className="fas fa-tint"></i></button>
      <div>
        <h1>{title}</h1>
        <p>{releaseDate}</p>
        <p>{overview}</p>
      </div>
    </div>
  )
}

