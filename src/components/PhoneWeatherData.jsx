/* eslint-disable react/prop-types */
import { roundTempToNearestDegree } from '../utils/helperFunctions';

const PhoneWeatherData = ({ curWeatherData }) => {
  const { temp, temp_max, temp_min, city, country, weather, humidity, curDateStr } = curWeatherData;
  return (
    <div className='weather-container'>
      <div className='weather-container-left'>
        <div className='md-text'>Today&apos;s Weather</div>
        <div className='lg-text'>
          <b>{`${roundTempToNearestDegree(temp)}°`}</b>
        </div>
        <div className='md-text'>{`H: ${roundTempToNearestDegree(temp_max)}°
    L: ${roundTempToNearestDegree(temp_min)}°`}</div>
        <div className='md-text'>
          <b>{`${city}, ${country}`}</b>
        </div>
      </div>
      <div className='weather-container-right'>
        {/* <img src='/src/assets/sun.png' alt='clouds' width='150px' className='img-container' /> */}
        <div className='weather-right'>
          <div className='md-text'>{weather}</div>
          <div className='md-text'>{`Humidity: ${humidity}%`}</div>
          <div className='md-text'>{curDateStr}</div>
        </div>
      </div>
    </div>
  );
};

export default PhoneWeatherData;
