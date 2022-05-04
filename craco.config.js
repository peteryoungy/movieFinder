const CracoLessPlugin = require('craco-less');

module.exports = {
    plugins: [
        {
            plugin: CracoLessPlugin,
            options: {
                lessLoaderOptions: {
                    lessOptions: {
                        modifyVars: {
                            '@primary-color': '#f5c518',
                            '@layout-header-background': '#000000',
                        },
                        javascriptEnabled: true,
                    },
                },
            },
        },
    ],
};