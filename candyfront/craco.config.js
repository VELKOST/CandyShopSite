// eslint-disable-next-line @typescript-eslint/no-require-imports,no-undef
const path = require('path');

// eslint-disable-next-line no-undef
module.exports = {
    webpack: {
        alias: {
            // eslint-disable-next-line no-undef
            '@': path.resolve(__dirname, 'src'),
            // eslint-disable-next-line no-undef
            '@components': path.resolve(__dirname, 'src/components'),
            // eslint-disable-next-line no-undef
            '@assets': path.resolve(__dirname, 'src/assets'),

        }
    }
};