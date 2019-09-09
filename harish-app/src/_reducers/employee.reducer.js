import { employeeConstants } from '../_constants';

export function employees(state = {}, action) {
  switch (action.type) {
    case employeeConstants.EMP_GETALL_REQUEST:
      return {
        loading: true
      };
    case employeeConstants.EMP_GETALL_SUCCESS:
      return {
        items: action.employees
      };
    case employeeConstants.EMP_GETALL_FAILURE:
      return {
        error: action.error
      };
    case employeeConstants.EMP_REGISTER_REQUEST:
      return {
        registering: true
      };
    case employeeConstants.EMP_REGISTER_SUCCESS:
    return {
      items: action.employees,
      registering: false
    };
    case employeeConstants.EMP_REGISTER_FAILURE:
    return {
      error: action.error,
      registering: false
    };
    case employeeConstants.EMP_DELETE_REQUEST:
      return {
        registering: false
      };
    case employeeConstants.EMP_DELETE_SUCCESS:
    return {
      registering: false
    };
    case employeeConstants.EMP_DELETE_FAILURE:
    return {
      registering: false
    };
    default:
      return state
  }
}
