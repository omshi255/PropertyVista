import React from "react";
import Navbar from "../components/Navbar";
import Homepage from "../components/Homepage";
import Propertycard from "../components/Propertycard"
import SliderComponent from "../components/SliderComponent"
import Userreview from "../components/Userreview"
import Contactagents from "../components/Contactagents"
import Propertyservice from "../components/Propertyservice";
import Sale from "../components/Sale";
import Footer from "../components/Footer"

const App = () => {
  return (
    
   <>
    <Navbar/>
    <Homepage/>
    <Propertycard/> 
     <SliderComponent/> 
     <Propertyservice/>
     <Contactagents/>
     <Userreview/>
     <Sale/>
     <Footer/>

 

   </>
  );
};

export default App;
