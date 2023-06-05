import "../App.css";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Navbar } from "../components/Navbar/Navbar";
import { Footer } from "../components/Footer/Footer";

export const FoodDetail = () => {
  const [selectedFood, setSelectedFood] = useState(null);
  const [error, setError] = useState(null);
  const params = useParams();

  useEffect(() => {
    const fetchFoodDetails = async () => {
      try {
        const apiId = "ef00f4db";
        const apiKey = "ba56c90bd2895b66f54d802183ec00b1";
        const foodId = params.id;

        const response = await fetch(
          `https://api.edamam.com/api/recipes/v2/${foodId}?type=public&app_id=${apiId}&app_key=${apiKey}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch food details");
        }

        const data = await response.json();
        setSelectedFood(data);
      } catch (error) {
        setError(error);
      }
    };

    fetchFoodDetails();
  }, [params.id]);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!selectedFood) {
    return null; // Food details are being fetched
  }

  return (
    <>
      <Navbar />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10">
        {/* Left Element */}
        <div className="py-20 my-9 mx-auto">
          <h1 className="text-4xl">{selectedFood.recipe.label}</h1>
          <p className="pb-10">{selectedFood.recipe.dishType}</p>
          <p>Meal Type: {selectedFood.recipe.mealType}</p>
        </div>
        {/* Right Element */}
        <div>
          <img
            className="tutorial-image"
            src={selectedFood.recipe.image}
            alt={selectedFood.recipe.label}
          />
        </div>
      </div>
      <Footer />
    </>
  );
};
