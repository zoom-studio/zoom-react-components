import resolve from '@rollup/plugin-node-resolve'
import typescript from '@rollup/plugin-typescript'
import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
import copy from 'rollup-plugin-copy'
import external from 'rollup-plugin-peer-deps-external'
import scss from 'rollup-plugin-scss'
import { terser } from 'rollup-plugin-terser'

export default [
  {
    input: './source/index.ts',
    output: [
      {
        file: 'dist/index.js',
        format: 'cjs',
      },
      {
        file: 'dist/index.es.js',
        format: 'es',
        exports: 'named',
      },
    ],
    plugins: [
      scss({
        output: true,
        failOnError: true,
        outputStyle: 'compressed',
      }),
      babel({
        exclude: 'node_modules/**',
        presets: ['@babel/preset-react'],
      }),
      commonjs({
        include: 'node_modules/**',
      }),
      copy({
        targets: [
          { src: 'source/styles/fonts', dest: 'dist' },
          { src: 'dist/index.es.css', dest: 'dist', rename: 'index.css' },
          {
            src: [
              'source/styles/_palette.scss',
              'source/styles/_variables.scss',
              'source/styles/_functions.scss',
              'source/styles/_mixins.scss',
            ],
            dest: 'dist/scss',
          },
        ],
      }),
      external(),
      resolve(),
      typescript(),
      terser(),
    ],
  },
]
