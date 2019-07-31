export default {
  title: 'HOST-UI',
  description: 'Host UI mobile first.',
  themeConfig: {
    mode: 'dark',
  },
  menu: ['Getting Started', 'Button'],
  htmlContext: {
    head: {
      raw: '<style>button{margin-right:16px}</style>',
    },
  },
  modifyBundlerConfig: (config) => {
    config.module.rules.push({
      test: /\.less$/,
      use: ['style-loader', 'css-loader', 'less-loader'],
    });

    return config;
  },
};
