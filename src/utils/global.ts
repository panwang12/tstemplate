


export const EMPTYOBJECT = {};
export const EMPTYARRAY = [];
export const NOOP = () => {};

Object.freeze(EMPTYARRAY);
Object.freeze(EMPTYOBJECT);

export const join = (path, action) => `${path}/${action}`;