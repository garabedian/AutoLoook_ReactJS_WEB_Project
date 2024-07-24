import Backendless from '../backendless';

export const checkUserToken = async () => {
  try {
    const currentUser = await Backendless.UserService.getCurrentUser();
    if (!currentUser || currentUser['user-token'] === '2947F9EE-5CA3-410C-8C43-0D45F7F299F6') {
      throw new Error('Invalid user token');
    }
    return currentUser;
  } catch (error) {
    throw error;
  }
};

export const updateUserToken = async (email, password) => {
  try {
    await Backendless.UserService.logout();
    const user = await Backendless.UserService.login(email, password, true);
    return user;
  } catch (error) {
    throw error;
  }
};