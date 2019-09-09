import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min';
import 'jquery/dist/jquery.min';
import 'popper.js/dist/popper.min';
import { userActions, employeeActions } from '../_actions';

class HomePage extends React.Component {
	componentDidMount() {
		this.props.dispatch(userActions.getAll());
		this.props.dispatch(employeeActions.getAll());
	}

	handleDeleteUser(id) {
		this.props.dispatch(userActions.deleteUser(id));
	}

	handleDeleteEmployee(id) {
		this.props.dispatch(employeeActions.deleteEmployee(id));
	}

	render() {
		const { alert, user, users, employees } = this.props;

		return (
			<div>
				<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
					<div className="collapse navbar-collapse" id="navbarSupportedContent">
						<span className="navbar-brand mb-0 h1">User Profile</span>
						<ul className="navbar-nav mr-auto">
							<li className="nav-item active">
								<Link className="nav-link" to="/">Home<span className="sr-only">(current)</span>
								</Link>
							</li>
							<li className="nav-item dropdown">
								<a className="nav-link dropdown-toggle" href="/" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Employee Services</a>
								<div className="dropdown-menu bg-dark">
									<Link className="dropdown-item text-white bg-dark" to="/employee/register">Add Employee</Link>
								</div>
							</li>
							<li className="nav-item">
								<Link className='nav-link' to="/chatbot">Chatbot</Link>
							</li>
							<li className="nav-item">
								<Link className='nav-link' to="/login">Logout</Link>
							</li>
						</ul>
					</div>
				</nav>
				{alert.message &&
					<div className={`alert ${alert.type}`}>
						<strong>{alert.message}</strong>
					</div>
				}
				<div className="container">
					<div className="row align-items-center">
						<div className="col-3">
							<br />
							<div className="card">
								<img alt={user.firstName} className="card-img-top" height="250rem" width="150rem" src={user.userImage} />
								<div className="card-body bg-dark text-white">
									<h5 className="card-title">{user.firstName} {user.lastName}</h5>
								</div>
							</div>
						</div>
						<div className="col">
							<div className="row align-items-start">
								<div className="col">
									<h3>All registered users:</h3>
									{users.loading && <em>Loading users...</em>}
									{users.error && <span className="text-danger">ERROR: {users.error}</span>}
									{users.items &&
										<ul>	{users.items.map((user, index) =>
											<li key={user.id}>{user.username} ({user.firstName + ' ' + user.lastName}) -
								        {/* eslint-disable-next-line */}
												<a className='badge badge-danger' onClick={() => this.handleDeleteUser(user.id)} >Delete</a>
											</li>)}
										</ul>
									}
								</div>
							</div>
							<div className="clearfix" />
							<div className="row" >
								<div className="col">
									{employees.items && employees.items.length > 0 && <h3>Employee Database:</h3>}
									{employees.loading && <em>Loading employees...</em>}
									{employees.error && <span className="text-danger">ERROR: {employees.error}</span>}
									{employees.items && employees.items.length > 0 &&

										<table className="table table-striped">
											<thead>
												<tr>
													<th>#</th>
													<th>First Name</th>
													<th>Last Name</th>
													<th>Gender</th>
													<th>Date Of Birth</th>
													<th>Action</th>
												</tr>
											</thead>
											<tbody>
												{employees.items && employees.items.map((employee, index) =>
													<tr key={employee.id}>
														<td>{employee.id}</td>
														<td>{employee.firstName}</td>
														<td>{employee.lastName}</td>
														<td>{employee.gender}</td>
														<td>{employee.dateOfBirth}</td>
														<td>
															{/* eslint-disable-next-line */}
															<a className='badge badge-danger' onClick={() => this.handleDeleteEmployee(employee.id)}>Delete</a>
														</td>
													</tr>)}
											</tbody>
										</table>
									}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

function mapStateToProps(state) {
	const { alert, users, employees, authentication } = state;
	const { user } = authentication;
	return {
		user,
		users,
		employees,
		alert
	};
}

const connectedHomePage = connect(mapStateToProps)(HomePage);
export { connectedHomePage as HomePage };
