import React from 'react'

const SearchArea = (props) => {
  return (
    <div className="container">
      <div className="row" >
        <section className="col s4 offset-s4">
          <form action="" onSubmit={props.handleSubmit}>
            <div className="inputField">
              <input onChange={props.handleChange} placeholder="Search movie" type="text" />
            </div>
          </form>
        </section>
      </div>
    </div>
  )
}

export default SearchArea
