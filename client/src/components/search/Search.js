import React, { useState, Fragment } from 'react';
import { Link } from 'react-router-dom';

const Search = () => {
    const [searchData, setSearchData] = useState({
        name: ''
    });

    const onChange = e => setSearchData({ ...searchData, [e.target.name]: e.target.value });

    return (
        <div>
            <div className="searchbar">
                <input
                    type="text"
                    placeholder="Who do you want to search"
                    name="search"
                    onChange={onChange} />
            </div>
            <Link className="btn btn-light my-1" to="/dashboard">
                Go Back
            </Link>
        </div>
    )
}

export default Search
