
const { VueLoaderPlugin }= require('vue-loader')
const path = require('path')
 

module.exports = {
    entry: './src/main.js',
    output: {
        path: path.resolve(__dirname, 'public/js'),
        filename: 'bundle.js'
},
resolve: {
    alias: {
        '@': path.resolve(__dirname, 'src'),
    },
},

module: {
    rules: [
        {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader'
            }
        },
        {
            test: /\.vue$/,
            use: {
                loader: 'vue-loader'
            }
        },
        {
            test: /\.(png|jpe?g|gif)$/i,
            use: [
                {
                    loader: 'file-loader',
                    options: {
                        outputPath: 'images', // Puedes ajustar la carpeta de salida según tus necesidades
                    },
                },
            ],
        },
        {
            test: /\.css$/,
            use: {
                 loader: 'css-loader'
            }
        } 
        ]
    },
    plugins : [
        new VueLoaderPlugin()
    ]
}
    

