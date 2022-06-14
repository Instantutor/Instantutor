import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getRequestHistory } from '../../actions/request';
import RequestItem from './UserRequestItem';


const UserRequestHistory = ({ getRequestHistory,
    user,
    req_history = [],
    loading = true,
    match }) => {

    useEffect(async () => {
        /*await (match.params.id ? 
            getRequestHistory(match.params.id) : 
            (user &&
            getRequestHistory(user._id)));*/
        await user && getRequestHistory(user._id);
    }, 
        [getRequestHistory, match.params.id, user]
    );
    return (
        <Fragment>
            
            {loading ? (
                <Spinner />
            ) : (
                req_history === null || req_history === undefined || req_history.length < 1 ? (    
                    
                    <div>
                        <h1 className="text-primary">Looks like u did not post any requests yet...</h1>
                    </div>
                    
                    
                ) : (
                    <div className='request'>
    
                        {req_history.map(request => (
                            <RequestItem key={request._id} item={request} />
                        ))}
                        
                    </div>
    
                )
            )}

        </Fragment>
    )
}


UserRequestHistory.propTypes = {
    getRequestHistory: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    user: PropTypes.object
};


const mapStateToProps = (state) => ({
    user: state.auth.user,
    req_history: state.user_requests.request_history,
    loading: state.user_requests.loading,
});


export default connect(mapStateToProps, {getRequestHistory})(UserRequestHistory);
