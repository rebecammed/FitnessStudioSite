import { BrowserRouter, Routes, Route } from "react-router";
import { useState } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Schedule from "./components/Schedule";
import Trainers from "./components/Trainers";
import Pricing from "./components/Pricing";
import Contact from "./components/Contact";
import About from "./components/About";
import Footer from "./components/Footer";
import Login from "./components/Login";
function Home() {
  return (
    <>
      <Hero />
      <Schedule />
      <Trainers />
      <Pricing />
      <Contact />
      <About />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
