import { userConstants } from '../_constants';

export function users(state = {}, action) {
  switch (action.type) {
    case userConstants.GETALL_REQUEST:
      return {
        loading: true
      };
    case userConstants.GETALL_SUCCESS:
      return {
        items: action.users
      };
    case userConstants.GETALL_FAILURE:
      return {
        error: action.error
      };
    case userConstants.USER_REGISTER_REQUEST:
      return {
        registering: true
      };
    case userConstants.USER_REGISTER_SUCCESS:
    return {
      items: action.user,
      registering: false
    };
    case userConstants.USER_REGISTER_FAILURE:
    return {
      error: action.error,
      registering: false
    };
    case userConstants.USER_DELETE_REQUEST:
      return {
        registering: false
      };
    case userConstants.USER_DELETE_SUCCESS:
    return {
      registering: false
    };
    case userConstants.USER_DELETE_FAILURE:
    return {
      registering: false
    };
    default:
      return state
  }
}
