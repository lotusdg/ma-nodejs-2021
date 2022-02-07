function validateBodyReq(array) {
  array.forEach((obj) => {
    const {
      UUID,
      measure,
      measureValue,
      priceValue,
      deletedAt,
      createdAt,
      updatedAt,
      itemID,
      typeID,
      type,
      item,
    } = obj;

    if (UUID !== undefined && typeof UUID !== 'string' && UUID.length !== 36) {
      throw new Error('"UUID" invalid format');
    }
    if (type.name !== undefined && typeof type.name !== 'string') {
      throw new Error('"UUID" invalid format');
    }
    if (item.name !== undefined && typeof item.name !== 'string') {
      throw new Error('"UUID" invalid format');
    }
    if (
      measure !== undefined &&
      !(measure === 'quantity' || measure === 'weight' || measure === null)
    ) {
      throw new Error('"measure" invalid format');
    }
    if (
      measureValue !== undefined &&
      !(typeof measureValue === 'number' || measureValue === null)
    ) {
      throw new Error('"measureValue" invalid format');
    }
    if (
      priceValue !== undefined &&
      !(
        (typeof priceValue === 'string' &&
          priceValue.charAt(0) === '$' &&
          !Number.isNaN(parseFloat(priceValue.slice(1)))) ||
        priceValue === null
      )
    ) {
      throw new Error('"priceValue" invalid format');
    }
    if (
      deletedAt !== undefined &&
      !(typeof deletedAt === 'string' || deletedAt === null)
    ) {
      throw new Error('"deletedAt" invalid format');
    }
    if (
      createdAt !== undefined &&
      !(typeof createdAt === 'string' || createdAt === null)
    ) {
      throw new Error('"createdAt" invalid format');
    }
    if (
      updatedAt !== undefined &&
      !(typeof updatedAt === 'string' || updatedAt === null)
    ) {
      throw new Error('"updatedAt" invalid format');
    }
    if (
      itemID !== undefined &&
      !(typeof itemID === 'number' || itemID === null)
    ) {
      throw new Error('"itemID" invalid format');
    }
    if (
      typeID !== undefined &&
      !(typeof typeID === 'number' || typeID === null)
    ) {
      throw new Error('"typeID" invalid format');
    }
  });
}

module.exports = { validateBodyReq };
