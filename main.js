import { attach } from "./store.js"
import App from './component/app.js'
import html from "../core.js";

console.log(html`<h1>fafd</h1>`)
attach(App,document.getElementById('root'))








