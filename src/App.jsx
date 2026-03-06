import { useState } from 'react'
import './App.css'
import CharacterDossier from './CharacterDossier'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      
      <h1> Rick and Morty </h1>
      <CharacterDossier />
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        
      </p>
    </>
  )
}

export default App
