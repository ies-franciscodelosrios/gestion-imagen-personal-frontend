import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import Button from 'react-bootstrap/Button';

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
     <Button variant="outline-primary">Primary</Button>{' '}
    </div>
  )
}

export default App
