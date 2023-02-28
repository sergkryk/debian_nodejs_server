function processResponse(response) {
  if (response && response.length > 0) {
    const responseData = response[0];
    if (responseData.length === 0) {
      throw new Error("Не удалось найти запрашиваемые данные")
    }
    if(responseData.length === 1) {
      return responseData[0];
    }
    return responseData;
  }
  throw new Error("Не удалось получить ответ от базы данных");
}

module.exports = { processResponse };
