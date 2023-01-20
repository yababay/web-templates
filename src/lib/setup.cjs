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

console.log('\nВаш новый проект готов к разработке!');
console.log('Вам понадобится редактор VS Code с плагином Live Server.');
console.log('Выполните в терминале команды:\n');
console.log(`    cd ${projectName}`);
console.log('    npm i');
console.log('    code .');
console.log('\nВ VS Code откройте терминал и выполните:\n');
console.log('    npm run dev');
console.log('\nЗапустится процесс парсинга стилей в реальном времени.');
console.log('Можно править файлы и сразу же видеть результат в браузере.');
console.log('Подробности см. в README.md).');
console.log("\nНе забудьте отредактировать ваш package.json!\n");

