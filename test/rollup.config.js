import rpi_resolve from '@rollup/plugin-node-resolve'
import rpi_jsy from 'rollup-plugin-jsy-lite'

const configs = []
export default configs

const sourcemap = 'inline'

const plugins = [ rpi_resolve() ]
const plugins_nodejs = [
  rpi_jsy({defines: {PLAT_NODEJS: true}}),
  ... plugins ]
const plugins_web = [
  rpi_jsy({defines: {PLAT_WEB: true}},
  ... plugins) ]

configs.push(
  { input: `./unittest.jsy`, plugins: plugins_nodejs,
    output: { file: './__unittest.cjs.js', format: 'cjs', sourcemap } },
  { input: `./unittest.jsy`, context: 'window', plugins: plugins_web,
    output: { file: './__unittest.iife.js', format: 'iife', name: `test_u8_utils`, sourcemap } },
)

add_bench('hex_encode')
add_bench('hex_decode')

function add_bench(src_name, opt={}) {
  configs.push(
    { input: `./bench/${src_name}.jsy`, context: 'window', plugins: plugins_web,
      output: { file: `./bench/iife/${src_name}.js`, format: 'iife', name: `bench_${src_name}`, sourcemap } },
    { input: `./bench/${src_name}.jsy`, plugins: plugins_nodejs,
      output: { file: `./bench/cjs/${src_name}.cjs`, format: 'cjs', sourcemap } }, )
}
