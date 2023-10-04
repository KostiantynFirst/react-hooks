import axios from "axios";

axios.defaults.baseURL = 'https://api.thecatapi.com/v1';
axios.defaults.headers.common['x-api-key'] = process.env.REACT_APP_CAT_API_KEY;

export const getCats = async (breed) => {
  const res = await axios.get(
    `/images/search?breed_ids=${breed}&limit=10`, 
  );
 return res.data;
}

export const getBreeds = async () => {
  const res = await axios.get('/breeds', 
);
  return res.data
}
