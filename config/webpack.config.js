const path = require('path');

const projectDir = path.join(path.dirname(__dirname));
const srcDir = path.join(projectDir, 'src');
const distDir = path.join(projectDir, 'dist');
const publicDir = path.join(projectDir, 'public');
const assetsDir = path.join(srcDir, 'assets');

module.exports = {projectDir, srcDir, distDir, publicDir, assetsDir};
