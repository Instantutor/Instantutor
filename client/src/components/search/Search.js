import React, { useState, useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { obtainResults, getNames } from '../../actions/search'
import { getCurrentProfile } from '../../actions/profile';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import SearchResultItem from './SearchResultItem';
//import store from '../../store';

const Search = ({obtainResults, result_profiles = []}) => {
    const [searchData, setSearchData] = useState({
        name: '',
        role: 'Both'
    });

    const names = getCurrentProfile();
   
    const onChange = e => setSearchData({ ...searchData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        console.log(names)
        e.preventDefault();
        console.log("on submit...'")
        await obtainResults(searchData);
        // console.log(result_profiles);
    };
    
    const { name, role } = searchData;

    return (
        <Fragment>
             <h1 className='large text-primary'> 
                <i class="fas fa-search"></i>   Search a user
            </h1>

            <form className="form" onSubmit={onSubmit}>
                <div className="searchbar">
                    <input
                        type="text"
                        placeholder="Who do you want to search"
                        name="name"
                        value={name}
                        onChange={onChange} 
                    />
                    <div>
                        <select name="role" value={role} onChange={onChange}>
                            <option value="Student">Student</option>
                            <option value="Tutor">Tutor</option>
                            <option value="">Either</option>
                        </select>

                        <small className="form-text">
                            You want to search a Tutor or a Student?
                        </small>
                    </div>
                </div>
                    
                <input type="submit" className="btn btn-primary my-1" />

                <Link className="btn btn-light my-1" to="/dashboard">
                Go Back
                </Link>
            </form>
            <div className='profiles'>
                {result_profiles && result_profiles.length > 0 ? (
                    
                    result_profiles.map(profile => (
                        <SearchResultItem key={profile._id} profile={profile} />
                    ))
                ) : (
                    <h4>No profiles found...</h4>
                )}
                
            </div>
            
        </Fragment>
    )
}
/*

 */
Search.propTypes = {
    obtainResults: PropTypes.func.isRequired,
    result_profiles: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
    result_profiles: state.search.result
});

export default connect(mapStateToProps, {obtainResults})(Search);

//export default Search