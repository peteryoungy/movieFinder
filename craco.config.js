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
                            '@layout-header-color': '#f5c518',
                            // '@layout-header-height': '80px',
                            // '@dropdown-menu-bg': '#000000'
                            '@drawer-bg': '#202020'
                        },
                        javascriptEnabled: true,
                    },
                },
            },
        },
    ],
};