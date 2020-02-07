import React from 'react'
import { useLocation } from 'react-router-dom'
import { convertFrom24To12Format } from '../helperFuntion/helperFunctions'

const DetailsRoute = (props) => {
  const location = useLocation()

  console.log()
  return (
    <div className='weather-details-container'>
      <h3>{location.state.day}</h3>
      {
        location.state.list.map((data, index) => (
          <div className='weather-item' key={index}>
            <span>{convertFrom24To12Format((new Date(data.dt_txt).getHours()))}</span>
            <img src={`https://openweathermap.org/img/w/${data.weather[0].icon}.png`} alt='' />
            <span>
              <b>
                {(data.main.temp - 273.15).toFixed(0)}<sup>°C</sup>
              </b>
            </span>
          </div>
        ))
      }
    </div>
  )
}

export default DetailsRoute
