#!/usr/bin/env node

// 检查Node版本
require('../lib/check-node-version')();

const program = require('commander');

program
  .usage('<command> [options]')
  .version(require('../package.json').version);

program
  .command('init')
  .description('Initialize')
  .option(
    '-c --client',
    'the client of project',
    (val) => ['pc', 'applets', 'app'].indexOf(val) !== -1 ? val : undefined
  )
  .option(
    '-n --projectName',
    'the name of project'
  )
  .action((cmd) => {
    const { client, projectName } = cmd;
    require('../lib/init')({
      client,
      name: projectName,
    });
  });

program.parse(process.argv);
