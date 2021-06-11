#### 6/8
- 使用ts模板
内容来自小程序开发文档
- TypeScript 支持
1. 如果项目需要使用 TypeScript 语言开发，开发者工具在创建项目选择快速启动模板时，提供了使用 TypeScript 语言的 QuickStart 项目，可以选择创建此项目并进行后续开发。
2. 要构建并使用 TypeScript 项目，可能需要安装 npm。
3. 配置自定义预编译: 配置编译前的预置命令，可以实现在编译前运行 tsc 以将其编译到 js 文件。
4. 如需配置 TypeScript 编译选项，请参考 `tsconfig.json` 的配置。
> > 注：小程序仅支持运行 JS 文件，因此所有的 TS 文件都默认不会被打包上传。
- 开发
1. 使用 `WechatMiniprogram` 获取封装好的接口
2. 点击编译(快捷键) 会重新把`ts->js`
3. `index.d.ts`生命全局变量
- 数据规范
1. 微信原数据,不改变(eg: userInfo)
2. `_` 代替大小写
- interface
1. `I` 接口开头
2. `0` 0: 增, 1: 删, 2:改, 3: 查
3. `declaration` 数据类型
