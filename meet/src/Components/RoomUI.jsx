import {useHMSStore, selectLocalPeer, selectPeers} from '@100mslive/react-sdk'
import { VideoTile } from './VideoTile'

const RoomUI = () => {
    const loacalPeer = useHMSStore(selectLocalPeer)
    const peers =  useHMSStore(selectPeers)

    return(
        <div>Room
        {loacalPeer && <VideoTile peer={loacalPeer} isLocal={true}/>}
        {peers && peers.filter((peer) => !peer.isLocal)
        .map((peer) => {
           return( <>
            <VideoTile isLocal={false} peer={peer}/>
            </>
            )
        })}

        </div>
    )
}
export {RoomUI}