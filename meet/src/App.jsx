import { useEffect, useState } from 'react'
import logo from './logo.svg'
import './App.css'
import { Greet } from './Components/Greet'
import {useHMSStore, selectIsConnectedToRoom, useHMSActions} from '@100mslive/react-sdk'
import { RoomUI } from './Components/RoomUI'

function App() {
  const hmsActions = useHMSActions()
  const isConnected = useHMSStore(selectIsConnectedToRoom)
  window.addEventListener('beforeunload', () => hmsActions.leave());
  window.addEventListener('onunload', () => hmsActions.leave());
  
  return (
    <div className="App">
      {isConnected ? <RoomUI/> : <Greet/>}
    </div>
  )
}

export default App
