const figlet = require('figlet');
const chalk = require('chalk');
const inquirer = require('inquirer');
const shell = require('shelljs');
const ora = require('ora');

module.exports = async function(options = {}) {
  const promptList = [];
  if (!options.client) {
    promptList.push({
      type: 'list',
      name: 'client',
      message: '请输选择您想要的客户端？',
      choices: [
        { name: 'PC端', value: 'pc' },
        { name: '小程序', value: 'applets'},
        { name: 'APP', value: 'app' }
      ],
    });
  }
  if (!options.name) {
    promptList.push({
      type: 'input',
      name: 'name',
      message: '请输入项目名称：',
      default(answers) {
        const randomString = Math.random().toString(32).slice(-8);
        return `${randomString}-${answers.client}`;
      },
    })
  }

  const answers = await inquirer.prompt(promptList);
  const spinner = ora('项目创建中...').start();
  shell.exec(`mkdir -p ${answers.name || options.name}`);
  spinner.succeed('项目已创建');
  console.log(chalk.green(figlet.textSync('Frontend!', {})));
  console.log(chalk.green('Initialize project success!'));
}
