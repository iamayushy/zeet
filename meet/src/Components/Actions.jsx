import {useHMSStore, selectIsLocalAudioEnabled, selectIsLocalVideoEnabled, useHMSActions} from '@100mslive/react-sdk'
import {BsFillMicFill, BsMicMuteFill, BsFillCameraVideoFill, BsFillCameraVideoOffFill} from 'react-icons/bs'
import {IoExit} from 'react-icons/io5'
import {useEffect, useState} from 'react'
const Action = ({handleAudio, handleVideo}) => {
    const hmsActions = useHMSActions()
    const audioEnabled = useHMSStore(selectIsLocalAudioEnabled)
    const [time, setTime] = useState(0)
    const [lastMeetings, setLastMeetings] = useState([])
    const videoEnabled = useHMSStore(selectIsLocalVideoEnabled)
    const toogleAudio = async() => {
        await hmsActions.setLocalAudioEnabled(!audioEnabled)
    }
    const toogleVideo = async() => {
        await hmsActions.setLocalVideoEnabled(!videoEnabled)
    }
    
    useEffect(() => {
        let timer = setInterval(() => {
            setTime((time) => time + 1)
        }, 1000)

        return () => clearInterval(timer)
    }, [])

    const UpdateTimer = (timer) => {
        fetch('https://peaceful-beyond-29791.herokuapp.com/time', {
            method:'POST',
            body:JSON.stringify({ timer
            }),
            headers: { "Content-type": "application/json; charset=UTF-8" },
        })
        .then(ans => ans.json())
        .then(done => console.log(done))
        .catch(err => console.log(err))
    }
    const handleLeave = async() => {
        const newtime = (Math.floor(time/60) %60)
        UpdateTimer(newtime)
        await hmsActions.leave()
        
    }

    return(
        <div>
            {audioEnabled ? <BsFillMicFill className='mic' size={22} onClick={toogleAudio} color='white'/> : <BsMicMuteFill className='mic' size={22} onClick={toogleAudio} color='red'/>}
            {videoEnabled ? <BsFillCameraVideoFill className='cam' size={22} color='white' onClick={toogleVideo}/>:<BsFillCameraVideoOffFill size={22} className='cam' color='red' onClick={toogleVideo}/>}
            <IoExit onClick={handleLeave} className="cam" size={22} color= "red"/>
        </div>
    )
}
export {Action}