import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const WeatherContainer = styled.div`
  padding: 20px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  transition: all 0.3s ease;
  
  &:hover {
    box-shadow: 0 6px 8px rgba(0,0,0,0.15);
  }
`;

const TabContainer = styled.div`
  display: flex;
  margin-bottom: 20px;
  background: #f8f9fa;
  padding: 5px;
  border-radius: 8px;
`;

const Tab = styled.button`
  padding: 12px 24px;
  border: none;
  background: ${props => props.$active ? '#007bff' : 'transparent'};
  color: ${props => props.$active ? '#fff' : '#333'};
  cursor: pointer;
  flex: 1;
  transition: all 0.3s ease;
  font-weight: 500;
  
  &:first-child {
    border-radius: 6px 0 0 6px;
  }
  
  &:last-child {
    border-radius: 0 6px 6px 0;
  }
  
  &:hover {
    background: ${props => props.$active ? '#0056b3' : '#e9ecef'};
  }
`;

const WeatherCard = styled.div`
  padding: 25px;
  border-radius: 16px;
  background: #fff;
  margin-bottom: 20px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
  }
  
  h2 {
    color: #2C3E50;
    font-size: 1.8em;
    margin-bottom: 20px;
  }
  
  h3 {
    color: #2C3E50;
    font-size: 2.2em;
    margin: 0;
  }
  
  p {
    color: #7F8C8D;
    font-size: 1.1em;
    margin: 5px 0;
  }
`;

const WeatherIcon = styled.img`
  width: 80px;
  height: 80px;
  margin-right: 20px;
  filter: drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1));
`;

const WeatherInfo = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
`;

const WeatherDetails = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
  margin-top: 15px;
  padding-top: 15px;
  border-top: 1px solid #dee2e6;
`;

const DetailItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  background: rgba(236, 240, 241, 0.5);
  border-radius: 10px;
  transition: background 0.3s ease;
  
  &:hover {
    background: rgba(236, 240, 241, 0.8);
  }
  
  i {
    font-size: 1.2em;
    color: #3498DB;
  }
  
  span {
    color: #34495E;
    font-size: 1.1em;
  }
`;

const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
`;

const Loader = styled.div`
  width: 50px;
  height: 50px;
  border: 5px solid #f3f3f3;
  border-top: 5px solid #007bff;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const SunInfo = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 15px;
  padding-top: 15px;
  border-top: 1px solid #dee2e6;
`;

const SunTime = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  
  i {
    color: #ffc107;
  }
`;

const AirQuality = styled.div`
  margin-top: 15px;
  padding: 15px;
  background: ${props => {
    if (props.$aqi <= 2) return '#e3f5e1';
    if (props.$aqi <= 4) return '#fff3cd';
    return '#f8d7da';
  }};
  border-radius: 8px;
`;

const WeatherAlert = styled.div`
  padding: 10px 15px;
  background: #fff3cd;
  border-left: 4px solid #ffc107;
  margin-bottom: 15px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  gap: 10px;
  
  i {
    color: #ffc107;
  }
`;

const WindDirection = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  
  i {
    transform: rotate(${props => props.$degree}deg);
    transition: transform 0.3s ease;
  }
`;

const API_KEY = process.env.REACT_APP_OPENWEATHER_API_KEY;

