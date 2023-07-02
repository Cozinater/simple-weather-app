import { useState } from 'react';
import axios from 'axios';
// import reactLogo from './assets/react.svg';
// import viteLogo from '/vite.svg';
import { AiOutlineSearch } from 'react-icons/ai';
import { MdDelete } from 'react-icons/md';
import { roundTempToNearestDegree, getCurrentDateStr } from './utils/commonFunc';
import './App.scss';

function App() {
  // React Hooks
  // const [count, setCount] = useState(0);
  //const [searchValue, setSearchValue] = useState();
  const [curDateStr, setCurDateStr] = useState(getCurrentDateStr());
  const [curWeatherData, setCurWeatherData] = useState({ temp: 30, temp_max: 30, temp_min: 30, humidity: 50, city: 'Singapore', country: 'SG', weather: 'Clouds'})
  //   main: {
  //     temp: 0,
  //     temp_max: 0,
  //     temp_min: 0,
  //     humidity: 0
  //   }, 
  //   name: '',
  //   sys: {
  //     country: ''
  //   }, 
  //   weather: [{main: ''}]
  // });

  const searchHistoryData = [
    { country: 'Johor, MY', date: '01-09-2022 09:40am' },
    { country: 'Osaka, JP', date: '01-09-2022 09:40am' },
    { country: 'Seoul, KR', date: '01-09-2022 09:40am' },
  ];

  // const curWeatherData = [
  //   {
  //     coord: 
  //       {
  //         lon:-0.1257,lat:51.5085
  //       },
  //     weather: [
  //       {
  //         id: 800,
  //         main:"Clear",
  //         description:"clear sky",
  //         icon:"01d"
  //       }],
  //       base:"stations",
  //       main:
  //       {
  //         temp:291.12,
  //         feels_like:290.49,
  //         temp_min:289.47,
  //         temp_max:292.62,
  //         pressure:1011,
  //         humidity:58
  //       },
  //       "visibility":10000,
  //       "wind":{"speed":4.63,"deg":230},
  //       "clouds":{"all":7},
  //       "dt":1688286903,
  //       "sys":{"type":2,"id":2075535,"country":"GB","sunrise":1688269674,"sunset":1688329243},
  //       "timezone":3600,
  //       "id":2643743,
  //       "name":"London",
  //       "cod":200
  //     }
  // ]

  const handleOnClickSearchButton = (e) => {
    // Fetch current weather data
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=london&appid=${import.meta.env.VITE_API_KEY}&units=metric`)
    .then(({data}) => {
      // handle success
      setCurWeatherData({temp: data.main.temp, temp_max: data.main.temp_max, temp_min: data.main.temp_min, humidity: data.main.humidity, city: data.name, country: data.sys.country, weather: data.weather[0].main})
      console.log(data)
      setCurDateStr(getCurrentDateStr());
    })
    .catch((error) => {
      // handle error
      console.log(error);
    })
    .finally(() => {
      // always executed
    });
  }

  return (
    <div className='app'>
      <div className='main-container'>
        {/* <div>
        <a href='https://vitejs.dev' target='_blank'>
          <img src={viteLogo} className='logo' alt='Vite logo' />
        </a>
        <a href='https://react.dev' target='_blank'>
          <img src={reactLogo} className='logo react' alt='React logo' />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className='card'>
        <button onClick={() => setCount((count) => count + 1)}>count is {count}</button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className='read-the-docs'>Click on the Vite and React logos to learn more</p> */}
        <div className='search-container'>
          <div className='search-box'>
            <div className='search-label sm-text' style={{ margin: '0px' }}>
              Country
            </div>
            <input type='text' className='search-bar' />
          </div>

          <button className='search-button' onClick={handleOnClickSearchButton}>
            <AiOutlineSearch color='white' size={25} />
          </button>
        </div>

        <div className='info-container'>
          <div className='weather-container'>
            <div className='weather-container-left'>
              <div className='md-text'>Today&apos;s Weather</div>
              <div className='lg-text'>{`${roundTempToNearestDegree(curWeatherData.temp)}°`}</div>
              <div className='md-text'>{
              `H: ${roundTempToNearestDegree(curWeatherData.temp_max)}°
              L: ${roundTempToNearestDegree(curWeatherData.temp_min)}°`
              }</div>
              <div className='md-text'>{`${curWeatherData.city}, ${curWeatherData.country}`}</div>
            </div>
            <div className='weather-container-right'>
              <img src='/src/assets/sun.png' alt='clouds' width='150px' className='img-container' />
              <div className='weather-right'>
                <div className='md-text'>{curWeatherData.weather}</div>
                <div className='md-text'>{`Humidity: ${curWeatherData.humidity}%`}</div>
                <div className='md-text'>{curDateStr}</div>
              </div>
            </div>
          </div>

          <div className='search-history-container'>
            <div className='md-text'>Search History</div>
            <br />
            {searchHistoryData.map((item, i) => {
              return (
                <div className='search-history' key={i}>
                  <div style={{ width: '-webkit-fill-available' }}>
                    <div className='md-text'>{item.country}</div>
                    <div className='sm-text'>{item.date}</div>
                  </div>
                  <div className='hollow-cirle'>
                    <AiOutlineSearch color='rgba(255, 255, 255, 0.4)' size={20} style={{top: '6px', position:'relative', left:'6px' }}/>
                  </div>
                  <div className='hollow-cirle'>
                    <MdDelete color='rgba(255, 255, 255, 0.4)' size={20} style={{top: '6px', position:'relative', left:'6px' }}/>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
