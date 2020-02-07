import React from 'react'
import { useHistory } from 'react-router-dom'

const DayCard = (props) => {
  const history = useHistory()
  return (
    <div className='day-item' onClick={() => history.push(`/${props.data.day}`, props.data)}>
      <h4>{props.data.day}</h4>
      <img src={`https://openweathermap.org/img/w/${props.data.list[0].weather[0].icon}.png`} alt='' />
      <h5>
        {(props.data.list[0].main.temp - 273.15).toFixed(0)}<sup>°C</sup> ~ {(props.data.list[(props.data.list.length - 1)].main.temp - 273.15).toFixed(0)}<sup>°C</sup>
      </h5>
    </div>)
}
export default DayCard
