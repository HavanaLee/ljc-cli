const inquirer = require('inquirer')
const path = require('path')
const fs = require('fs-extra')
const { questionList, overwrite } = require('./question.js')

const prompt = inquirer.createPromptModule()

module.exports = async function (name, options) {
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
        const sipner = require('./loading.js')
    })
}