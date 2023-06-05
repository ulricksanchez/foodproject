import useFetch from '../hooks/useFetch';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Navbar } from '../components/Navbar/Navbar';
import { Footer } from '../components/Footer/Footer';
import { useState } from 'react';

export const Search = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState('');
  const [nextPageUrl, setNextPageUrl] = useState('');
  const { recipes, loading, error } = useFetch(params.queryTerm, nextPageUrl);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  // console.log(recipes._links.next.href);

  const handleSearch = () => {
    // setNextPageUrl('');
    navigate(`/search/${inputValue}`);
  };

  const loadNextPage = () => {
    setNextPageUrl(recipes._links.next.href);
    //gawa setpreviouspage url storage
    console.log(nextPageUrl);
  };

  if (loading) {
    return <div>Loading ...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      <Navbar />
      <section className="mt-custom my-12 max-w-screen-xl mx-auto px-6">
        <div className="flex items-center justify-center space-x-6">
          <input
            type="text"
            className="rounded-full px-4 focus:outline-none w-full bg-transparent"
            // onSubmit={handleFormSubmit}
            placeholder="Search here"
            onChange={handleInputChange}
            value={inputValue}
          />
          <button
            type="submit"
            onClick={handleSearch}
            className="text-sm bg-primary py-3 px-6 rounded-full text-white poppins ring-red-300 focus:ring-4 transition duration-300 hover:scale-105 transform"
          >
            Search
          </button>
          <p className="text-3xl  poppins capitalize">"{params.queryTerm}"</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mt-12">
          {recipes.hits.length > 0 ? (
            recipes.hits.map((recipe) => (
              <div
                className="bg-white border border-gray-200 transition transform duration-700 hover:shadow-xl hover:scale-105 p-4 rounded-lg relative"
                key={recipe.recipe.uri}
              >
                <span className="bg-red-100 border border-red-500 rounded-full text-primary text-sm poppins px-4 py-1 inline-block mb-4 ">
                  {recipe.recipe.mealType}
                </span>
                <img
                  className="w-64 mx-auto transform transition duration-300 hover:scale-105 rounded-3xl"
                  src={recipe.recipe.image}
                  alt=""
                />
                <div className="flex flex-col items-center my-3 space-y-2">
                  <h1 className="text-gray-900 poppins text-lg">
                    {recipe.recipe.label}
                  </h1>
                  <p className="text-gray-500 poppins text-sm text-center">
                    Dish Type : {recipe.recipe.dishType}
                  </p>
                  <p className="text-gray-500 poppins text-sm text-center">
                    Cuisine Type : {recipe.recipe.cuisineType}
                  </p>

                  <button className="bg-primary text-white px-8 py-2 focus:outline-none poppins rounded-full mt-24 transform transition duration-300 hover:scale-105">
                    <Link
                      to={`/food-detail/${recipe.recipe.uri.split('_')[1]}`}
                    >
                      Try It
                    </Link>
                  </button>
                </div>
              </div>
            ))
          ) : (
            <span>No Recipe's Found</span>
          )}
        </div>
      </section>
      <button onClick={loadNextPage}>Load More</button>
      <Footer />
    </>
  );
};
