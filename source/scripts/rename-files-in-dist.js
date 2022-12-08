/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/explicit-function-return-type */

const { rename } = require('fs')
const { argv } = process
const source = argv[2]
const target = argv[3]
const distDir = __dirname.replace('/source/scripts', '/dist')

const tellMeError = file => {
  console.error(
    `\x1b[31m Tell me the ${file} file like \x1b[33m"node rename.js source.extension target.extension"\x1b[31m In which ${file}.extension is the ${file} file name`,
  )
  process.exit(0)
}
if (!source) tellMeError('source')
if (!target) tellMeError('target')

rename(`${distDir}/${source}`, `${distDir}/${target}`, () => {})
