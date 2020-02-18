import rpi_resolve from '@rollup/plugin-node-resolve'
import rpi_jsy from 'rollup-plugin-jsy-lite'

const sourcemap = 'inline'

const plugins = [ rpi_resolve() ]
const plugins_nodejs = [
  rpi_jsy({defines: {PLAT_NODEJS: true}}),
  ... plugins ]
const plugins_web = [
  rpi_jsy({defines: {PLAT_WEB: true}},
  ... plugins) ]


export default [
  { input: `./unittest.jsy`, plugins: plugins_nodejs,
    output: { file: './__unittest.cjs.js', format: 'cjs', sourcemap } },
  { input: `./unittest.jsy`, context: 'window', plugins: plugins_web,
    output: { file: './__unittest.iife.js', format: 'iife', name: `test_u8_utils`, sourcemap } },

  { input: `./bench/hex.jsy`, context: 'window', plugins: plugins_web,
    output: { file: './bench/iife/hex.js', format: 'iife', name: `bench_hex`, sourcemap } },
  { input: `./bench/hex.jsy`, plugins: plugins_nodejs,
    output: { file: './bench/cjs/hex.cjs', format: 'cjs', sourcemap } },
]
