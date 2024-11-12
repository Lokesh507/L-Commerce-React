import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_DETAILS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_RESET,
  USER_PROFILE_UPDATE_FAIL,
  USER_PROFILE_UPDATE_REQUEST,
  USER_PROFILE_UPDATE_RESET,
  USER_PROFILE_UPDATE_SUCCESS,
  ALL_USERS_LIST_FAIL,
  ALL_USERS_LIST_REQUEST,
  ALL_USERS_LIST_RESET,
  ALL_USERS_LIST_SUCCESS,
  USER_PROFILE_DELETE_FAIL,
  USER_PROFILE_DELETE_REQUEST,
  USER_PROFILE_DELETE_SUCCESS,
  USER_PROFILE_UPDATEBYADMIN_FAIL,
  USER_PROFILE_UPDATEBYADMIN_REQUEST,
  USER_PROFILE_UPDATEBYADMIN_SUCCESS,
  USER_PROFILE_UPDATEBYADMIN_RESET,
} from "../../src/constants/userConstants";

export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { loading: true };
    case USER_LOGIN_SUCCESS:
      return { userInfo: action.payload, loading: false };
    case USER_LOGIN_FAIL:
      return { error: action.payload, loading: false };
    case USER_LOGOUT:
      return {};
    default:
      return state;
  }
};

export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { loading: true };
    case USER_REGISTER_SUCCESS:
      return { userInfo: action.payload, loading: false };
    case USER_REGISTER_FAIL:
      return { error: action.payload, loading: false };
    default:
      return state;
  }
};

export const userDetailsReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case USER_DETAILS_REQUEST:
      return { ...state, loading: true };
    case USER_DETAILS_SUCCESS:
      return { user: action.payload, loading: false };
    case USER_DETAILS_FAIL:
      return { error: action.payload, loading: false };
    case USER_DETAILS_RESET:
      return { user: {} };
    default:
      return state;
  }
};

export const userProfileUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_PROFILE_UPDATE_REQUEST:
      return { loading: true };
    case USER_PROFILE_UPDATE_SUCCESS:
      return { userinfo: action.payload, success: true, loading: false };
    case USER_PROFILE_UPDATE_FAIL:
      return { error: action.payload, success: false, loading: false };
    case USER_PROFILE_UPDATE_RESET:
      return {};
    default:
      return state;
  }
};

export const allUsersListReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case ALL_USERS_LIST_REQUEST:
      return { ...state, loading: true };
    case ALL_USERS_LIST_SUCCESS:
      return { users: action.payload, loading: false };
    case ALL_USERS_LIST_FAIL:
      return { error: action.payload, loading: false };
    case ALL_USERS_LIST_RESET:
      return { users: [] };
    default:
      return state;
  }
};

export const deleteUserReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_PROFILE_DELETE_REQUEST:
      return { ...state, loading: true };
    case USER_PROFILE_DELETE_SUCCESS:
      return { success: true, loading: false };
    case USER_PROFILE_DELETE_FAIL:
      return { error: action.payload, loading: false };
    default:
      return state;
  }
};

export const userProfileUpdateByAdminReducer = (
  state = { user: {} },
  action
) => {
  switch (action.type) {
    case USER_PROFILE_UPDATEBYADMIN_REQUEST:
      return { loading: true };
    case USER_PROFILE_UPDATEBYADMIN_SUCCESS:
      return { success: true, loading: false };
    case USER_PROFILE_UPDATEBYADMIN_FAIL:
      return { error: action.payload, success: false, loading: false };
    case USER_PROFILE_UPDATEBYADMIN_RESET:
      return { user: {} };
    default:
      return state;
  }
};
