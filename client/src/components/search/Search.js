import React, { useState, useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { obtainResults,autoSuggestion} from '../../actions/search'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import SearchResultItem from './SearchResultItem';
import AutoCompleteInput from './AutoCompleteInput';
// import Dropdown from 'react-bootstrap/Dropdown';
//import store from '../../store';

const Search = ({obtainResults,autoSuggestion, suggested_list = [],result_profiles = []}) => {
    const [searchData, setSearchData] = useState({
        name: '',
        role: 'Both'
    });

    const onChange = async e => {
        setSearchData({ ...searchData, [e.target.name]: e.target.value });
        console.log(searchData.name);
        await autoSuggestion(searchData);
        console.log(suggested_list);
    }

    const onSubmit = async e => {
        e.preventDefault();
        //console.log("on submit...'")
        await obtainResults(searchData);
    };
    
    const { name, role } = searchData;

    return (
        <Fragment>
             <h1 className='large text-primary'> 
                <i className="fas fa-search"></i>   Search a user
            </h1>

            <form className="form" onSubmit={onSubmit}>
                <div className="searchbar">
                    <AutoCompleteInput
                        fieldName="name"
                        fieldData={searchData.name}
                        options={suggested_list}
                        placeholder="Who do you want to search?"
                        searchData={searchData}
                        setSearchData={setSearchData}
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

Search.propTypes = {
    obtainResults: PropTypes.func.isRequired,
    autoSuggestion: PropTypes.func.isRequired,
    result_profiles: PropTypes.array.isRequired,
    suggested_list: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
    result_profiles: state.search.result,
    suggested_list: state.search.second_result
});

export default connect(mapStateToProps, {autoSuggestion,obtainResults})(Search)


//export default Search