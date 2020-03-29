import { AsyncStorage } from 'react-native';

class Storage {
    constructor(storage) {
       this.storage = storage;
    }

    getItem(key) {
     const item = this.storage.getItem(key);
     return item;
    }

    setItem(key, value, callback) {
     return this.storage.setItem(key, value, callback);
    }

    removeItem(key) {
        return this.storage.removeItem(key);
    };

}

export default new Storage(AsyncStorage);