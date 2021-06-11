import React, { useState, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { obtainResults } from '../../actions/search'

const Search = () => {
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
        <div>
            <div className="searchbar">
                <input
                    type="text"
                    placeholder="Who do you want to search"
                    name="name"
                    value={name}
                    onChange={e => onChange(e)} />
                <button onClick={onSubmit}>Submit query</button>
            </div>
            <Link className="btn btn-light my-1" to="/dashboard">
                Go Back
            </Link>
        </div>
    )
}

export default Search
