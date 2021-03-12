import fs from 'fs';

const main = async () => {
  let isDev = process.argv[process.argv.length - 1];
  if (isDev === 'true') isDev = true;
  else if (isDev === 'false') isDev = false;

  const buildJsonPath = `__sapper__/${isDev ? 'dev' : 'build'}/build.json`;
  const swPath = 'static/service-worker.js';

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
