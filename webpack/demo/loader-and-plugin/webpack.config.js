const CommentPlugin = require('./comment-plugin').default
const path = require('path')

module.exports = {
    entry: {
        'index': path.resolve(__dirname, './index')
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[chunkhash].js'
    },
    module: {
        rules: [
            {
                test: /\.txt/,
                use: [
                    path.resolve(__dirname, './str-loader'), 
                    {
                        loader: path.resolve(__dirname, './txt-loader'),
                        options: {
                            name: 'world'
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new CommentPlugin({ comment: 'hello world' })
    ]
}