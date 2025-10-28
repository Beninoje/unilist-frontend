import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveToken = async (token: string, expiresIn: number) => {
  const expiryTime = Date.now() + expiresIn; 
  await AsyncStorage.setItem('jwt', token);
  await AsyncStorage.setItem('jwtExpiry', expiryTime.toString());
};

export const getToken = async () => {
  const token = await AsyncStorage.getItem('jwt');
  const expiry = await AsyncStorage.getItem('jwtExpiry');

  if (!token || !expiry) return null;

  if (Date.now() > parseInt(expiry)) {
      await AsyncStorage.removeItem('jwt');
      await AsyncStorage.removeItem('jwtExpiry');
    return null;
  }

  return token;
};
export const getSession = async () => {
  try {
    
    const token = await AsyncStorage.getItem('jwt');
    const userInfo = await AsyncStorage.getItem('user');
    const expiry = await AsyncStorage.getItem('jwtExpiry');

    if (!token || !expiry || !userInfo) return null;

    const expiryTime = Number(expiry);
    if (Date.now() > expiryTime) {
      await AsyncStorage.multiRemove(['jwt', 'jwtExpiry', 'user']);
      return null;
    }
    const user = JSON.parse(userInfo as string);
    return {
      token,
      user,
    };

  } catch (error) {
    console.error('Error retrieving session:', error);
    return null;
  }
  
}


export const removeToken = async () => {
  await AsyncStorage.removeItem('jwt');
  await AsyncStorage.removeItem('jwtExpiry');
};

export const signOut = async () => {
  await AsyncStorage.multiRemove(['jwt', 'jwtExpiry', 'user']);
};

