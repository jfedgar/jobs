import { Permissions, Notifications } from 'expo';
import axios from 'axios';
import { AsyncStorage } from 'react-native';

const PUSH_ENDPOINT = 'http://rallycoding.herokuapp.com/api/tokens';

export default async () => {
  let previousToken = await AsyncStorage.getItem('pushtoken');
  console.log(previousToken);
  if (previousToken) { return; }

  const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);

  if (status !== 'granted') { return; }

  let token = await Notifications.getExpoPushTokenAsync();
  axios.post(PUSH_ENDPOINT, { token: { token } });
  AsyncStorage.setItem('pushtoken', token);
};
