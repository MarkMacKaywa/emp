import {lazy, Suspense} from 'react'
import {ArrowFunction} from './ArrowFunction'
import ClassDefault from './ClassDefault'
import {ClassNamed} from './ClassNamed'
import FunctionDefault from './FunctionDefault'
import {FunctionNamed} from './FunctionNamed'

const LazyComponent = lazy(() => import('./LazyComponent'))

function App() {
  return (
    <div>
      <h3>src from public</h3>
      <img src="/logo.jpg" />
      <h3>src from require</h3>
      <img src={require('./assets/logo.jpg')} />
      <ClassDefault />
      <ClassNamed />
      <FunctionDefault />
      <FunctionNamed />
      <ArrowFunction />
      <Suspense fallback={<h1>Loading</h1>}>
        <LazyComponent />
      </Suspense>
    </div>
  )
}

export default App
