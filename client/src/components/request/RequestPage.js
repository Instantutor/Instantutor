import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getRequestHistory } from '../../actions/request';
import RequestItem from './RequestItem';


const RequestPage = ({ getRequestHistory, req_history = [], match }) => {
    useEffect(async () => {
        await getRequestHistory(match.params.id);
    }, 
        [getRequestHistory, match.params.id]
    );
    return (
        <Fragment>

            {req_history === null || req_history.length < 1 ? (
                <Spinner />

                /*
                <div>
                    <h1 className="large text-primary">Oops!</h1>
                    <h1 className="text-primary">Looks like u did not post any requests yet...</h1>
                </div>
                */
                
            ) : (
                <div className='request'>

                    <h1 className="large text-primary">Request History</h1>
                    {req_history[0].requests.map(request => (
                        <RequestItem key={request._id} item={request} />
                    ))}
                    
                </div>

            )}

            <Link to="/request" className="btn btn-light">
                Back To Request
            </Link>
        </Fragment>
    )
}


RequestPage.propTypes = {
    getRequestHistory: PropTypes.func.isRequired,
};


const mapStateToProps = (state) => ({
    req_history: state.request.request_history,
});


export default connect(mapStateToProps, {getRequestHistory})(RequestPage);
