const { ConcatSource } = require('webpack-sources')

exports.default = class CommentPlugin {
    constructor (options) {
        const comment = options.comment
        this.comment = `This is your comment: ${comment}`
    }

    apply (compiler) {
        compiler.hooks.emit.tapPromise('emit', (compilation) => {
            return new Promise((resolve) => {
                const assets = compilation.getAssets()
                assets.forEach((file) => {
                    console.log('file: ', file);
                    compilation.updateAsset(file.name, (old) => {
                        console.log('old: ', old);
                        console.log('file.source: ', file.source.constructor.prototype);
                        return new ConcatSource(old, "\n // ", this.comment)
                    })
                })
                resolve()
            }).then(() => {
                console.log('hook:emit');
            });
        });
    }
}