module.exports = {
    printWidth: 80,
    // 超过最大值换行
    tabWidth: 4,
    // 缩进字节数
    useTabs: false,
    // 不使用缩进符，而使用空格
    semi: true,
    // 句末添加分号
    singleQuote: true,
    // 使用单引号代替双引号
    proseWrap: 'preserve',
    // 使用默认的折行标准
    arrowParens: 'avoid',
    // (x) => {} 箭头函数参数只有一个时是否要有小括号。avoid：省略括号
    bracketSpacing: true,
    // 在对象，数组括号与文字之间加空格 "{ foo: bar }"
    endOfLine: 'auto',
    // 结尾是 \n \r \n\r auto
    htmlWhitespaceSensitivity: 'css',
    // 根据显示样式决定 html 要不要折行
    jsxBracketSameLine: false,
    // 在jsx中把'>' 是否单独放一行
    jsxSingleQuote: false,
    // 在jsx中使用单引号代替双引号
    trailingComma: 'es5',
    // 在对象或数组最后一个元素后面是否加逗号（在ES5中加尾逗号）
};
