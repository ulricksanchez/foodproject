import { Navbar } from "../components/Navbar/Navbar";
import { Header } from "../components/Header/Header";
import { Foods } from "../components/Foods/Foods";
import { Footer } from "../components/Footer/Footer";
import { ChefDetails } from "../components/Chefs/ChefDetails";

export const Home = () => {
  return (
    <>
      <Navbar />
      <Header />
      <Foods />
      <ChefDetails />
      <Footer />
    </>
  );
};
