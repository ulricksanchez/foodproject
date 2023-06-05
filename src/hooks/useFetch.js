import { useState, useEffect } from 'react';
import { API_ID, API_KEY } from '../constants';

const useFetch = (queryTerm, nextPageUrl) => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  console.log(nextPageUrl);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let url = `https://api.edamam.com/api/recipes/v2?type=public&q=${queryTerm}&app_id=${API_ID}&app_key=${API_KEY}`;
        if (nextPageUrl) {
          url = nextPageUrl;
        }
        //else if previous url

        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Failed to fetch recipes');
        }
        const data = await response.json();
        setRecipes(data);
        setLoading(false);
        // console.log(nextPageUrl);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, [queryTerm, nextPageUrl]);

  return { recipes, loading, error };
};

export default useFetch;
