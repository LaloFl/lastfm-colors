import React, { useEffect } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'

export default function Home() {
  const [username, setUsername] = React.useState('placeholder')
  const [period, setPeriod] = React.useState('1month')

  const router = useRouter()

  useEffect(() => {
    
  }, [])

  const handlePeriodChange = (e) => {
    setPeriod(e.target.value);
    console.log(e.target.value);
  }
  const handleInputChange = (e) => {
    setUsername(e.target.value)
  }
  const handleSubmit = () => {
    router.push(`/user/${username}/topalbums?period=${period}`)
  }
  return (
    <div className="container">
      <Head>
        <title>Home</title>
      </Head>
      <input type="text" id="username" onChange={handleInputChange}/>
      <button onClick={handleSubmit}>Submit</button>
      <div>
        <select name="period" onChange={handlePeriodChange}>
        <option value="7day">7 days</option>
          <option value="1month">1 month</option>
          <option value="3month">3 months</option>
          <option value="6month">6 months</option>
          <option value="12month">12 months</option>
          <option value="overall">Overall</option>
        </select>
      </div>


    </div>
  )
}
