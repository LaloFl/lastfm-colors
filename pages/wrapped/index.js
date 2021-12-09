import React from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'

const Wrapped = () => {
    const [username, setUsername] = React.useState('')
    const [period, setPeriod] = React.useState('1month')
  
    const router = useRouter()
  
    const handleInputChange = (e) => {
      setUsername(e.target.value)
    }
    const handleSubmit = () => {
      if(!username || username.length < 3) return
      router.push(`/wrapped/${username}`)
    }
    return (
      <div className="container">
        <Head>
          <title>Last.fm Wrapped</title>
        </Head>
        <h3>Last.fm Wrapped</h3>
        <input type="text" id="username" onChange={handleInputChange}/>
        <button onClick={handleSubmit}>Submit</button>
      </div>
    )
}

export default Wrapped
