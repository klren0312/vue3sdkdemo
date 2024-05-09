import { createApp } from 'vue'
import './style.css'
import App from './components/HelloWorld.vue'

function renderVueComponentToDOM(domElement) {
  createApp(App).mount(domElement)
}

export default renderVueComponentToDOM
