import babel from 'rollup-plugin-babel'
import external from 'rollup-plugin-peer-deps-external'
import resolve from '@rollup/plugin-node-resolve'
import scss from 'rollup-plugin-scss'
import typescript from '@rollup/plugin-typescript'
import copy from 'rollup-plugin-copy'
import commonjs from 'rollup-plugin-commonjs'
import { terser } from 'rollup-plugin-terser'

export default [
  {
    input: './index.ts',
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
        targets: [{ src: 'source/styles/fonts', dest: 'dist' }],
      }),
      external(),
      resolve(),
      typescript(),
      terser(),
    ],
  },
]
