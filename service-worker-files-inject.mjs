import fs from 'fs';

const main = async () => {
  const swPath = 'static/service-worker.js';
  const isDev = process.env.NODE_ENV === 'development';

  if (isDev) {
    fs.closeSync(fs.openSync(swPath, 'w'));
    return;
  }

  const buildJsonPath = '__sapper__/build/build.json';
  const buildJson = JSON.parse(fs.readFileSync(buildJsonPath));

  const shellFilesToCache = [...new Set([
    buildJson.assets.main,
    ...buildJson.css.main,
    ...Object.values(buildJson.dependencies).flat()])].map((file) => `/client/${file}`);

  let swContent = fs.readFileSync(swPath, 'utf8');
  swContent = swContent.replace('"--SHELL-FILES--"', JSON.stringify(shellFilesToCache));
  fs.writeFileSync(swPath, swContent, 'utf8');
};

main();
