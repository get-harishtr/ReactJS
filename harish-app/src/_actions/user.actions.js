import { userConstants } from '../_constants';
import { userService } from '../_services';
import { alertActions } from './';
import { history } from '../_helpers';

export const userActions = {
    login,
    logout,
    registerUser,
    deleteUser,
    getAll
};

function login(username, password) {
    return dispatch => {
        dispatch(request({ username }));

        userService.login(username, password)
            .then(
                user => {
                    dispatch(success(user));
                    history.push('/');
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}

function registerUser(firstName, lastName, username, password, userImage){
  return dispatch => {
    dispatch(request({ username }));

    userService.registerUser(firstName, lastName, username, password, userImage)
        .then(
            user => {
                dispatch(success(user));
                history.push('/login');
                dispatch(alertActions.success('User registered successfully !!!'));
            },
            error => {
                dispatch(failure(error));
                dispatch(alertActions.error(error));
            }
        );
  };
  function request(user) { return { type: userConstants.USER_REGISTER_REQUEST, user } }
  function success(user) { return { type: userConstants.USER_REGISTER_SUCCESS, user } }
  function failure(error) { return { type: userConstants.USER_REGISTER_FAILURE, error } }
}

function logout() {
    userService.logout();
    return { type: userConstants.LOGOUT };
}


function deleteUser(userID){
  return dispatch => {
    dispatch(request());
    userService.deleteUser(userID)
    .then(
      user => {
        dispatch(success(user));
        history.push('/login');
        dispatch(alertActions.success("User deleted !!!"));
      },
      error => {
        dispatch(failure(error));
        dispatch(alertActions.error(error));
      }
    );
  }
  function request(user) { return { type: userConstants.USER_DELETE_REQUEST, user } }
  function success(user) { return { type: userConstants.USER_DELETE_SUCCESS, user } }
  function failure(error) { return { type: userConstants.USER_DELETE_FAILURE, error } }
}

function getAll() {
    return dispatch => {
        dispatch(request());

        userService.getAll()
            .then(
                users => dispatch(success(users)),
                error => dispatch(failure(error))
            );
    };

    function request() { return { type: userConstants.GETALL_REQUEST } }
    function success(users) { return { type: userConstants.GETALL_SUCCESS, users } }
    function failure(error) { return { type: userConstants.GETALL_FAILURE, error } }
}
