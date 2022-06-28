const path = require('path')


module.exports = {
    entry: './imports.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname,'dist')    
    }
}