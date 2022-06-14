import { useEffect, useState } from "react"

const Card = () => {
    const [lastMeet, setLastMeet] = useState([])
    useEffect(() => {
        fetch('https://peaceful-beyond-29791.herokuapp.com/time')
        .then(res => res.json())
        .then(ans => setLastMeet(ans))
        .then(err => console.log(err))
    }, [])
    return(
        <div className="detailCard">
            {lastMeet && lastMeet.filter((ele) => ele.timer > 0).map(ele => {
                return <h4  key={ele.id} className="card" style={{padding:'1rem'}}>Recent meetings: {ele.timer} mins</h4>
            })}
        </div>
    )
}
export {Card}