function WeatherDisplay({ city }) {
  const [weatherData, setWeatherData] = useState(null);
  const [activeTab, setActiveTab] = useState('current');

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const currentWeather = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${city.lat}&lon=${city.lon}&appid=${API_KEY}&units=metric&lang=ru`
        );

        const forecast = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${city.lat}&lon=${city.lon}&appid=${API_KEY}&units=metric&lang=ru`
        );

        const airQuality = await axios.get(
          `https://api.openweathermap.org/data/2.5/air_pollution?lat=${city.lat}&lon=${city.lon}&appid=${API_KEY}`
        );

        setWeatherData({
          current: currentWeather.data,
          daily: forecast.data.list.filter((item, index) => index % 8 === 0),
          airQuality: airQuality.data.list[0].main.aqi
        });
      } catch (error) {
        console.error('Ошибка при получении данных о погоде:', error);
      }
    };

    if (city) {
      fetchWeather();
    }
  }, [city, API_KEY]);

  if (!weatherData) {
    return (
      <LoaderContainer>
        <Loader />
      </LoaderContainer>
    );
  }

  const formatTime = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleTimeString('ru-RU', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const hasAlert = weatherData.current.main.temp > 30 || 
                   weatherData.current.wind.speed > 15 ||
                   weatherData.current.main.humidity > 85;

  const getWindDirection = (degree) => {
    const directions = ['С', 'СВ', 'В', 'ЮВ', 'Ю', 'ЮЗ', 'З', 'СЗ'];
    return directions[Math.round(degree / 45) % 8];
  };

  return (
    <WeatherContainer>
      <TabContainer>
        <Tab 
          $active={activeTab === 'current'} 
          onClick={() => setActiveTab('current')}
        >
          Сейчас
        </Tab>
        <Tab 
          $active={activeTab === 'forecast'} 
          onClick={() => setActiveTab('forecast')}
        >
          На 5 дней
        </Tab>
      </TabContainer>

      {hasAlert && (
        <WeatherAlert>
          <i className="fas fa-exclamation-triangle"></i>
          <span>
            {weatherData.current.main.temp > 30 ? 'Высокая температура воздуха' :
             weatherData.current.wind.speed > 15 ? 'Сильный ветер' :
             'Высокая влажность воздуха'}
          </span>
        </WeatherAlert>
      )}

      {activeTab === 'current' ? (
        <WeatherCard>
          <h2>Погода в городе {city.name}</h2>
          <WeatherInfo>
            <WeatherIcon 
              src={`https://openweathermap.org/img/wn/${weatherData.current.weather[0].icon}@2x.png`}
              alt={weatherData.current.weather[0].description}
            />
            <div>
              <h3>{Math.round(weatherData.current.main.temp)}°C</h3>
              <p>{weatherData.current.weather[0].description}</p>
            </div>
          </WeatherInfo>
          <WeatherDetails>
            <DetailItem>
              <i className="fas fa-thermometer-half"></i>
              <span>Ощущается как: {Math.round(weatherData.current.main.feels_like)}°C</span>
            </DetailItem>
            <DetailItem>
              <i className="fas fa-tint"></i>
              <span>Влажность: {weatherData.current.main.humidity}%</span>
            </DetailItem>
            <DetailItem>
              <WindDirection $degree={weatherData.current.wind.deg}>
                <i className="fas fa-location-arrow"></i>
                <span>
                  Ветер: {Math.round(weatherData.current.wind.speed)} м/с, {getWindDirection(weatherData.current.wind.deg)}
                </span>
              </WindDirection>
            </DetailItem>
          </WeatherDetails>
          <SunInfo>
            <SunTime>
              <i className="fas fa-sunrise"></i>
              <span>Восход: {formatTime(weatherData.current.sys.sunrise)}</span>
            </SunTime>
            <SunTime>
              <i className="fas fa-sunset"></i>
              <span>Закат: {formatTime(weatherData.current.sys.sunset)}</span>
            </SunTime>
          </SunInfo>
          <AirQuality $aqi={weatherData.airQuality}>
            <DetailItem>
              <i className="fas fa-leaf"></i>
              <span>Качество воздуха: {
                ['Отличное', 'Хорошее', 'Умеренное', 'Плохое', 'Очень плохое'][weatherData.airQuality - 1]
              }</span>
            </DetailItem>
          </AirQuality>
        </WeatherCard>
      ) : (
        <div>
          {weatherData.daily.map((day, index) => (
            <WeatherCard key={index}>
              <h3>
                {new Date(day.dt * 1000).toLocaleDateString('ru-RU', {
                  weekday: 'long',
                  month: 'long',
                  day: 'numeric'
                })}
              </h3>
              <WeatherInfo>
                <WeatherIcon 
                  src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
                  alt={day.weather[0].description}
                />
                <div>
                  <h3>{Math.round(day.main.temp)}°C</h3>
                  <p>{day.weather[0].description}</p>
                </div>
              </WeatherInfo>
              <WeatherDetails>
                <DetailItem>
                  <i className="fas fa-temperature-high"></i>
                  <span>Макс: {Math.round(day.main.temp_max)}°C</span>
                </DetailItem>
                <DetailItem>
                  <i className="fas fa-temperature-low"></i>
                  <span>Мин: {Math.round(day.main.temp_min)}°C</span>
                </DetailItem>
                <DetailItem>
                  <i className="fas fa-wind"></i>
                  <span>Ветер: {Math.round(day.wind.speed)} м/с</span>
                </DetailItem>
              </WeatherDetails>
            </WeatherCard>
          ))}
        </div>
      )}
    </WeatherContainer>
  );
}

export default WeatherDisplay; 