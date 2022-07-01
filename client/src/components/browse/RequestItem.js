import React from 'react'

const RequestItem = ({ peer_request }) => {
    const { course, request, user, subject, grade, topic, help_time } = peer_request

    return (
        <div className="profile bg-white p-2" style={{marginBottom: "10px"}}>
            <div>
                <h3 className="text-dark request-header">Request: {request}</h3>

                <p>
                    <strong>Subject: </strong> {subject ? subject : "N/A"}
                </p>

                <p>
                    <strong>Course: </strong> {course ? course : "N/A"}
                </p>

                <p>
                    <strong>Grade Level: </strong> {grade ? grade : "N/A"}
                </p>

                <p>
                    <strong>Topic: </strong> {topic ? topic : "N/A"}
                </p>

                <p>
                    <strong>Time Frame: </strong> {help_time ? help_time : "N/A"}
                </p>
            </div>
        </div>
    )
}

export default RequestItem