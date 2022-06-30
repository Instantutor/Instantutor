import React from 'react'

const Dropdown = ({ text, state, setState }) => {
    
  
    return (
      <div className='dashboard-dropdown'>
        <h3
          className='my-2'
          onClick={() => {
            setState(!state)
          }}
        >
          {text}
          <i class={`fas fa-caret-${state ? 'down' : 'left'}`}></i>
        </h3>
      </div>
    )
}

export default Dropdown