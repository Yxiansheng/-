const utils = require('loader-utils')

exports.default = function (source) {
    const { name = 'nan' } = utils.getOptions(this)
    return source.replace('[name]', name)
}