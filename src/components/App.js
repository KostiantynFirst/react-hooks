import { useEffect, useState } from 'react';
import Select from 'react-select';
import BeatLoader from "react-spinners/BeatLoader";
import { GlobalStyle } from './GlobalStyle';
import { getBreeds, getCats } from '../cat-api';

import { SelectContainer, GalleryContainer, AppContainer } from './ComponentStyle';

import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";


export const App = () => {

 const [breeds, setBreeds] = useState([]);
 const [selectedBreed, setSelectedBreed] = useState(null);
 const [cats, setCats] = useState([]);
 const [galleryiVisible, setGalleryiVisible] = useState(false);
 const [loading, setLoading] = useState(false);

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

      setLoading(true);
      const data = await getCats(selectedBreed)
      setCats(data);
      setGalleryiVisible(true);
      setLoading(false);
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
    <AppContainer>

<SelectContainer>
    {loading ? (
      <BeatLoader 
      color="#00BFFF"
      size={50}
      aria-label="Loading Spinner"
      data-testid="loader"
    />
    ) : (
      options.length > 0 && (
        <Select options={options} onMenuOpen ={() => setGalleryiVisible(false)} onChange={handleSelectChange}>
        </Select>
    )
    )}
</SelectContainer>


{cats.length > 0 && (
        <GalleryContainer visible={galleryiVisible}>
          <ImageGallery items={cats.map(cat => ({
            original: cat.url,
            thumbnail: cat.url,
          }))} lazyLoad={true} />
        </GalleryContainer>
      )}


    <GlobalStyle />
    </AppContainer>
  )



}