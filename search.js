const path = require("path");
const fs = require("fs");

const cwd = process.cwd();
var ext = process.argv[2];
var word = new RegExp("\\b" + process.argv[3] + "\\b");

if (process.argv.length === 2) {
  console.log("USAGE: node search [EXTENSION] [TEXT]");
}

function findFiles() {
  searchFiles(cwd).forEach(file => {
    const content = fs.readFileSync(file);

    if (word.test(content)) {
      console.log(`${file}`);
    }
  });
}

function searchFiles(dir) {
  let files = [];
  fs.readdirSync(dir).forEach(file => {
    const pathName = path.join(dir, file); 
    const stat = fs.lstatSync(pathName);  
   
    if (stat.isDirectory()) {
      const filesInDir = searchFiles(pathName);
      files = files.concat(filesInDir);
    } else {
      if (path.extname(file) === "." + ext) {
        files.push(pathName);
      }
    }
  });
  return files;
}

findFiles();

