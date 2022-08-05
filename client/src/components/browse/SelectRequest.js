import { connect } from "react-redux"
import { useEffect } from "react"

import { Fragment } from "react"
import RequestItem from "./RequestItem"
import DashboardMain from "../dashboard/DashboardMain"
import { getRequestHistory } from "../../actions/request"

const SelectRequest = ({
	user,
	tutor,
	req_history = [],
	loading = true,
	match
}) => {

	useEffect(async () => {
		(await user) && getRequestHistory(user._id)
	}, [getRequestHistory, match.params.id, user])

	console.log("user: " + user._id);
	console.log("tutor: " + tutor._id);

	return (
		<Fragment>
			<DashboardMain
				user={user}
				tutor={tutor}
				req_history={req_history}
				loading={loading}
				match={match}
			>
			</DashboardMain>
			<div> Hello ! </div>
		</Fragment>
	)
}

const mapStateToProps = (state) => ({
	user: state.auth.user,
	req_history: state.user_requests.request_history,
	loading: state.user_requests.loading,
	user_requests: state.user_requests,
})

export default connect() (SelectRequest)