export function pull<T>(arr: T[], ...toRemove: T[]) {
  toRemove.forEach(element => {
    let index = -1;
    while ((index = arr.indexOf(element)) > -1) {
      arr.splice(index, 1);
    }
  });

  return arr;
}

export function pullByKey<T>(key: string, arr: T[], ...toRemove: T[]) {
  toRemove.forEach(element => {
    let index = -1;
    while ((index = indexOfByKey(key, arr, element)) > -1) {
      arr.splice(index, 1);
    }
  });

  return arr;
}

export function indexOfByKey(key: string, arr: any[], target: any): number {
  let index = -1;
  for (let i = 0, l = arr.length; i < l; i++) {
    if (arr[i][key] === target[key]) {
      index = i;
      break;
    }
  }
  return index;
}

export function arrayContainsArray(superset, subset: any) {
  if (!Array.isArray(subset)) {
    subset = [subset];
  }
  if (0 === subset.length) {
    return false;
  }
  return subset.some(function(value) {
    return superset.indexOf(value) >= 0;
  });
}
