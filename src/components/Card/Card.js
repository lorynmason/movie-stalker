import React from 'react'

export const Card = ({ title, releaseDate, overview, id, poster, isFavorite }) => {
  return(
    <div style={{backgroundImage:`URL(${poster})`}}>
      <h1>{title}</h1>
    </div>
  )
}

