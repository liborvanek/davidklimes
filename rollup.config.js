import { spawn } from 'child_process';
import { performance } from 'perf_hooks';
import resolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import commonjs from '@rollup/plugin-commonjs';
import svelte from 'rollup-plugin-svelte';
import babel from '@rollup/plugin-babel';
import colors from 'kleur';
import { terser } from 'rollup-plugin-terser';
import typescript from '@rollup/plugin-typescript';
import config from 'sapper/config/rollup';
import pkg from './package.json';

const { createPreprocessors } = require('./svelte.config.js');

const mode = process.env.NODE_ENV;
const dev = mode === 'development';
const sourcemap = dev ? 'inline' : false;
const legacy = !!process.env.SAPPER_LEGACY_BUILD;

const preprocess = createPreprocessors({ sourceMap: !!sourcemap });

// Workaround for https://github.com/sveltejs/sapper/issues/1266
const onwarn = (warning, _onwarn) => (warning.code === 'CIRCULAR_DEPENDENCY' && /[/\\]@sapper[/\\]/.test(warning.message)) || console.warn(warning.toString());

export default {
  client: {
    input: config.client.input().replace(/\.js$/, '.ts'),
    output: { ...config.client.output(), sourcemap },
    plugins: [
      replace({
        'process.browser': true,
        'process.env.NODE_ENV': JSON.stringify(mode),
      }),
      svelte({
        compilerOptions: {
          dev,
          hydratable: true,
        },
        emitCss: true,
        preprocess,
      }),
      resolve({
        browser: true,
        dedupe: ['svelte'],
        preferBuiltins: false,
      }),
      commonjs({
        sourceMap: !!sourcemap,
      }),
      typescript({
        noEmitOnError: !dev,
        sourceMap: !!sourcemap,
      }),

      legacy && babel({
        extensions: ['.js', '.mjs', '.html', '.svelte'],
        babelHelpers: 'runtime',
        exclude: ['node_modules/@babel/**'],
        presets: [
          ['@babel/preset-env', {
            targets: '> 0.25%, not dead',
          }],
        ],
        plugins: [
          '@babel/plugin-syntax-dynamic-import',
          ['@babel/plugin-transform-runtime', {
            useESModules: true,
          }],
        ],
      }),
      !dev && terser({
        module: true,
      }),
    ],

    preserveEntrySignatures: false,
    onwarn,
  },

  server: {
    input: { server: config.server.input().server.replace(/\.js$/, '.ts') },
    output: { ...config.server.output(), sourcemap },
    plugins: [
      replace({
        'process.browser': false,
        'process.env.NODE_ENV': JSON.stringify(mode),
      }),
      svelte({
        compilerOptions: {
          dev,
          generate: 'ssr',
        },
        preprocess,
      }),
      resolve({
        dedupe: ['svelte'],
        preferBuiltins: false,
      }),
      commonjs({
        sourceMap: !!sourcemap,
      }),
      typescript({
        noEmitOnError: !dev,
        sourceMap: !!sourcemap,
      }),

      // Build global CSS
      (() => {
        let builder;
        let builder2;
        let rebuildNeeded = false;

        const buildGlobalCSS = () => {
          if (builder) {
            rebuildNeeded = true;
            return;
          }
          rebuildNeeded = false;
          let start = performance.now();

          // Build global CSS
          try {
            builder = spawn('node', ['--experimental-modules', '--unhandled-rejections=strict', 'build-global-css.mjs', sourcemap]);
            builder.stdout.pipe(process.stdout);
            builder.stderr.pipe(process.stderr);

            builder.on('close', (code) => {
              if (code === 0) {
                const elapsed = parseInt(performance.now() - start, 10);
                console.log(`${colors.bold().green('??? global css')} (src/global.pcss ??? static/global.css${sourcemap === true ? ' + static/global.css.map' : ''}) ${colors.gray(`(${elapsed}ms)`)}`);
              } else if (code !== null) {
                if (dev) {
                  console.error(`global css builder exited with code ${code}`);
                  console.log(colors.bold().red('??? global css'));
                } else {
                  throw new Error(`global css builder exited with code ${code}`);
                }
              }

              // Service worker injecting
              start = performance.now();

              try {
                builder2 = spawn('node', ['--experimental-modules', '--unhandled-rejections=strict', 'service-worker-files-inject.mjs', sourcemap]);
                builder2.stdout.pipe(process.stdout);
                builder2.stderr.pipe(process.stderr);

                builder2.on('close', (code2nd) => {
                  if (code2nd === 0) {
                    const elapsed = parseInt(performance.now() - start, 10);
                    console.log(`${colors.bold().green('??? service worker files inject')} (static/service-worker.js) ${colors.gray(`(${elapsed}ms)`)}`);
                  } else if (code2nd !== null) {
                    if (dev) {
                      console.error(`service worker files inject exited with code ${code}`);
                      console.log(colors.bold().red('??? service worker files inject'));
                    } else {
                      throw new Error(`service worker files inject exited with code ${code}`);
                    }
                  }

                  builder2 = undefined;
                });
              } catch (err) {
                console.log(colors.bold().red('??? service worker files inject'));
                console.error(err);
              }

              builder = undefined;

              if (rebuildNeeded) {
                console.log(`\n${colors.bold().italic().cyan('something')} changed. rebuilding...`);
                buildGlobalCSS();
              }
            });
          } catch (err) {
            console.log(colors.bold().red('??? global css'));
            console.error(err);
          }
        };

        return {
          name: 'build-global-css',
          options: buildGlobalCSS,
        };
      })(),
    ],
    external: Object.keys(pkg.dependencies).concat(
      require('module').builtinModules || Object.keys(process.binding('natives')), // eslint-disable-line global-require
    ),

    preserveEntrySignatures: 'strict',
    onwarn,
  },

  serviceworker: dev ? undefined : {
    input: config.serviceworker.input(),
    // output: config.serviceworker.output(),
    // Rename service worker file, so it's not registered automatically
    // We register in manually in template on load event
    // Can't
    output: (() => {
      const swOutput = config.serviceworker.output();
      return {
        ...swOutput,
        // file: swOutput.file.replace('service-worker.js', 'serviceworker.js'),
        file: './static/service-worker.js',
      };
    })(),
    plugins: [
      resolve(),
      replace({
        'process.browser': true,
        'process.env.NODE_ENV': JSON.stringify(mode),
      }),
      commonjs(),
      !dev && terser(),
    ],

    preserveEntrySignatures: false,
    onwarn,
  },
};
