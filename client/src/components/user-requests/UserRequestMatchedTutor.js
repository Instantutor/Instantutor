import React, {Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Spinner from '../layout/Spinner';
import { connect } from 'react-redux';
import { getRequestHistory } from '../../actions/request';
import MatchedTutorItem from './MatchedTutorItem';

const UserRequestMatchedTutor =({
    user, 
    match, 
    requests: {request_history, loading}, 
    getRequestHistory}) => 
{

    let request_id = match.params.id
    const [tutors, setTutorsData] = useState(null);

    useEffect(async () => {
        await user && getRequestHistory(user._id);
    }, 
        [getRequestHistory, user]
    );

    useEffect(() => {

        if (request_id){
            if (request_history && !loading){
                const request_index = request_history
                    .map((item) => item._id)
                    .indexOf(request_id);
                setTutorsData(request_history[request_index].potential_tutors)
            }
        }
        
    }, [loading, request_history]);


    return (
        <Fragment>
            { tutors === null ? (
                <Spinner />
            ) : (
                tutors.length < 1 ? (
                    <div>
                        <h1 className="large text-primary">Oops!</h1>
                        <h1 className="text-primary">No matched tutor...</h1>
                    </div>
                ) : (
                    <div className='profiles'>
                        <h1 className="large text-primary">Check your tutors!</h1>
                        {tutors.map(tutor => (
                            <MatchedTutorItem key={tutor._id} item={tutor} />
                        ))}
                    </div>
                )
            )}
        </Fragment>

    )
}

UserRequestMatchedTutor.propTypes = {
    getRequestHistory: PropTypes.func.isRequired,
    user: PropTypes.object
};


const mapStateToProps = (state) => ({
    user: state.auth.user,
    requests: state.user_requests,
});


export default connect(mapStateToProps, {getRequestHistory})(UserRequestMatchedTutor);
