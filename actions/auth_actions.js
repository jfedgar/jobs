import { AsyncStorage } from 'react-native';
import { Facebook } from 'expo';
import {
  FACEBOOK_LOGIN_SUCCESS,
  FACEBOOK_LOGIN_FAIL
} from './types';

// AsyncStorage.setItem('fb_token', token);
// AsyncStorage.getItem('fb_token');

export const facebookLogin = () => async dispatch => {
  let token = await AsyncStorage.getItem('fb_token');

  if (token) {
    // Dispatch an action saying FB login is done
    dispatch({ type: FACEBOOK_LOGIN_SUCCESS, payload: token });
  } else {
    // Start up FB login process
    doFacebookLogin(dispatch);
  }
};

const doFacebookLogin = async (dispatch) => {
  // the string is the app id from your facebook developer account
  let result = await Facebook.logInWithReadPermissionsAsync('353225951959517', {
    permissions: ['public_profile']
  });
  const { token, type } = result;

  if (type === 'cancel') {
    return dispatch({ type: FACEBOOK_LOGIN_FAIL });
  }

  await AsyncStorage.setItem('fb_token', token);
  dispatch({ type: FACEBOOK_LOGIN_SUCCESS, payload: token });
};
