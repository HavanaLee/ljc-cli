const inquirer = require('inquirer')
const path = require('path')
const fs = require('fs-extra')
const { questionList, overwrite } = require('../bin/question.js')
const chalk = require('chalk')
const validateProjectName = require('validate-npm-package-name')
const { stopSpinner } = require('./spinner')
const { error } = require('./logger.js')

const prompt = inquirer.createPromptModule()

module.exports = (...args) => {
    return create(...args).catch(err => {
        stopSpinner(false)
        error(err)
    })
}

async function create(name, options) {
    // 判断是否符合npm命名规则
    const result = validateProjectName(name)
    if (!result.validForNewPackages) {
        console.error(chalk.red(`Invalid project name: "${name}"`))
        result.errors && result.errors.forEach(err => {
            console.error(chalk.red.dim('Error: ' + err))
        })
        result.warnings && result.warnings.forEach(warn => {
            console.error(chalk.red.dim('Warning: ' + warn))
        })
        exit(1)
    }

    // node方法，获取当前工作目录
    const cwd = process.cwd()
    // 拼接创建传入的目录名
    const targetDirectory = path.join(cwd, name)
    // 判断是否存在目录名
    if (fs.existsSync(targetDirectory)) {
        // 是否强制删除
        if (options.force) {
            // 删除文件夹
            await fs.remove(targetDirectory)
        } else {
            const { overWrite: isOverWrite } = await prompt(overwrite)
            console.log(isOverWrite);
            if (isOverWrite) await fs.remove(targetDirectory)
            else return
        }
    }

    prompt(questionList).then(res => {
        console.log(res);
        const sipner = require('./spinner.js')
    })
}