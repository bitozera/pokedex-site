import React, { useEffect } from "react";
import NavBar from "../components/NavBar";
import {
  Box,
  Chip,
  Container,
  Divider,
  Paper,
  Typography,
} from "@mui/material";
import PokemonDataTable from "../components/PokemonDataTable";
import { useNavigate } from "react-router-dom";

export const Profile = ({ pokemonData }) => {
  const { name, sprites, moves } = pokemonData || {};
  const navigate = useNavigate();

  useEffect(() => {
    if (!pokemonData) {
      navigate("/");
    }
  }, []);

  if(!pokemonData){
    return null;
  }
 
  return (
    //navbar entrega a variavel hidesearch para não utilizar o campo de pesquisa, pois nesta page não é preciso
    <Container maxWidth="md">
      <NavBar hideSearch></NavBar>
      <Paper elevation={5}>
        <Box
          display={"flex"}
          flexDirection={"column"}
          alignItems={"center"}
          padding={5}
        >
          <Typography variant={"h4"}> {name} </Typography>
          <Box
            component={"img"}
            src={sprites.other["official-artwork"].front_default}
            width={"50%"}
          ></Box>
          <PokemonDataTable pokemonData={pokemonData}></PokemonDataTable>
          <Box>
            <Divider>Ataques</Divider>
            <Box textAlign={"center"} marginTop={"10px"}>
              {moves.map((moveData, key) => (
                <Chip
                  key={key}
                  sx={{ m: "5px" }}
                  label={moveData.move.name}
                ></Chip>
              ))}
            </Box>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};
