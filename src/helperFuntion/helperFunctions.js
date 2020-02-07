export const getDayFromTimeStamp = (time) => {
  const weekDay = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  return (weekDay[(new Date(time).getDay())])
}
export const getDaysFromResponse = (res) => {
  let tempArray = res
  for (let i = 0; i < res.length - 1; i++) {
    if (tempArray[i].dt_txt.substring(0, 10) === tempArray[i + 1].dt_txt.substring(0, 10)) { delete tempArray[i] }
  }
  tempArray = tempArray.filter((el) => { return (typeof el !== 'undefined') })
  tempArray.splice(-1)
  return tempArray
}
export const convertFrom24To12Format = (time24) => {
  const sHours = time24
  const period = +sHours < 12 ? 'AM' : 'PM'
  const hours = +sHours % 12 || 12
  return `${hours} ${period}`
}
