var fs = require("fs");

function logToFile(filename, string) {
  const writeStream = fs.createWriteStream(filename, { flags: "a" });
  writeStream.write(`Дата: ${new Date().toLocaleString("ru")}, ${string}`);
  writeStream.end();
}

module.exports = logToFile;
