#!/usr/bin/env node

// Usage: npx @yababay67/web-template-tw app-name

const fs = require('fs');
const path  = require('path');
const { fileURLToPath } = require('url');

const projectName = process.argv[2];

const currentDir = process.cwd();
const projectDir = path.resolve(currentDir, projectName);
fs.mkdirSync(projectDir, { recursive: true });

let tmpDir = path.resolve(__dirname, '');
fs.cpSync(tmpDir, projectDir, { recursive: true });
tmpDir = path.resolve(__dirname, 'template');
fs.cpSync(tmpDir, projectDir, { recursive: true });

fs.renameSync(
  path.join(projectDir, 'gitignore'),
  path.join(projectDir, '.gitignore')
);

tmpDir = path.join(projectDir, 'template');
fs.rmSync(tmpDir, { recursive: true });

const indexFile = path.join(projectDir, 'index.cjs');
fs.unlinkSync(indexFile);

console.log('\nSuccess! Your new project is ready.');
console.log('Please execute in your terminal:\n');
console.log(`    cd ${projectName}`);
console.log('    npm i');
console.log('    npm run dev');
console.log('\nThen run live-server in your VS Code');
console.log('and develop in real time (see README.md).');
console.log("\nDon't forget to edit your package.json!\n");

