module.exports = {
    pluginOptions: {
        electronBuilder: {
            nodeIntegration: true,
            builderOptions: {},
            mainProcessFile: "src/background.js",
            disableMainProcessTypescript: true,

            chainWebpackMainProcess: (config) => {
                config.module
                    .rule("babel")
                    .test(/\.js$/)
                    .use("babel")
                    .loader("babel-loader")
                    .options({
                        presets: ["@vue/cli-plugin-babel/preset"],
                    })
            },
        },
    },
}
