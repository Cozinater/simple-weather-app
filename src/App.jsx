import { useState } from 'react';
// import reactLogo from './assets/react.svg';
// import viteLogo from '/vite.svg';
import { AiOutlineSearch } from 'react-icons/ai';
import { MdDelete } from 'react-icons/md';
import './App.scss';

function App() {
  // const [count, setCount] = useState(0);
  const searchHistory = [
    { country: 'Johor, MY', date: '01-09-2022 09:40am' },
    { country: 'Osaka, JP', date: '01-09-2022 09:40am' },
    { country: 'Seoul, KR', date: '01-09-2022 09:40am' },
  ];

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

          <button className='search-button'>
            <AiOutlineSearch color='white' size='large' />
          </button>
        </div>

        <div className='info-container'>
          <div className='weather-container'>
            <div className='weather-container-left'>
              <div className='md-text'>Today&apos;s Weather</div>
              <div className='lg-text'>26°</div>
              <div className='md-text'>H: 29° L: 26°</div>
              <div className='md-text'>Johor MY</div>
            </div>
            <div className='weather-container-right'>
              <img src='/src/assets/sun.png' alt='clouds' width='150px' className='img-container' />
              <div className='weather-right'>
                <div className='md-text'>Clouds</div>
                <div className='md-text'>Humidity: 58%</div>
                <div className='md-text'>01-09-2022 09:40am</div>
              </div>
            </div>
          </div>

          <div className='search-history-container'>
            <div className='md-text'>Search History</div>
            <br />
            {searchHistory.map((item, i) => {
              return (
                <div className='search-history' key={i}>
                  <div style={{ width: '-webkit-fill-available' }}>
                    <div className='md-text'>{item.country}</div>
                    <div className='sm-text'>{item.date}</div>
                  </div>
                  <div className='hollow-cirle'>
                    <AiOutlineSearch color='rgba(255, 255, 255, 0.4)' size='lg' />
                  </div>
                  <div className='hollow-cirle'>
                    <MdDelete color='rgba(255, 255, 255, 0.4)' size='lg' />
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
