import React from 'react';
import styled from 'styled-components';

const SelectContainer = styled.div`
  margin-bottom: 30px;
`;

const Select = styled.select`
  width: 100%;
  max-width: 400px;
  padding: 15px 20px;
  margin: 0 auto;
  display: block;
  font-size: 16px;
  color: #2C3E50;
  background: #fff;
  border: 2px solid #E0E7FF;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%232C3E50' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 15px center;
  background-size: 15px;
  
  &:hover {
    border-color: #3498DB;
    box-shadow: 0 2px 8px rgba(52, 152, 219, 0.15);
  }
  
  &:focus {
    outline: none;
    border-color: #3498DB;
    box-shadow: 0 2px 8px rgba(52, 152, 219, 0.25);
  }
`;

const cities = [
  { id: 1, name: 'Москва', lat: 55.7558, lon: 37.6173 },
  { id: 2, name: 'Санкт-Петербург', lat: 59.9343, lon: 30.3351 },
  { id: 3, name: 'Новосибирск', lat: 55.0084, lon: 82.9357 },
  { id: 4, name: 'Волгоград', lat: 48.7194, lon: 44.5018 },
  { id: 5, name: 'Екатеринбург', lat: 56.8519, lon: 60.6122 },
  { id: 6, name: 'Казань', lat: 55.7887, lon: 49.1221 },
  { id: 7, name: 'Нижний Новгород', lat: 56.2965, lon: 43.9361 },
  { id: 8, name: 'Челябинск', lat: 55.1644, lon: 61.4368 },
  { id: 9, name: 'Самара', lat: 53.1959, lon: 50.1001 },
  { id: 10, name: 'Омск', lat: 54.9885, lon: 73.3242 }
];

function CitySelector({ onCitySelect }) {
  return (
    <SelectContainer>
      <Select 
        onChange={(e) => {
          const city = cities.find(city => city.id === parseInt(e.target.value));
          onCitySelect(city);
        }}
        defaultValue=""
      >
        <option value="" disabled>Выберите город</option>
        {cities.map(city => (
          <option key={city.id} value={city.id}>
            {city.name}
          </option>
        ))}
      </Select>
    </SelectContainer>
  );
}

export default CitySelector; 