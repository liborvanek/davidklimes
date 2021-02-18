import fs from 'fs';
import postcss from 'postcss';
import { customAlphabet } from 'nanoid';
// eslint-disable-next-line import/extensions
import postcssConfig from './postcss.config.js';

const nanoid = customAlphabet('1234567890abcdefghijklmnopqrstuvwxyz', 10);
const hash = nanoid();

const { readFile, writeFile } = fs.promises;

const main = async () => {
	let isDev = process.argv[process.argv.length - 1];
	if (isDev === 'true') isDev = true;
	else if (isDev === 'false') isDev = false;

	const pcss = await readFile('src/global.pcss');
	const globalCssFilename = isDev ? 'global.css' : `global-${hash}.css`;
	const globalCssPath = `__sapper__/${isDev ? 'dev' : 'build'}/client/${globalCssFilename}`;
	const buildJsonPath = `__sapper__/${isDev ? 'dev' : 'build'}/build.json`;

	const result = await postcss(postcssConfig.plugins).process(pcss, { from: 'src/global.pcss', to: globalCssPath, map: isDev ? { inline: isDev === 'inline' } : false });

	await writeFile(globalCssPath, result.css);

	// Manually add generated CSS to build.json – sapper will take care of injecting
	// This is very dirty and will bite us when migrating to svelte-kit
	const buildJson = JSON.parse(fs.readFileSync(buildJsonPath));
	buildJson.css.main = [globalCssFilename, ...buildJson.css.main];
	fs.writeFileSync(buildJsonPath, JSON.stringify(buildJson));
};

main();
