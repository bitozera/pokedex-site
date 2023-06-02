import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { typeHandler } from '../../util/pokemonGetType';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));


export default function PokemonDataTable({pokemonData}) {
  const {height, weight, types} = pokemonData;
  return (
    <TableContainer component={Paper} sx={{height: "fit-content", maxWidth: "500px", boxShadow: "none"}}>
      <Table  aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Altura (cm)</StyledTableCell>
            <StyledTableCell>Peso (g)</StyledTableCell>
            <StyledTableCell>Tipos</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        <TableRow>
            <StyledTableCell>{height}</StyledTableCell>
            <StyledTableCell>{weight}</StyledTableCell>
            <StyledTableCell>{typeHandler(types)}</StyledTableCell>
          </TableRow>
          {/* {rows.map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell component="th" scope="row">
                {row.name}
              </StyledTableCell>
              <StyledTableCell align="right">{row.calories}</StyledTableCell>
            </StyledTableRow>
          ))} */}
        </TableBody>
      </Table>
    </TableContainer>
  );
}