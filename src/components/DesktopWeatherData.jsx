/* eslint-disable react/prop-types */
import { roundTempToNearestDegree } from '../utils/helperFunctions';

const DesktopWeatherData = ({ curWeatherData }) => {
  const { temp, temp_max, temp_min, city, country, weather, humidity, curDateStr } = curWeatherData;
  return (
    <div className='weather-container' style={{ display: 'block' }}>
      <div className='md-text'>Today&apos;s Weather</div>
      <div className='lg-text'>
        <b>{`${roundTempToNearestDegree(temp)}°`}</b>
      </div>
      <div className='md-text'>{`H: ${roundTempToNearestDegree(temp_max)}°
    L: ${roundTempToNearestDegree(temp_min)}°`}</div>
      <div className='table'>
        <span className='md-text table-col-left'>
          <b>{`${city}, ${country}`}</b>
        </span>
        <span className='md-text table-col-center'>{curDateStr}</span>
        <span className='md-text table-col-right'>{`Humidity: ${humidity}%`}</span>
        <span className='md-text table-col-right'>{weather}</span>
      </div>
      {/* <div className='weather-container-right'> */}
      {/* <img src='/src/assets/sun.png' alt='clouds' width='150px' className='img-container' /> */}

      {/* </div> */}
    </div>
  );
};

export default DesktopWeatherData;
