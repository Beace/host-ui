import babel from "rollup-plugin-babel";
import commonjs from "rollup-plugin-commonjs";
import resolve from "rollup-plugin-node-resolve";
import external from "rollup-plugin-peer-deps-external";
import less from 'rollup-plugin-less';
import { terser } from "rollup-plugin-terser";

import packageJSON from "./package.json";

const input = "./src/components/index.js";
// const minifyExtension = pathToFile => pathToFile.replace(/\.js$/, ".min.js");

const plugins = [
  babel({
    exclude: "node_modules/**"
  }),
  less({
    output: './lib/host-ui.css'
  }),
  external(),
  resolve(),
  commonjs(),
  terser(),
];

const files = [{
  file: packageJSON.main,
  format: 'cjs',
}, {
  file: packageJSON.browser,
  format: 'umd',
}, {
  file: packageJSON.module,
  format: 'es'
}];

const config = files.map(file => {
  const base = {
    input,
    output: {
      file: file.file,
      format: file.format
    },
    plugins
  };

  if (file.format === 'umd') {
    base.output.name = 'hostUI';
    base.output.globals = {
      react: "React",
      'react-dom': "ReactDOM"
    }
  } else if (file.format === 'es') {
    base.output.exports = "named";
  }
  return base;
});


export default config;