import React, { useEffect } from 'react';

import { useRouter } from 'next/router';
import Image from 'next/image'
import Loader from 'react-loader-spinner';
import Head from 'next/head';

const TopAlbums = () => {
    const [isLoading, setIsLoading] = React.useState(true);
    const [error, setError] = React.useState(null);

    const [tobAlbums , setTobAlbums] = React.useState(null);
    const [images, setImages] = React.useState(null);

    const imgSize = 0;

    const router = useRouter()
    const query = router.query;
    const username = query.username
    const period = query.period

    const getUrl = (API_KEY) => {
        return `https://ws.audioscrobbler.com/2.0/?method=user.gettopalbums&user=${username}&api_key=${API_KEY}&period=${period}&limit=20&format=json`
    }

    // get average of rbg values of an array of image urls
    const getAverageRGB = (urls) => {
        try {
            const average = urls.reduce((acc, curr) => {
                var img = document.createElement('img');
                img.src = curr;                
                console.log(img)
                var canvas = document.createElement('canvas');
                canvas.width = img.width;
                canvas.height = img.height;
                var ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0);
                console.log(ctx)
                var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                console.log(imageData)
                img.src = curr;
                const { data } = img;
                const { r, g, b } = data;
                const avg = (r + g + b) / 3;
                console.log(avg);
                return acc + avg;
            }, 0)
            console.log(average / urls.length);
        } catch (error) {
            console.log(error);
        }
        
    }

    useEffect(() => {
        fetch(`/api/home`)
            .then(res => res.json())
            .then(data => data.vars.API_KEY)
            .then(apiKey => getUrl(apiKey))
            .then(url => fetch(url)
                .then(res => res.json())
                .then(data => {
                    console.log(data.topalbums)
                    setTobAlbums(data.topalbums)
                    const imgs = (size) => {
                        const urls = data.topalbums.album.map(
                            album => album.image[size]['#text']
                        );
                        return urls.filter(url => url !== '' && url !== null && url !== undefined)
                    }
                    getAverageRGB(imgs(imgSize))
                    setImages(imgs(imgSize))
                    setIsLoading(false);
                    setError(null);
                })
                .catch(error => {
                    setIsLoading(false);
                    setError(error);
                })
            )
    }, [username, period])
    const errorJSX = <div>Error:<br/> {error}</div>
    const loadingJSX = 
    <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    }}>
        <Loader type="TailSpin" color="#000000" height={80} width={80} />
    </div>

    return isLoading ? loadingJSX : error ? errorJSX : (
        <div >
            {tobAlbums.album.map(album => (
                <Image 
                key={tobAlbums.album.indexOf(album)}
                alt={album.name} 
                width={30} height={30} 
                src={album.image[imgSize]["#text"] ? album.image[imgSize]["#text"] : "/"}/>
            ))}
        </div>
    )
}

export default TopAlbums