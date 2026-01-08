
import { Country } from '../types';

const BASE_URL = 'https://restcountries.com/v3.1';

export const fetchAllCountries = async (): Promise<Country[]> => {
  const response = await fetch(`${BASE_URL}/all?fields=name,cca3,population,region,capital,flags`);
  if (!response.ok) throw new Error('Failed to fetch countries');
  return response.json();
};

export const fetchCountryByCode = async (code: string): Promise<Country> => {
  const response = await fetch(`${BASE_URL}/alpha/${code}`);
  if (!response.ok) throw new Error('Failed to fetch country details');
  const data = await response.json();
  return data[0];
};

export const fetchCountriesByCodes = async (codes: string[]): Promise<Country[]> => {
  if (!codes.length) return [];
  const response = await fetch(`${BASE_URL}/alpha?codes=${codes.join(',')}&fields=name,cca3`);
  if (!response.ok) throw new Error('Failed to fetch border countries');
  return response.json();
};

export const fetchCountriesByRegion = async (region: string): Promise<Country[]> => {
  const response = await fetch(`${BASE_URL}/region/${region}?fields=name,cca3,population,region,capital,flags`);
  if (!response.ok) throw new Error('Failed to fetch countries by region');
  return response.json();
};
