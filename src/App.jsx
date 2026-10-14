import { useState } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Schedule from "./components/Schedule";
import Trainers from "./components/Trainers";

function App() {
  return (
    <>
      <Header />
      <Hero />
      <Schedule />
      <Trainers />
    </>
  );
}

export default App;
