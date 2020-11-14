import path from 'path';
import webpack from 'webpack';
import merge from 'webpack-merge';

import common from './webpack.common';

const config: webpack.Configuration = merge(common, {
    mode: 'production',
    devtool: 'nosources-source-map',
    output: {
        filename: '[name].[contenthash].js',
        chunkFilename: '[name].[chunkhash].js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: './'
    }
});

export default config;
