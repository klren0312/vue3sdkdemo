# 需求
可以封装一个方法, 在其他环境(比如vue2)中可以调用方法渲染vue3的组件
调用示例: 
```js
renderVueComponentToDOM(document.getElementById('app'), ...argument)
```

# 实现
## 1. 创建工程
使用vite创建, 选择vue
```shell
pnpm create vite
```

## 2. 项目结构
![image.png](https://upload-images.jianshu.io/upload_images/2245742-a6117dace6beae8b.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

## 3. 编写代码
核心是`main.js`, 组件就用默认的`HelloWorld.vue`

```js
import { createApp } from 'vue'
import App from './components/HelloWorld.vue'

function renderVueComponentToDOM(domElement) {
  createApp(App).mount(domElement)
}

export default renderVueComponentToDOM
```

## 3. vite打包配置
因为是需要单独的当作sdk库使用, 所以需要把组件的css打包到js中
所以需要安装vite插件`vite-plugin-css-injected-by-js`
```shell
pnpm add vite-plugin-css-injected-by-js -D
```

配置`vite.config.js`
```js
import { defineConfig } from 'vite'

import vue from '@vitejs/plugin-vue'
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js'
import { resolve } from 'path'
export default defineConfig({
  plugins: [
    vue(),
    cssInjectedByJsPlugin(),
  ],
  define: { 'process.env.NODE_ENV': '"production"' },
  build: {
    lib: {
      entry: resolve(__dirname, 'src/main.js'),
      name: 'sdk',
      fileName: 'sdk'
    }
  },
})
```
## 4. 打包使用
```shell
pnpm build
```
可以在dist文件夹下看到打包后的文件
![image.png](https://upload-images.jianshu.io/upload_images/2245742-b4846bf1113da042.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

umd文件是给node用的 不需要

我们直接新建个`index.html`引入`sdk.js`进行测试

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>test</title>
  </head>
  <body>
    <div id="app"></div>
    <script type="module" >
      import renderVueComponentToDOM from './dist/sdk.js'
      console.log(renderVueComponentToDOM)
      renderVueComponentToDOM(document.getElementById('app'))
    </script>
  </body>
</html>
```

可以看到正常渲染
![动画.gif](https://upload-images.jianshu.io/upload_images/2245742-f3bb42bb8977995c.gif?imageMogr2/auto-orient/strip)
