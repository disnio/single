module.exports = {
  presets: [
    ['@babel/preset-env'

    ],
    [
      "@vue/babel-preset-jsx"
    ]
  ],
  plugins: [
    '@babel/plugin-transform-runtime',
    "@babel/plugin-syntax-dynamic-import",
    "@babel/plugin-proposal-object-rest-spread",
    [
      "component",
      {
        "libraryName": "element-ui",
        "styleLibraryName": "theme-chalk"
      }
    ]
  ]
}
