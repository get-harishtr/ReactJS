import React from 'react';
import { Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min';
import 'jquery/dist/jquery.min';
import 'popper.js/dist/popper.min';
import { history } from '../_helpers';
import { alertActions } from '../_actions';
import { PrivateRoute } from '../_components';
import { HomePage } from '../HomePage';
import { LoginPage } from '../LoginPage';
import { UserRegister } from '../UserRegister';
import { EmployeeRegister } from '../EmployeeManagement';
import { ChatbotLauncher } from '../chatbot';
class App extends React.Component {
    constructor(props) {
        super(props);

        const { dispatch } = this.props;
        history.listen((location, action) => {
            // clear alert on location change
            dispatch(alertActions.clear());
        });
    }

    render() {
        const { alert, authentication } = this.props;
        return false ? (<ChatbotLauncher />) : (
            <div>
                <div className="jumbotron text-center text-white bg-dark">
                    <h1>HTR Enterprise Management</h1>
                </div>
                {alert.message && !authentication.loggedIn && <div className={`alert ${alert.type}`}><strong>{alert.message}</strong></div>}
                <Router history={history}>
                    <div>
                        <PrivateRoute exact path="/" component={HomePage} />
                        <Route path="/login" component={LoginPage} />
                        <Route path="/register" component={UserRegister} />
                        <Route path="/chatbot" component={ChatbotLauncher} />
                        <PrivateRoute exact path="/employee/register" component={EmployeeRegister} />
                    </div>
                </Router>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { alert, authentication } = state;
    return {
        alert,
        authentication
    };
}

const connectedApp = connect(mapStateToProps)(App);
export { connectedApp as App };
