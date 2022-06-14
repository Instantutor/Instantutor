import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'; 

const Alert = ({ alerts }) => 
    alerts !== null && 
    alerts.length > 0 && 
    alerts.map(alert => (
        <div key={alert.id} className={`alert alert-${alert.alertType}`}>
            { alert.msg }
        </div>
    ));

Alert.propTypes = {
    alerts: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
    alerts: state.alert
});

/*
function AlertError() {
    const [show, setShow] = useState(true);
  
    if (show) {
      return (
        <Alert variant="danger" onClose={() => setShow(false)} dismissible>
          <Alert.Heading>Error</Alert.Heading>
          <p>
            Your password is shorter than 6 characters long
          </p>
        </Alert>
      );
    }
    return <Button onClick={() => setShow(true)}>Show Alert</Button>;
}*/
  
//render(<AlertDismissibleExample />);

export default connect(mapStateToProps)(Alert);