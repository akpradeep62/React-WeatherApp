
import './App.css';
import searchIcon  from './assets/search.png';
import cloudIcon  from './assets/cloudy.png';
import clearIcon from './assets/sun.png';
import drizzleIcon from './assets/drizzle.png';
import rainIcon from './assets/rainythunder.png';
import windIcon from './assets/wind.png';
import snowIcon from './assets/snow.png';
import humidityIcon from './assets/humidity.png';
import { useEffect, useState } from 'react';



const WeatherDetails = ({icon,temp,city,country,lat,lang,humidity,wind})=>{

  return(
    <>
       <div className='image'>
       <img src={icon} alt=''/>
       </div>
       <div className="temp">{temp}°C</div>
        <div className="city">{city}</div>
        <div className="country">{country}</div>
        <div className="cord">
          <div>
            <span className='lat'>latitude</span>
            <span>{lat}</span>
          </div>
          <div>
          <span className='lat'>langitude</span>
            <span>{lang}</span>
          </div>
        </div>
        <div className='Data-container'>
          <div className='element'>
            <img src={humidityIcon} alt="humidity" className='humidity' />
            <div className='Data'>
              <div className='humidity-percentage'>{humidity}%</div>
              <div className='text'>Humidity</div>
            </div>
            
          </div>
          <div className='element'>
            <img src={windIcon} alt="humidity" className='humidity' />
            <div className='Data'>
              <div className='humidity-percentage'>{wind} Kmh</div>
              <div className='text'>Wind Speed</div>
            </div>
          </div>
        </div>
    </>
  );
};


function App() {
  const [icon,SetIcon] =useState();
  const [text,SetText] = useState('Chennai');
  const [temp,setTemp] = useState(0);
  const [city,setCity] = useState("Chennai");
  const [country,setCountry] = useState('');
  const [lat,setLat]=useState(0);
  const [lang,setLang]=useState(0);
  const [wind,setWind] =useState(0);
  const [humidity,setHumidity] = useState(0);
  const [error,setError] = useState(false)
  const [cityNotFound,setCityNotFound] = useState(false);
  const[loading,setLoading]=useState(false);

  
  const WeatherMap={
    '01d' : clearIcon,
    '01n' :clearIcon,
    '02d' : cloudIcon,
    '03d' : drizzleIcon,
    '03n' : drizzleIcon,
    '04d' : drizzleIcon,
    '04n' : drizzleIcon,
    '09d' : rainIcon,
    '09n' :rainIcon,
    '10d' : rainIcon,
    '10n' : rainIcon,
    '13d' : snowIcon,
    '13n' : snowIcon

  }


  const  search = async ()=>{
    setLoading(true)
    let apikey = '593300ec95f87398194477014938aac3'
    let url=`https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=${apikey}&units=metric`
  
    try{
      let res = await fetch(url);
      let data = await res.json();
      console.log(data)
      if(data.cod=='404'){
        setCityNotFound(true)
        setError(true)
        console.error('city not found ')
      }
      setHumidity(data.main.humidity);
      setWind(data.wind.speed);
      setTemp(Math.floor(data.main.temp));
      setCity(data.name);
      setCountry(data.sys.country);
      setLat(data.coord.lat);
      setLang(data.coord.lon);
      const WeatherCode = data.weather[0].icon;
      SetIcon(WeatherMap[WeatherCode] || clearIcon)
      setCityNotFound(false)
    }catch(error){
        console.error('An error occured',error.message)
        setError(false)
    }finally{
      setLoading(false)
  
    }
  };

  const handlecity =(e) => {
    SetText(e.target.value);
  };
  const handlekeyDown = (e)=> {
      if(e.key=='Enter'){
        search();
      }
  }

  useEffect(function (){
    search();
  },[]);

  return (
    <>
      <div className='container'>
        <div className='input-container'>
          <input type="text" className='city-input' 
          placeholder='Search City' value={text} onChange={handlecity} onKeyDown={handlekeyDown}/>
          <div>
            <img src={searchIcon} alt="search"  className='search-icon' onClick={()=>search()}/>
          </div>
        </div>
        {loading && <div className="loading-message">Loading...</div>}
        {error && <div className="error-message">{error}</div>}
        {cityNotFound && <div className="city-Not-Found">City Not Found</div>}
       { !loading && !cityNotFound && <WeatherDetails icon = {icon} temp={temp} city={city} country={country} lat={lat} lang={lang} wind={wind} humidity={humidity}/>
      }
      <p className='copyright'>Designed by AKPRADEEP</p>
      </div>
      
    </>
  )
}

export default App;
