/**
 * Generate import line for style.scss
 */

const fs = require('fs')
const path = require('path')

const partials = path.join(__dirname, './partials')

const generateImport = (dirname, filename) => {
  filename = filename.replace('_', '').replace('.scss', '');
  const line = '@import \'partials/' + dirname + filename + '\';';
  console.log(line);
}

const files = fs.readdirSync(partials)

for (let filename of files) {
  const filepath = path.join(partials, filename)
  if (fs.lstatSync(filepath).isDirectory()) {
    const dirpath = filepath
    const files = fs.readdirSync(dirpath);
    for (let filename of files) {
      const filepath = path.join(dirpath, filename);
      generateImport(path.basename(dirpath) + '/', path.basename(filepath));
    }
  } else {
    generateImport('', path.basename(filepath));
  }
}
