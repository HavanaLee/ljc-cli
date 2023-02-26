const questionList = [
    {
        name: 'name',
        message: '请输入项目名称：',
    },
    {
        name: 'description',
        message: '请输入项目描述：',
    },
    {
        name: 'author',
        message: '请输入创作者：',
    }
]

const overwrite = [
    {
        name: 'overWrite',
        type: 'confirm',
        message: '目录已存在，是否覆盖？'
    }
]

module.exports = { questionList, overwrite }