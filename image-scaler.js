// Documentation of sharp:
// https://sharp.pixelplumbing.com

// Documentation of webp (a modern image format)
// https://developers.google.com/speed/webp

import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

// image formats we can handle (input - we will output to webp)
const okExtensions = ['jpg', 'jpeg', 'gif', 'avif', 'webp', 'png'];

// sizes we will scale to (widths)
const scaleToWidths = [200, 400, 600, 800, 1000, 1500, 2000];

// paths to src and destination folders
const srcFolder = path.join(import.meta.dirname, 'images-src');
const destFolder = path.join(import.meta.dirname, 'public', 'images');

// get all image paths in the images-src folder
// (including those in subfolders)
const srcFilePaths = fs.readdirSync(srcFolder, { recursive: true })
  .filter(x => okExtensions.includes(x.split('.').pop()));

// remove the destination folder and recreate it
fs.existsSync(destFolder) && fs.rmSync(destFolder, { recursive: true, force: true });
fs.mkdirSync(destFolder);


// save to different sizes in the webp format, in our destination folder
// (using default webp quality options,
//  see https://sharp.pixelplumbing.com/api-output#webp)
let startTime = Date.now();
for (let file of srcFilePaths) {
  let subFolderPath = file.split(path.sep).slice(0, -1).join(path.sep);
  fs.mkdirSync(path.join(destFolder, subFolderPath), { recursive: true });
  console.log('Original file: ' + file, 'size: ', getFileSize(path.join(srcFolder, file)));
  let startTimeOne = Date.now();
  for (let width of scaleToWidths) {
    const destPath = file.slice(0, file.lastIndexOf('.')) + '-w' + width + '.webp';
    await sharp(path.join(srcFolder, file)).resize({ width }).webp().toFile(path.join(destFolder, destPath));
    console.log('  ', destPath, getFileSize((path.join(destFolder, destPath))));
  }
  console.log('Conversion time:', ((Date.now() - startTimeOne) / 1000).toFixed(1), 'seconds');
  console.log('');
}
console.log('Total conversion time:', ((Date.now() - startTime) / 1000).toFixed(1), 'seconds\n');

function getFileSize(filePath) {
  return Math.round((fs.statSync(filePath).size / 1024)) + ' kb';
}