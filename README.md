# Drunk Map

Drunk Map 是一个轻量、私密、打开即用的酒局记录 Web App。V1 不需要登录、不需要后端，所有记录保存在浏览器 `localStorage`。

## 本地运行

```bash
npm install
npm run dev
```

## 生产构建

```bash
npm run build
npm run preview
```

## 部署

Vercel 和 Netlify 都可以直接识别这个 Vite React 项目。

- Build command: `npm run build`
- Output directory: `dist`

## 数据结构

每条记录按 `DrinkRecord` 存储在 `localStorage` 的 `drunk-map-records-v1` 中：

```js
{
  id,
  drinkName,
  barName,
  location,
  friends,
  mood,
  alcoholPercent,
  volumeMl,
  date,
}
```

## V1 范围

- 无登录系统
- 无地图功能
- 无图片上传
- 无社交功能
- localStorage-only
