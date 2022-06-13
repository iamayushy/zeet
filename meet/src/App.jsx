import { useState } from 'react'
import logo from './logo.svg'
import './App.css'
import { Greet } from './Components/Greet'
import {useHMSStore, selectIsConnectedToRoom} from '@100mslive/react-sdk'
import { RoomUI } from './Components/RoomUI'

function App() {

  const isConnected = useHMSStore(selectIsConnectedToRoom)
  
  return (
    <div className="App">
      {isConnected ? <RoomUI/> : <Greet/>}
      {/* <Greet/> */}
    </div>
  )
}

export default App
