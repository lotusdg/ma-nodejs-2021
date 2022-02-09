function validateBodyReq(array) {
  array.forEach((obj) => {
    const {
      uuid,
      measure,
      measureValue,
      priceValue,
      deletedAt,
      createdAt,
      updatedAt,
      itemId,
      typeId,
      type,
      item,
    } = obj;

    if (uuid !== undefined && typeof uuid !== 'string' && uuid.length !== 36) {
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
      itemId !== undefined &&
      !(typeof itemID === 'number' || itemId === null)
    ) {
      throw new Error('"itemID" invalid format');
    }
    if (
      typeId !== undefined &&
      !(typeof typeID === 'number' || typeId === null)
    ) {
      throw new Error('"typeID" invalid format');
    }
  });
}

module.exports = { validateBodyReq };
