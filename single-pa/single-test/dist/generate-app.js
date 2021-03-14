const path = require('path')
const fs = require('fs');
const root = process.cwd();
console.log("current dir: ", root);

const cb = (resolve, reject) => (err, data) => err ? reject(err) : resolve(data);

const createPromise = (func) => (...args) => {
  return new Promise((resolve, reject) => {
    func(...args, cb(resolve, reject))
  })
}

async function readDir(root) {
  const dirs = [];
  const files = fs.readdirSync(root);
  const statPromise = createPromise(fs.stat);
  for (let file of files) {
    const filePath = path.resolve(root, '.', file);
    const stat = await statPromise(filePath);
    const isDir = stat.isDirectory();
    if (isDir) {
      dirs.push(filePath);
    }
  }
  return dirs;
}

function readManifest(files) {
  const json = {};
  files.forEach(file => {
    const manifest = path.resolve(file, './manifest.json');
    if (fs.existsSync(manifest)) {
      const { publicPath, entrypoints: {
        app: { assets }
      } } = require(manifest);
      const name = publicPath.slice(1, -1);
      json[name] = `${publicPath}${assets}`;
    }
  })
  return json;
}

async function generateFile(json) {
  const { apps } = require('./app.config.json');
  const { imports } = require('./importmap.json');
  const writeFilePromise = createPromise(fs.writeFile);

  Object.keys(json).forEach(key => {
    imports[key] = json[key]
  })

  apps.forEach(app => {
    const { name } = app;
    if (json[name]) {
      app.main = json[name];
    }
  })

  Promise.all([
    writeFilePromise('./importmap.json', JSON.stringify(
      {
        imports
      }
    )),
    writeFilePromise('./app.config.json', JSON.stringify(
      {
        apps
      }
    ))
  ])
}

async function main(root) {
  const dir = await readDir(root);
  const json = readManifest(dir);
  await generateFile(json);
  console.log("generate file success");
}

main(root)