import React, { useEffect, useState } from "react";
import axios from "axios";
import NavBar from "../components/NavBar";
import PokemonCard from "../components/PokemonCard";
import { Container } from "@mui/system";
import { Grid } from "@mui/material";
import { Skeletons } from "../components/Skeletons";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";

export const Home = ({ setPokemonData }) => {
  const [pokemons, setPokemons] = useState([]); //ARRAY LIST PRINCIPAL
  const [pokemons2, setPokemons2] = useState([]); // ARRAY AUXILIAR

  const navigate = useNavigate(); //através desta const que consigo navegar entre as pages

  //function para após receber o onclick dar o get na informação que porta e levar para page destino
  const pokemonPickHandler = (pokemonData) => {
    setPokemonData(pokemonData);
    navigate("/profile");
  };

  //useEffect vai chamar a função getPokemons quando o array for montado.
  useEffect(() => {
    getPokemons();
    getPokemonsAux();
  }, []);

  //FUNÇÃO PARA RETORNAR OS END POINT URL API DE CADA POKEMON
  var endPointArr = () => {
    //endPoints retorna já o link de api de todos os pokemon e seus detalhes
    //TOTAL DE POKEMONS = 1008
    var endPoints = [];
    for (var i = 1; i < 30; i++) {
      var urlPokemon = "https://pokeapi.co/api/v2/pokemon/" + i + "/";
      endPoints.push(urlPokemon);
    }

    return endPoints;
  };

  //função responsavel por fazer o get na api e inserir no arrayList
  const getPokemons = () => {
    //axios acessa API utilizando os endpoint e inserindo os objeto no arrayList
    //LISTA PRINCIPAL
    axios
      .all(endPointArr().map((endpoint) => axios.get(endpoint)))
      .then((res) => setPokemons(res))
      .catch((err) => console.log(err));
    // axios
    //   .get("https://pokeapi.co/api/v2/pokemon?limit=151&offset=0")
    //   .then((res) => setPokemons(res.data.results))
    //   .catch((err) => console.log(err));
    //Axios faz a requisição da rest api
    //.then é para retornar uma função para quandoa promisse é cumprida
    //.catch é para retornar uma função para quando capturar algum erro
  };

  const getPokemonsAux = () => {
    //axios acessa API utilizando os endpoint e inserindo os objeto no arrayList
    //LISTA AUXILIAR
    axios
      .all(endPointArr().map((endpoint) => axios.get(endpoint)))
      .then((res) => setPokemons2(res))
      .catch((err) => console.log(err));
  };

  //função de pesquisa
  const pokemonFilter = (typedName) => {
    var filteredPokemons = []; //array para armazenar a lista filtrada

    //se input de pesquisa for vazio, retorna todos os pokemons
    if (typedName === "") {
      getPokemons();
    }

    // array chama função de pesquisa e retorna o valor para dar o set dessa lista
    filteredPokemons = pokemonSearch(filteredPokemons, typedName);
    setPokemons(filteredPokemons); //com array filtrado, atribui o valor para o array principal
  };

  //função que busca os pokemon com base no input de pesquisa
  function pokemonSearch(filteredPokemons, typedName) {
    //foreach dentro do array auxliar para sair verificando se existe algum pokemon com esse nome
    for (var i in pokemons2) {
      if (pokemons2[i].data.name.includes(typedName.toLowerCase())) {
        filteredPokemons.push(pokemons2[i]); //se existir, adiciona dentro do array
      }
    }

    return filteredPokemons; //retorna o array com os pokemon filtrado
  }

  return (
    <div>
      <NavBar pokemonFilter={pokemonFilter}></NavBar>
      <Container maxWidth="false">
        <Grid container spacing={2}>
          {pokemons.length === 0 ? (
            <Skeletons></Skeletons>
          ) : (
            pokemons.map((pokemon, key) => (
              <Grid item xs={12} sm={6} md={4} lg={2} key={key}>
                <Box onClick={() => pokemonPickHandler(pokemon.data)}>
                  <PokemonCard
                    name={pokemon.data.name}
                    image={pokemon.data.sprites.other['official-artwork'].front_default}
                    types={pokemon.data.types}
                  ></PokemonCard>
                </Box>
              </Grid>
            ))
          )}
        </Grid>
      </Container>
    </div>
  );
};
