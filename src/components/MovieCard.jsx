import React from 'react'

const MovieCard = ({item}) => {
  return (
    <div className='movie-card'>
            <div key={item.id}>
                <div>
                  {item.poster_path 
                    ? <img src={`https://image.tmdb.org/t/p/w500${item.poster_path}`} alt={item.title} />
                    : <img src={`no-movie.png`} alt={item.title} />
                  }
                </div>
                <div className='mt-4'>
                    <h3>{item.title}</h3>
                </div>

                <div className='content'>
                    <div className='rating'>
                        <img src='star.svg' alt='Star Icon'/>
                        <p>{item.vote_average ? item.vote_average.toFixed(1) : 'NA'}</p>
                    </div>

                <span>•</span>
                <p className='lang'>{item.original_language}</p>
                <span>•</span>
                <p className='year'>{item.release_date ? item.release_date.split('-')[0]:'N/A'}</p>
                </div>
            </div>
    </div>
  )
}

export default MovieCard