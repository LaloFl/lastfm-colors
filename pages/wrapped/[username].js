import React, {useEffect} from 'react'
import { useRouter } from 'next/router'

// wrapped boxes components
import AlbumsBox from '../../components/wrapped/AlbumsBox'
import ArtistsBox from '../../components/wrapped/ArtistsBox'
import TracksBox from '../../components/wrapped/TracksBox'
import TopTrackBox from '../../components/wrapped/TopTrackBox'

const UserWrapped = () => {
    const router = useRouter()
    const { username } = router.query

    const [userData, setUserData] = React.useState({})
    const [loading, setLoading] = React.useState(true)
    const [error, setError] = React.useState(null)

    const getUrl = (action, key) => {
        switch (action) {
            case 'albums':
                return `https://ws.audioscrobbler.com/2.0/?method=user.gettopalbums&user=${username}&api_key=${key}&period=12month&limit=10&format=json`
            case 'tracks':
                return `https://ws.audioscrobbler.com/2.0/?method=user.gettoptracks&user=${username}&api_key=${key}&period=12month&limit=10&format=json`
            case 'artists':
                return `https://ws.audioscrobbler.com/2.0/?method=user.gettopartists&user=${username}&api_key=${key}&period=12month&limit=10&format=json`
            case 'tags':
                return `https://ws.audioscrobbler.com/2.0/?method=user.gettoptags&user=${username}&api_key=${key}&period=12month&limit=10&format=json`
            default:
                return ''
        }
    }

    const fetchData = async () => {
        try {
            const {vars} = await fetch('/api/home')
                .then(res => res.json())
            const api_key = vars.API_KEY

            const albums = await fetch(getUrl('albums', api_key))
            const albumsJson = await albums.json()
            console.log(albumsJson)

            const tracks = await fetch(getUrl('tracks', api_key))
            const tracksJson = await tracks.json()
            console.log(tracksJson)

            const artists = await fetch(getUrl('artists', api_key))
            const artistsJson = await artists.json()
            console.log(artistsJson)

            setUserData({
                toptrack: tracksJson.toptracks.track[2],
                albums: albumsJson.topalbums,
                tracks: tracksJson.toptracks,
                artists: artistsJson.topartists,
                tags: {}
            })
            setLoading(false)
        }
        catch (error) {
            console.log(error)
            setError(error)
            setLoading(false)
        }
    }


    useEffect(() => {
        document.title = `${username}'s wrapped`
        username && fetchData()
    }, [username])

    const loadingComponent = (
        <div className="loading">
            Loading...
        </div>
    )
    const errorComponent = (
        <div className="error">
            {error}
        </div>
    )
    const contentComponent = (
        <div className="wrapped-screen ">
            <TopTrackBox track={userData.toptrack}/>
            <AlbumsBox albums={userData.albums}/>
            <ArtistsBox artists={userData.artists}/>
            <TracksBox tracks={userData.tracks}/>
        </div>
    )

    return loading ? loadingComponent : error ? errorComponent : contentComponent
}

export default UserWrapped
