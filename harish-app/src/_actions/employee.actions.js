import { employeeConstants } from '../_constants';
import { employeeService } from '../_services';
import { alertActions } from './';
import { history } from '../_helpers';

export const employeeActions = {
    registerEmployee,
    deleteEmployee,
    getAll
};

function registerEmployee(firstName, lastName, gender, dateOfBirth){
  return dispatch => {
    dispatch(request({ firstName, lastName, gender, dateOfBirth }));

    employeeService.registerEmployee(firstName, lastName, gender, dateOfBirth)
        .then(
            employees => {
                dispatch(success(employees));
                history.push('/');
                dispatch(alertActions.success('Employee registered successfully !!!'));
            },
            error => {
                dispatch(failure(error));
                dispatch(alertActions.error(error));
            }
        );
  };
  function request(employee) { return { type: employeeConstants.EMP_REGISTER_REQUEST, employee } }
  function success(employees) { return { type: employeeConstants.EMP_REGISTER_SUCCESS, employees } }
  function failure(error) { return { type: employeeConstants.EMP_REGISTER_FAILURE, error } }
}


function deleteEmployee(empID){
  return dispatch => {
    dispatch(request());
    employeeService.deleteEmployee(empID)
    .then(
      employees => {
        dispatch(success(employees));
        history.push('/');
        dispatch(alertActions.success("Employee deleted !!!"));
      },
      error => {
        dispatch(failure(error));
        dispatch(alertActions.error(error));
      }
    );
  }
  function request() { return { type: employeeConstants.EMP_DELETE_REQUEST } }
  function success(employees) { return { type: employeeConstants.EMP_DELETE_SUCCESS, employees } }
  function failure(error) { return { type: employeeConstants.EMP_DELETE_FAILURE, error } }
}

function getAll() {
    return dispatch => {
        dispatch(request());

        employeeService.getAll()
            .then(
                employees => dispatch(success(employees)),
                error => dispatch(failure(error))
            );
    };

    function request() { return { type: employeeConstants.EMP_GETALL_REQUEST } }
    function success(employees) { return { type: employeeConstants.EMP_GETALL_SUCCESS, employees } }
    function failure(error) { return { type: employeeConstants.EMP_GETALL_FAILURE, error } }
}
