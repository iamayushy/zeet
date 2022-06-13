import { useEffect, useRef } from "react"
import {useHMSActions, useHMSStore, selectCameraStreamByPeerID, selectPeers} from '@100mslive/react-sdk'

const VideoTile = ({peer, isLocal}) => {
    const videoRef = useRef(null)
    const hmsActions = useHMSActions()
    const videoTrack = useHMSStore(selectCameraStreamByPeerID(peer.id))

    useEffect(() => {
        (async() => {
            console.log(videoRef.current)
            console.log(videoTrack)
            if(videoRef.current && videoTrack){
                if(videoTrack.enabled){
                    await hmsActions.attachVideo(videoTrack.id, videoRef.current)
                }
                else{
                    await hmsActions.detachVideo(videoTrack.id, videoRef.current)
                }
            }
        })()
    }, [videoTrack])

    return(
        <div>
            <section>
                <video
                ref={videoRef}
                autoPlay={true}
                playsInline
                muted={true}>

                </video>
                <section>{peer.name}</section>
            </section>
        </div>
    )
}
export {VideoTile}