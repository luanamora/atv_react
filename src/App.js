import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import axios from 'axios';
import { useState, useEffect } from 'react'  

const columns = [
  { id: 'categoria',                label: 'Categoria',           minWidth: 100, align: 'center'},
  { id: 'cargo',                    label: 'Cargo',               minWidth: 250, align: 'center' },
  { id: 'setor_siape',              label: 'Siape',               minWidth: 50,  align: 'center' },
  { id: 'disciplina_ingresso',      label: 'Disciplina',          minWidth: 150, align: 'center' },
  { id: 'setor_suap',               label: 'Suape',               minWidth: 50,  align: 'center'},
  { id: 'nome',                     label: 'Nome',                minWidth: 200, align: 'center' },
  { id: 'funcao',                   label: 'Função',              minWidth: 50,  align: 'center' },
  { id: 'jornada_trabalho',         label: 'Jornada de Trabalho', minWidth: 300, align: 'center' },
  { id: 'telefones_institucionais', label: 'Telefone',            minWidth: 200, align: 'center' },
];

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 500,
  },
});

export default function StickyHeadTable() {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [data, setData] = useState([]);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  useEffect(() => {    
    const GetData = async () => {    
      const result = await axios.get('https://dados.ifrn.edu.br/dataset/0c5c1c1a-7af8-4f24-ba37-a9eda0baddbb/resource/c3f64d5b-f2df-4ef2-8e27-fb4f10a7c3ea/download/dados_extraidos_recursos_servidores.json');
      setData(result.data);    
    }  
    GetData();    
    console.log(data);  
  }, []); 

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }, {fontWeight: "bold"}}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
              return (
                <TableRow >  
                  <TableCell align="center">{row.categoria}</TableCell>  
                  <TableCell align="center">{row.cargo}</TableCell>  
                  <TableCell align="center">{row.setor_siape}</TableCell>  
                  <TableCell align="center">{row.disciplina_ingresso}</TableCell>
                  <TableCell align="center">{row.setor_suap}</TableCell>  
                  <TableCell align="center">{row.nome}</TableCell>
                  <TableCell align="center">{row.funcao}</TableCell>
                  <TableCell align="center">{row.jornada_trabalho}</TableCell>
                  <TableCell align="center">{row.telefones_institucionais}</TableCell>
              </TableRow> 
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 15]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
