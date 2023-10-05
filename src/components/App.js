import { useEffect, useState } from 'react';
import Select from 'react-select';
import { GlobalStyle } from './GlobalStyle';
import { getBreeds, getCats } from '../cat-api';

import { SelectContainer, GalleryContainer } from './ComponentStyle';

import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

export const App = () => {

 const [breeds, setBreeds] = useState([]);
 const [selectedBreed, setSelectedBreed] = useState(null);
 const [cats, setCats] = useState([]);
 const [galleryiVisible, setGalleryiVisible] = useState(false)

  useEffect(() => {
    async function fetchBreeds() {
      const data = await getBreeds();
      setBreeds(data)
    }

    fetchBreeds();
  }, []);

  useEffect(() => {

    if (selectedBreed === null) return;

    async function fetchCats() {
      if(!selectedBreed) {
        setGalleryiVisible(false);
        return
      }

      const data = await getCats(selectedBreed)
      setCats(data);
      setGalleryiVisible(true);
    }
    fetchCats();
  }, [selectedBreed]);

  const options = breeds.map(breed => ({
    value: breed.id,
    label: breed.name,
  }));

  const handleSelectChange = option => {
    setSelectedBreed(option.value);
  }

  return (
    <>

<SelectContainer>
  {options.length > 0 && (
      <Select options={options} onMenuOpen ={() => setGalleryiVisible(false)} onChange={handleSelectChange}>
      </Select>
  )} 
</SelectContainer>


<GalleryContainer>
 {galleryiVisible && cats.length > 0 && (
    <div style={{maxWidth: '100%', maxHeight: '240px', margin: '0 auto' }}>
         <ImageGallery 
            items={cats.map(cat => ({
            original: cat.url,
            thumbnail: cat.url,
            // description: cat.breeds[0].wikipedia_url,
    }))}
          lazyLoad={true}
   />
    </div>
  )}
  </GalleryContainer>


    <GlobalStyle />
    </>
  )



}