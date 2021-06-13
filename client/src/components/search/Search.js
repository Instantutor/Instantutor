import React, { useState, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { obtainResults } from '../../actions/search'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Search = ({obtainResults}) => {
    const [searchData, setSearchData] = useState({
        name: '',
        role: 'Both'
    });

    const onChange = e => setSearchData({ ...searchData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        obtainResults(searchData);
    };

    const { name, role } = searchData;

    return (
        <Fragment>
        <form className="form" onSubmit={onSubmit}>
            <div className="searchbar">
                <input
                    type="text"
                    placeholder="Who do you want to search"
                    name="name"
                    value={name}
                    onChange={onChange} />
            </div>
                
            <input type="submit" className="btn btn-primary my-1" />

            <Link className="btn btn-light my-1" to="/dashboard">
            Go Back
            </Link>
        </form>
        </Fragment>
    )
}

Search.propTypes = {
    obtainResults: PropTypes.func.isRequired
}
export default connect(null, {obtainResults})(Search);

//export default Search


