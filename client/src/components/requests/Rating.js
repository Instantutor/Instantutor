import React, { Fragment } from 'react'

const Rating = ({rating = 0, setRating }) => {
  return (
    <div className='rating'>
        <i onClick={() => setRating({ "rating" : 1 })}
            className={`${ rating >= 1 ? "fas" : "far"} fa-star fa-2x` }/>
        <i onClick={() => setRating({ "rating" : 2 })}
            className={`${ rating >= 2 ? "fas" : "far"} fa-star fa-2x` } />
        <i onClick={() => setRating({ "rating" : 3 })}
            className={`${ rating >= 3 ? "fas" : "far"} fa-star fa-2x` } />
        <i onClick={() => setRating({ "rating" : 4 })}
            className={`${ rating >= 4 ? "fas" : "far"} fa-star fa-2x` } />
        <i onClick={() => setRating({ "rating" : 5 })}
            className={`${ rating >= 5 ? "fas" : "far"} fa-star fa-2x` } />
    </div>

  )
}

export default Rating