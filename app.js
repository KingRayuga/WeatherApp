const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img');

const updateUI = (data) =>{
    const {cityDets,weather} = data;


    details.innerHTML = `
        <h5 class="my-3">${cityDets.EnglishName}</h5>
        <div class="my-3">${weather.WeatherText}</div>
        <div class="display-4 my-4">
        <span>${weather.Temperature.Metric.Value}</span>
        <span>&deg;C</span>
        </div>
    `;

    const iconSrc = `icons/${weather.WeatherIcon}.svg`;
    icon.setAttribute('src',iconSrc);

    let timeSrc = null;

    if(weather.IsDayTime)
    {
        timeSrc = 'day.svg';
    }
    else
    {
        timeSrc = 'night.svg';
    }
    time.setAttribute('src',timeSrc);

    if(card.classList.contains('d-none'))
    {
        card.classList.remove('d-none');
    }

};

const UpdateCity = async (city) =>{
    const cityDets = await getCity(city);
    console.log(cityDets);   
    const weather = await getWeather(cityDets.Key);
    return {cityDets,weather};
};

cityForm.addEventListener('submit',e => {
    e.preventDefault();
    const city = cityForm.city.value.trim();
    cityForm.reset();
    UpdateCity(city)
        .then(data => updateUI(data))
        .catch(err => console.log(err));
    localStorage.setItem('city',city);    
});

if(localStorage.getItem('city'))
{
    UpdateCity(localStorage.getItem('city'))
        .then(data => updateUI(data))
        .catch(err => console.log(err));
}
