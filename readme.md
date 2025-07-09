# co-func

一个基于 Vite 构建的 TypeScript 工具库项目。

## 特性

- 使用 Vite 进行打包，支持 ES 和 CommonJS 格式
- TypeScript 编写，类型安全
- 结构清晰，易于扩展

## 目录结构

```
<code_block_to_apply_changes_from>
```

## 安装依赖

```bash
npm install
```

## 本地开发

```bash
npm run dev
```

## 构建

```bash
npm run build
```

构建产物会输出到 `dist/` 目录，包含 ES 和 CommonJS 两种格式。

## 预览

```bash
npm run preview
```

## 发布

1. 构建项目：`npm run build`
2. 发布到 npm（需先登录）：`npm publish`

## 其他

- 入口文件：`src/main.ts`
- 输出文件：`dist/co-func.js`（ESM），`dist/co-func.cjs`（CJS）

