import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import webpack from 'webpack';

const config: webpack.Configuration = {
    entry: './src/index.ts',
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: 'src/index.html'
        })
    ],
    optimization: {
        moduleIds: 'deterministic',
        runtimeChunk: 'single',
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all'
                }
            }
        }
    },
    module: {
        rules: [
            {
                test: /\.ts$/i,
                exclude: /node_modules/,
                use: ['ts-loader']
            },
            {
                test: /\.s[ac]ss$/i,
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.js$/i,
                use: ['source-map-loader'],
                enforce: 'pre'
            },
            {
                test: /\.woff2?/i,
                use: ['url-loader']
            },
            {
                test: /\.(png|ttf|svg|eot)$/i,
                use: ['file-loader']
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.ts']
    }
};

export default config;
