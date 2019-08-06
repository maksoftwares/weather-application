const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const place = document.querySelector('.location')
const forecast = document.querySelector('.forecast')
const error = document.querySelector('.error')

weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault()
    const location = search.value
    fetch('/weather?address='+location).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            error.textContent = 'Unable to find location'
        }
        place.textContent = data.location
        forecast.textContent = data.forecast
    })
  })    
})