import React from 'react'

const ArtistsBox = ({artists}) => {
    return (
        <div className="wrapped-box">
            <h2 className="title">Artists</h2>
            {artists.artist.map(artist => {
                return (
                    <div className="wrapped-box-item" key={artist['@attr'].rank}>
                        
                        <div className="wrapped-box-item-title">#{artist['@attr'].rank}. {artist.name}</div>
                    </div>
                )
            })}
        </div>
    )
}

export default ArtistsBox
