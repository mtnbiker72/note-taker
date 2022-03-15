const fs = require('fs');
const util = require('util');

const readFromFile = util.promisify(fs.readFile);

const writeToFile = (destination, content) =>
  fs.writeFile(destination, JSON.stringify(content, null, 4), (err) =>
    err ? console.error(err) : console.info(`\nData written to ${destination}`)
  );

const readAndAppend = (content, file) => {
  fs.readFile(file, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
    } else {
      const parsedData = JSON.parse(data);
      parsedData.push(content);
      writeToFile(file, parsedData);
    }
  });
};

//  Adding ability to delete specific notes
const deleteFromFile = (file, id) => {
  fs.readFile(file, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
    } else {
      let parsedData = JSON.parse(data);
      parsedData = parsedData.filter(function( obj ) {
        return obj.id !== id;
      });
      writeToFile(file, parsedData);
    }
  });
};

// Adding function to get a random UUID to attach to each unique note
const getUUID = () => {
  return Math.floor((1 + Math.random()) * 0x10000)
  .toString(16)
  .substring(1);
}
module.exports = { readFromFile, writeToFile, readAndAppend, deleteFromFile, getUUID };
