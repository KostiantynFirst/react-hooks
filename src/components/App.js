import { useEffect, useState } from 'react';
import Select from 'react-select';
import { GlobalStyle } from './GlobalStyle';
import { getBreeds, getCats } from '../cat-api';

import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

export const App = () => {

 const [breeds, setBreeds] = useState([]);
 const [selectedBreed, setSelectedBreed] = useState(null);
 const [cats, setCats] = useState([]);

  useEffect(() => {
    async function fetchBreeds() {
      const data = await getBreeds();
      setBreeds(data)
    }

    fetchBreeds();
  }, 
  []);

  useEffect(() => {

    if (selectedBreed === null) return;

    async function fetchCats() {
      const data = await getCats(selectedBreed)
      setCats(data);
    }
    fetchCats();
  },
  [selectedBreed]);

  const options = breeds.map(breed => ({
    value: breed.id,
    label: breed.name,
  }))

  console.log(cats);

  console.log(selectedBreed);

  return (
    <>
  {options.length > 0 && (
      <Select options={options} onChange={option => setSelectedBreed(option.value)}>
      </Select>
  )} 


  {cats.length > 0 && (
   <ImageGallery 
      items={cats.map(cat => ({
        original: cat.url,
        thumbnail: cat.url,
        description: cat.id,
    }))}
   />
  )}
    <GlobalStyle />
    </>
  )



}