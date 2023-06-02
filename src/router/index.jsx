import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "../pages/Home";
import { Profile } from "../pages/Profile";

export const Router = () => {
    const [pokemonData, setPokemonData] = useState();
  return (
    //RESPONSAVEL POR FAZER AS ROTAS DOS SITES, OU SEJA, LINKS PARA NAVEGAR

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home setPokemonData={setPokemonData}></Home>}></Route>
        <Route path="/profile" element={<Profile pokemonData={pokemonData}></Profile>}></Route>
      </Routes>
    </BrowserRouter>
  );
};
