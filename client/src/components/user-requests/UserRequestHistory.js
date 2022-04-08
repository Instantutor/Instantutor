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
                        <h1 className="large text-primary">Oops!</h1>
                        <h1 className="text-primary">Looks like u did not post any requests yet...</h1>
                    </div>
                    
                    
                ) : (
                    <div className='request'>
    
                        <h1 className="large text-primary">Request History</h1>
                        {req_history.map(request => (
                            <RequestItem key={request._id} item={request} />
                        ))}
                        
                    </div>
    
                )
            )}

            <Link to="/dashboard" className="btn btn-light">
                Back to dashboard
            </Link>

            <Link to="/make_request" className="btn btn-light">
                Make a Request
            </Link>
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
