import { useEffect, useState } from 'react';
import axios from 'axios';
// import Select from 'react-select';
import { GlobalStyle } from './GlobalStyle';
// import { getBreeds, getCats } from '../cat-api';
// import { StickerList } from './StickerList';
// import stickers from '../stickers.json';

// export const App = () => {
//   const [breeds, setBreeds] = useState([]);
//   const [selectedBreed, setSelectedBreed] = useState(null);
//   const [cat, setCat] = useState(null);

//   useEffect(() => {
//     async function fetchBreeds() {
//       const data = await getBreeds();
//       setBreeds(data);
//     }
//     fetchBreeds();
//   }, []);

//   const options = breeds.map(breed => ({
//     value: breed.id,
//     label: breed.name,
//   }));

//   useEffect(() => {
//     if (selectedBreed === null) return;

//     async function fetchCats() {
//       const data = await getCats(selectedBreed);
//       setCat(data[0]);
//     }
//     fetchCats();
//   }, [selectedBreed]);

//   return (
//     <>
//       {options.length > 0 && (
//         <Select
//           options={options}
//           onChange={option => setSelectedBreed(option.value)}
//         />
//       )}
//       {cat && (
//         <div>
//           <img src={cat.url} alt="" width="320" />
//         </div>
//       )}
//       {/* <StickerList stickers={stickers} /> */}
//       <GlobalStyle />
//     </>
//   );
// };

// const getCats = async () => {
//   const res = await axios.get(
//     'https://api.thecatapi.com/v1/images/search?limit=10', 
//     {
//       headers: { 'x-api-key': process.env.REACT_APP_CAT_API_KEY },
//     }
//   );

//  return res.data;
// }

const getBreeds = async () => {
  const res = await axios.get('https://api.thecatapi.com/v1/breeds', 
  {
    headers: { 'x-api-key': process.env.REACT_APP_CAT_API_KEY },
  });

  return res.data
}

export const App = () => {

 const [breeds, setBreeds] = useState([]);

  useEffect(() => {
    async function fetchBreeds() {
      const data = await getBreeds();
      setBreeds(data)
    }

    fetchBreeds();
  }, 
  
  []);

  console.log(breeds);

  return (
    <>
  {breeds.length > 0 && (
      <select>
        {breeds.map(breed => 
          <option key={breed.id} value={breed.id}>
            {breed.name}
          </option> )}
      </select>
  )}
  {/* {cats.map((cat, idx) => <div key={idx}> <img src={cat.url} alt='' width={320}/></div>)} */}

    <GlobalStyle />
    </>
  )



}