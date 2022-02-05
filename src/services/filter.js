// ------------------------ filterPost ------------------------------- //

// function postFilter(body, params) {
//   if (!body.length)
//     return createResponse(httpCodes.badReq, { message: 'data not found' });
//   const { err, validArray } = validationAndParse(body);
//   if (err != null) {
//     return createResponse(httpCodes.badReq, { error: err.error });
//   }
//   let result = validArray;
//   // eslint-disable-next-line no-restricted-syntax
//   for (const key of Object.keys(params)) {
//     const element = params[key];
//     result = filterByItem(result, key, element);
//   }
//   return createResponse(httpCodes.ok, result);
// }
