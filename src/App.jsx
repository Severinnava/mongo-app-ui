import { RootRouter } from './Screen'
import './App.css'
import { useAuthentication } from './Components/InitialTokenCheck'
import { createRequest } from './Config/generateMethod'

function App() {
  const authentication = useAuthentication()
  const request = createRequest(authentication)
  return (
    <>
      <RootRouter
        authentication={authentication}
        request={request}
      />
    </>
  )
}

export default App
