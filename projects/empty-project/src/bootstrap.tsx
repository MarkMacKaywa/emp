import ReactDOM from 'react-dom'
import App from './App'
// import 'src/components/styles/icon.scss'
console.log('process.env.DB_HOST', process.env.DB_HOST, process.env.PASS_WORD, process.env.mode, process.env.env)
ReactDOM.render(<App />, document.getElementById('emp-root'))

/* if (module.hot) {
  module.hot.accept(err => {
    console.log('An error occurred while accepting new version')
  })
} */
