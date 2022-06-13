import { useState } from "react"
import {useHMSActions} from '@100mslive/react-sdk'
const endpoint = "https://prod-in2.100ms.live/hmsapi/developmeet.app.100ms.live/"

const Greet = () => {
    const hmsAction = useHMSActions()
    const [userName, setUserName] = useState("")


    const generateToken = async(user_id) => {
        const response = await  fetch(`${endpoint}api/token`, {
          method:'POST',
          body:JSON.stringify({
            user_id,
            role: 'host',
            type: 'app',
            room_id: '62a74a522630221c75a44e25'
    
          })
        })
    
        const {token} = await response.json()
        return token
    }
    
    
    const handleSubmit = async(e) => {
        e.preventDefault()
        const token = await generateToken(userName)
        hmsAction.join({authToken: token, userName})
    }
    return(
        <div>
            <form onSubmit={handleSubmit}>
                <input required onChange={(e) => setUserName(e.target.value)} value={userName} type="text" name="user" id="user" />
                <input type="submit" value = 'Join'  name="submit" id="join" />
            </form>
        </div>
    )
}
export {Greet}