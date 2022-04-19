import { WebpackOptions } from '@craco/craco'

const path = require('path');

const webpack : WebpackOptions = {
  alias: {
    '@': path.resolve(__dirname, 'src'),
    '@api': path.resolve(__dirname, 'src/api'),
    '@context': path.resolve(__dirname, 'src/context'),
    '@components': path.resolve(__dirname, 'src/components'),
    '@hooks': path.resolve(__dirname, 'src/hooks'),
    '@pages': path.resolve(__dirname, 'src/pages'),
    '@routes': path.resolve(__dirname, 'src/routes'),
    '@types': path.resolve(__dirname, 'src/types'),
    '@utils': path.resolve(__dirname, 'src/utils'),

  }
}

module.exports = {
  webpack
};