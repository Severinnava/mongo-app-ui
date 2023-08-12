import { RootRouter } from './Screen'
import './App.css'
import {useAuthentication} from './Components/InitialTokenCheck'

function App() {
  return (
    <>
      <RootRouter authentication={useAuthentication()}/>
    </>
  )
}

export default App
