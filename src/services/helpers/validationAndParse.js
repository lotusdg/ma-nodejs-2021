const { validateBodyReq } = require('./validator');

// eslint-disable-next-line arrow-body-style
const validationResult = (error, validArray) => {
  return {
    err: error ? { error } : null,
    validArray,
  };
};

const validationAndParse = (bodyData) => {
  if (!bodyData || bodyData.length <= 0) {
    return validationResult('Data is missing', null);
  }
  let validArray;
  try {
    validArray = bodyData;
    validateBodyReq(validArray);
  } catch (e) {
    return validationResult(
      `The Obj of items had not pass the validation\n${e.message}`,
      null,
    );
  }
  return validationResult(null, validArray);
};

module.exports = { validationAndParse };
