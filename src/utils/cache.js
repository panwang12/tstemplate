
const formValueObj = value => ({ value });
const getRealVal = obj => obj && obj.value;

export const Cache = {
  sessionGet(key) {
    try {
      return getRealVal(JSON.parse(window.sessionStorage.getItem(key)));
    } catch (error) {
      console.error(error);
    }
  },
  sessionGetOnce(key) {
    const data = getRealVal(JSON.parse(window.sessionStorage.getItem(key)));
    window.sessionStorage.removeItem(key);
    return data;
  },
  // key must be object
  sessionSet(key, value) {
    window.sessionStorage.setItem(key, JSON.stringify(formValueObj(value)));
  },
  sessionRemove(key) {
    // remove single item
    window.sessionStorage.removeItem(key);
  },
  sessionClear() {
    //  remove all item
    window.sessionStorage.clear();
  },
  localGet(key) {
    try {
      return getRealVal(JSON.parse(window.localStorage.getItem(key)));
    } catch (error) {
      console.error(error);
    }
  },
  localSet(key, value) {
    window.localStorage.setItem(key, JSON.stringify(formValueObj(value)));
  },
  localRemove(key) {
    window.localStorage.removeItem(key);
  },
  localClear() {
    window.localStorage.clear();
  }
};

export default Cache;
