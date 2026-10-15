import { useState } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Schedule from "./components/Schedule";
import Trainers from "./components/Trainers";
import Pricing from "./components/Pricing";

function App() {
  return (
    <>
      <Header />
      <Hero />
      <Schedule />
      <Trainers />
      <Pricing />
    </>
  );
}

export default App;
