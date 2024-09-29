import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

// Създава се коренен контейнер за React приложението, като се избира HTML елемент с ID root. Това е мястото в DOM, където ще бъде рендерирано приложението.

const root = ReactDOM.createRoot(document.querySelector("#root"))
root.render(<App />)