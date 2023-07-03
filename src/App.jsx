import { useEffect, useState } from 'react';
import axios from 'axios';
import { AiOutlineSearch } from 'react-icons/ai';
import { MdDelete } from 'react-icons/md';
import { getCurrentDateStr } from './utils/helperFunctions';
import PhoneWeatherData from './components/PhoneWeatherData';
import DesktopWeatherData from './components/DesktopWeatherData';
import './App.scss';

function App() {
  // Defining React Hooks and const
  const BREAKPOINT = 641;
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [searchHistory, setSearchHistory] = useState([]); // Stores list of search history
  const [searchValue, setSearchValue] = useState(''); // text in search bar
  const [error, setError] = useState(''); // Error Message
  const [curWeatherData, setCurWeatherData] = useState({
    temp: 30,
    temp_max: 30,
    temp_min: 30,
    humidity: 50,
    city: 'Singapore',
    country: 'SG',
    weather: 'Clouds',
    curDateStr: '',
  });

  useEffect(() => {
    // Fetch singapore weather data and display when the webpage is first loaded
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${curWeatherData.city}&appid=${
          import.meta.env.VITE_API_KEY
        }&units=metric`
      )
      .then(({ data }) => {
        // Runs if status returns 200
        setCurWeatherData({
          temp: data.main.temp,
          temp_max: data.main.temp_max,
          temp_min: data.main.temp_min,
          humidity: data.main.humidity,
          city: data.name,
          country: data.sys.country,
          weather: data.weather[0].main,
          curDateStr: getCurrentDateStr(),
        });
        setError('');
      })
      .catch((error) => {
        // handle errors
        if (error.response.status === 404) {
          setError('Country/City cannot be found!');
        }
      });

    // Handle changes to window size
    const handleWindowResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleWindowResize);

    // Return a function from the effect that removes the event listener
    return () => window.removeEventListener('resize', handleWindowResize);
  }, []);

  const fetchData = (cityCountry, shdAddToSearchHistory) => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityCountry}&appid=${
          import.meta.env.VITE_API_KEY
        }&units=metric`
      )
      .then(({ data }) => {
        // Runs if status returns 200
        setCurWeatherData({
          temp: data.main.temp,
          temp_max: data.main.temp_max,
          temp_min: data.main.temp_min,
          humidity: data.main.humidity,
          city: data.name,
          country: data.sys.country || '',
          weather: data.weather[0].main,
          curDateStr: getCurrentDateStr(),
        });
        setError('');
        shdAddToSearchHistory &&
          addToSearchHistory({ city: data.name || '', country: data.sys.country, curDateStr: getCurrentDateStr() });
      })
      .catch((error) => {
        // handle errors
        if (error.response.status === 404) {
          setError('Country/City cannot be found!');
        }
      });
  };

  const addToSearchHistory = ({ city, country, curDateStr }) => {
    setSearchHistory((prevState) => [{ city, country, curDateStr }, ...prevState]);
  };

  // ==================================================
  // onClick handler functions
  // ==================================================

  const handleOnClickSearchBarButton = () => {
    if (searchValue !== '') {
      // Fetch current weather data
      fetchData(searchValue, true);
    }
  };

  const handleOnClickSearchHistoryButton = (index) => {
    // obtain the city to fetch
    console.log('click');
    const cityToFetch = searchHistory[index].city;
    fetchData(cityToFetch, false);
  };

  const handleOnClickDeleteButton = (index) => {
    setSearchHistory((prevState) =>
      prevState.filter((item, i) => {
        if (index != i) {
          return item;
        }
      })
    );
  };

  return (
    <div className='app'>
      <div className='main-container'>
        <div className='search-container'>
          <div className='search-box' style={{ width: '100%' }}>
            <div className='search-label sm-text' style={{ margin: '0px', width: '98.5%' }}>
              Country / City
            </div>
            <input type='text' className='search-bar' onChange={(e) => setSearchValue(e.target.value)} />
            <div className='error md-text'>{error}</div>
          </div>

          <button className='search-button' onClick={handleOnClickSearchBarButton}>
            <AiOutlineSearch color='white' size={25} />
          </button>
        </div>
        <div className='img-container'>
          <img src='/src/assets/sun.png' alt='clouds' width='150px' className='img-container' />
        </div>
        <div className='info-container'>
          {windowWidth < BREAKPOINT ? (
            <PhoneWeatherData curWeatherData={curWeatherData} />
          ) : (
            <DesktopWeatherData curWeatherData={curWeatherData} />
          )}

          <div className='search-history-container'>
            <div className='md-text'>Search History</div>
            <br />
            <div className='scroll-container'>
              {searchHistory.map((item, index) => {
                return (
                  <div className='search-history' key={index}>
                    {windowWidth < BREAKPOINT ? (
                      <div style={{ width: '-webkit-fill-available' }}>
                        <div className='md-text'>{`${item.city}, ${item.country}`}</div>
                        <div className='sm-text'>{item.curDateStr}</div>
                      </div>
                    ) : (
                      <>
                        <div style={{ width: '-webkit-fill-available' }}>
                          <div className='md-text'>{`${item.city}, ${item.country}`}</div>
                        </div>
                        <div className='sm-text' style={{ fontSize: '12px', width: '200px' }}>
                          {item.curDateStr}
                        </div>
                      </>
                    )}
                    <button className='cirle-button' onClick={() => handleOnClickSearchHistoryButton(index)}>
                      <AiOutlineSearch color='rgba(255, 255, 255, 0.4)' size={20} />
                    </button>
                    <button className='cirle-button' onClick={() => handleOnClickDeleteButton(index)}>
                      <MdDelete color='rgba(255, 255, 255, 0.4)' size={20} />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
