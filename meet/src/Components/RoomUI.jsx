import {useHMSStore, selectLocalPeer, selectPeers} from '@100mslive/react-sdk'
import { VideoTile } from './VideoTile'

const RoomUI = () => {
    const loacalPeer = useHMSStore(selectLocalPeer)
    const peers =  useHMSStore(selectPeers)
   
    return(
        <div className='host'>
        {loacalPeer && <VideoTile peer={loacalPeer} isLocal={true}/>}
        <div className='peers'>
        {peers && peers.filter((peer) => !peer.isLocal)
        .map((peer) => {
           return( <>
            <VideoTile isLocal={false} peer={peer}/>
            </>
            )
        })}
        </div>
        </div>
    )
}
export {RoomUI}