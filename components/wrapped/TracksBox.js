import React from 'react'

const TracksBox = ({tracks}) => {
    return (
        <div className="wrapped-box">
            <h2 className="title">Tracks</h2>
            {tracks.track.map(track => {
                return (
                    <div className="wrapped-box-item" key={track['@attr'].rank}>
                        
                        <div className="wrapped-box-item-title">#{track['@attr'].rank}. {track.name}</div>
                    </div>
                )
            })}
        </div>
    )
}

export default TracksBox
