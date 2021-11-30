const { validateBodyReq } = require("./validator");

function validationAndParse(bodyData) {
  if (bodyData.length > 0) {
    let validArray;
    try {
      validArray = JSON.parse(bodyData);
      validateBodyReq(validArray);
    } catch (e) {
      return {
        err: {
          code: 400,
          message: `The Obj of items had not pass the validation\n${e.message}`,
        },
        validArray: null,
      };
    }
    return { err: null, validArray };
  }
  return {
        err: {
          code: 400,
          message: `The Obj of items had not pass the validation\n${e.message}`,
        },
        validArray: null,
      };
}

module.exports = { validationAndParse }
