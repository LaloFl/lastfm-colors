import React from 'react'
import Image  from 'next/image'

const TopTrackBox = ({track}) => {
    return (
        <div className="wrapped-box">
            <h2 className="title">Most listened track</h2>
            <div className="wrapped-box-item">        
                <div className="wrapped-box-item-title">{track.name} ({track.playcount} times!)</div>
                <div className="album-cover">
                    <Image src={track.image[0]['#text']} alt={track.name} width={100} height={100}/>
                </div>
            </div>
        </div>
    )
}

export default TopTrackBox
