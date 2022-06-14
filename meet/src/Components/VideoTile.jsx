import { useEffect, useRef } from "react"
import { useHMSActions, useHMSStore, selectCameraStreamByPeerID, selectIsLocalAudioEnabled, selectIsLocalVideoEnabled, selectIsPeerAudioEnabled } from '@100mslive/react-sdk'
import { Action } from "./Actions"
import {BsFillMicFill, BsMicMuteFill, BsFillCameraVideoFill, BsFillCameraVideoOffFill} from 'react-icons/bs'

const VideoTile = ({ peer, isLocal }) => {
    const videoRef = useRef(null)
    const hmsActions = useHMSActions()
    const videoTrack = useHMSStore(selectCameraStreamByPeerID(peer.id))
    const isAudioEnabled = useHMSStore(selectIsLocalAudioEnabled)
    const isPeerAudio = useHMSStore(selectIsPeerAudioEnabled(peer.id))
    useEffect(() => {
        (async () => {
            console.log(videoRef.current)
            console.log(videoTrack)
            if (videoRef.current && videoTrack) {
                if (videoTrack.enabled) {
                    await hmsActions.attachVideo(videoTrack.id, videoRef.current)
                }
                else {
                    await hmsActions.detachVideo(videoTrack.id, videoRef.current)
                }
            }
        })()
    }, [videoTrack])


    return (
        <div>
            <section className={isLocal ? "video-box" : 'peer-box'}>
                <video
                    ref={videoRef}
                    autoPlay={true}
                    playsInline
                    muted={true}
                    className={isLocal ? 'host-v' : 'peers-v'}>

                </video>
                <section className="indicator">
                {isLocal && isAudioEnabled ? <BsFillMicFill color="red" size={22}/> : <BsMicMuteFill color="red" size={22}/> }
                {!isLocal && isPeerAudio ? <BsFillMicFill color="red" size={22}/> : <BsMicMuteFill color="red" size={22}/> }
                </section>
                <section className="video-label"><p>{peer.name}</p></section>
                <section className="action-bar">
                    {isLocal && <Action />}
                </section>
            </section>

        </div>
    )
}
export { VideoTile }