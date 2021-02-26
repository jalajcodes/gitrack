import localforage from '../node_modules/localforage/dist/localforage';

const Storage = (action: string, name: string, data?: unknown) => {
  let result;
  if (action === 'get') {
    try {
      result = localforage.getItem(name);
    } catch (error) {
      console.log('Error getting data from storage', error);
    }
  } else if (action === 'set') {
    try {
      result = localforage.setItem(name, data);
    } catch (error) {
      console.log('Error setting data to storage', error);
    }
  } else if (action === 'remove') {
    try {
      result = localforage.removeItem(name);
    } catch (error) {
      console.log('Error removing data from storage', error);
    }
  }

  return result;
};

export default Storage;
