import React from 'react'

const AlbumsBox = ({albums}) => {
    return (
        <div className="wrapped-box">
            <h2 className="title">Albums</h2>
            {albums.album.map(album => {
                return (
                    <div className="wrapped-box-item" key={album['@attr'].rank}>
                        
                        <div className="wrapped-box-item-title">#{album['@attr'].rank}. {album.name}</div>
                    </div>
                )
            })}
        </div>
    )
}

export default AlbumsBox
