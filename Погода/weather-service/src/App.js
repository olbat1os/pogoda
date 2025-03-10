import React, { useState } from 'react';
import styled from 'styled-components';
import WeatherDisplay from './components/WeatherDisplay';
import CitySelector from './components/CitySelector';

const AppWrapper = styled.div`
  min-height: 100vh;
  background: ${props => {
    const hour = new Date().getHours();
    if (hour >= 4 && hour < 12) return 'linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%)'; // Утро
    if (hour >= 12 && hour < 18) return 'linear-gradient(120deg, #89f7fe 0%, #66a6ff 100%)'; // День
    if (hour >= 18 && hour < 22) return 'linear-gradient(120deg, #f6d365 0%, #fda085 100%)'; // Вечер
    return 'linear-gradient(120deg, #141e30 0%, #243b55 100%)'; // Ночь
  }};
  transition: background 1s ease;
  padding: 20px;
`;

const AppContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 12px;
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  
  @media (max-width: 768px) {
    padding: 10px;
  }
`;

const Title = styled.h1`
  text-align: center;
  color: #333;
  margin-bottom: 30px;
`;

function App() {
  const [selectedCity, setSelectedCity] = useState(null);
  
  return (
    <AppWrapper>
      <AppContainer>
        <Title>Прогноз погоды</Title>
        <CitySelector onCitySelect={setSelectedCity} />
        {selectedCity && <WeatherDisplay city={selectedCity} />}
      </AppContainer>
    </AppWrapper>
  );
}

export default App; 