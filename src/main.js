import { createApp, h } from 'vue'
import './style.css'
import App from './components/HelloWorld.vue'

function renderVueComponentToDOM(domElement, msg) {
  const TheComponent = h(App, {
    msg
  }, null)
  createApp(TheComponent).mount(domElement)
}

export default renderVueComponentToDOM
