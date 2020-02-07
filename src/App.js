import React, { useState } from 'react'
import axios from 'axios'
import './styles.css'
import DayCard from './Components/DayCard'
import { apiKey } from './constants/apiKey'
import { getDayFromTimeStamp, getDaysFromResponse } from './helperFuntion/helperFunctions'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import DetailsRoute from './Components/detailsRoute'

export default function App () {
  const initialData = {
    city: '',
    country: '',
    day: '',
    status: '',
    temperature: '',
    icon: ''
  }
  const [todayWeartherData, setTodayWeartherData] = useState(initialData)
  const [city, setCity] = useState('')
  const [fiveDayData, setFiveDayData] = useState([])
  const [themeMode, setThemeMode] = useState(true)

  const getWeatherData = () => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`
      )
      .then(res => {
        setTodayWeartherData({
          city: res.data.city.name,
          country: res.data.city.country,
          day: getDayFromTimeStamp(res.data.list[0].dt_txt),
          status: res.data.list[0].weather[0].description,
          temperature: (res.data.list[0].main.temp - 273.15).toFixed(0),
          icon: res.data.list[0].weather[0].icon
        })
        console.log(getDaysFromResponse([...res.data.list]))
        const tempArray = getDaysFromResponse([...res.data.list])
        const tempArray2 = []
        for (let i = 0; i < tempArray.length; i++) {
          const list = []
          for (let j = 0; j < res.data.list.length; j++) {
            if (tempArray[i].dt_txt.substring(0, 10) === res.data.list[j].dt_txt.substring(0, 10)) {
              list.push(res.data.list[j])
            }
          }
          tempArray2.push({
            day: getDayFromTimeStamp(tempArray[i].dt_txt),
            list
          })
        }
        setFiveDayData(tempArray2)
      })
  }

  return (
    <Router>
      <div className='App' style={{ color: themeMode ? '#4d4d4d' : 'white', backgroundColor: themeMode ? 'white' : 'black' }}>
        <div className='input-controls'>
          <input
            type='text'
            value={city}
            onChange={e => setCity(e.target.value)}
          />
          <button onClick={() => getWeatherData()}>Search</button>
          <button onClick={() => setThemeMode(!themeMode)}>{themeMode ? 'Dark' : 'Light'} Mode</button>
        </div>
        <div className='main-container'>
          <div className='city-detail-card'>
            <h2>{todayWeartherData.city}
              {todayWeartherData.temperature !== '' ? ',' : null} {todayWeartherData.country}
            </h2>
            <h3>{todayWeartherData.day}</h3>
            <h3>{todayWeartherData.status}</h3>
            <div className='current-day-detail-card'>
              <img src={`https://openweathermap.org/img/w/${todayWeartherData.icon}.png`} alt='' />
              <h1>{todayWeartherData.temperature}</h1>
              <h2>
                {todayWeartherData.temperature !== '' ? <sup>°C</sup> : null}
              </h2>
              <br clear='all' />
            </div>
            <div className='days-container'>
              {
                fiveDayData.map((data, index) => (
                  <DayCard key={index} data={data} />
                ))
              }
              <br clear='all' />
            </div>
          </div>
        </div>
        <Switch>
          <Route path='/:day'>
            <DetailsRoute />
          </Route>
          <Route path='/'>
            {' '}
          </Route>
        </Switch>

      </div>
    </Router>
  )
}
