const fs = require('fs-extra');
const path = require('path');

const buildDirectory = path.resolve(__dirname, '../build'); // Adjust as needed
const destinationDirectory = path.resolve(__dirname, '../../server/src/main/resources/static');

// Clear the destination directory before copying
fs.emptyDirSync(destinationDirectory);

// Copy the build files to the destination directory
fs.copySync(buildDirectory, destinationDirectory);

console.log('React build files copied successfully.');
