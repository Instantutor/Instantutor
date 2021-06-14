import React, { useState, useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { obtainResults } from '../../actions/search'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import store from '../../store';
import SearchResultItem from './SearchResultItem';

const Search = ({obtainResults}) => {
    const [searchData, setSearchData] = useState({
        name: '',
        role: 'Both'
    });

    const onChange = e => setSearchData({ ...searchData, [e.target.name]: e.target.value });

    
    const [resultData, setResultData] = useState({
        profiles: []
    });

    const onSubmit = async e => {
        e.preventDefault();
        await obtainResults(searchData);
        setResultData({profiles: store.getState().search.result});
        console.log(resultData.profiles);
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

        <h1 className="large text-primary">{resultData.profiles.map(profile => (
            <SearchResultItem profile={profile} />
        ))}</h1>

        </Fragment>
    )
}

Search.propTypes = {
    obtainResults: PropTypes.func.isRequired
}
export default connect(null, {obtainResults})(Search);

//export default Search