import React, { useEffect, useState } from 'react'
import './App.css'
import { Alert, Button, Grid, Paper, Snackbar, Table, TableBody, TableCell, TableHead, TableRow, TextField, Typography } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import axios from 'axios';

function App() {
  const [active, setActive] = useState([true, false, false]);
  const [inseguro, setInseguro] = useState({
    email: '',
    password: '',
  })
  const [seguro, setSeguro] = useState({
    email: '',
    password: '',
  })
  const [usuarioSeguros, setUsuarioSeguros] = useState([])
  const [usuarioInseguros, setUsuarioInseguros] = useState([])
  const [noTable, setNoTable] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:3000/general/seguro')
      .then((response) => {
        setUsuarioSeguros(response.data)
      })

    axios.get('http://localhost:3000/general/inseguro')
      .then((response) => {
        setUsuarioInseguros(response.data)
      })
      .catch((error) => {
        setNoTable(true);
      })
  }, [])

  const handleActive = (current) => {
    let temp = [false, false]
    temp[current] = true;
    setActive(temp);
  }

  const poblarInseguro = () => {
    axios.post('http://localhost:3000/api/auth/poblar/inseguro')
      .then((response) => {
        window.location.href = '/';
      })
  }

  const handleInseguro = () => {
    let post = {
      email: inseguro.email,
      password: inseguro.password
    }

    axios.post('http://localhost:3000/api/auth/inseguro', post)
      .then((response) => {
        console.log(response.data)
        if (response.data.message === "Login successful!") {
          setSuccess(true);
        }
        else {
          setError(true);
        }
      })
  }

  const poblarSeguro = () => {
    axios.post('http://localhost:3000/api/auth/poblar/seguro')
      .then((response) => {
        window.location.href = '/';
      })
  }

  const handleSeguro = () => {
    let post = {
      email: seguro.email,
      password: seguro.password
    }

    axios.post('http://localhost:3000/api/authSecured/seguro', post)
      .then((response) => {
        setSuccess(true);
      })
      .catch((error) => {
        setError(true);
      })
  }

  const crearTable = () => {
    axios.post('http://localhost:3000/general/crear_tabla')
      .then((response) => {
        window.location.href = '/';
      })
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSuccess(false);
    setError(false);
  };

  return (
    <>
      <Snackbar open={success} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          Login Exitoso!
        </Alert>
      </Snackbar>
      <Snackbar open={error} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
          Login Fallido!
        </Alert>
      </Snackbar>
      <h1>SQL Injection - Seguridad</h1>
      <h2>Universidad del Istmo de Guatemala - Facultad de Ingenieria</h2>
      <h3>Luis Enrique Menendez Figueroa</h3>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Button
            fullWidth
            variant='contained'
            color='success'
            disabled={active[0]}
            onClick={() => handleActive(0)}
          >
            Informacion General
          </Button>
        </Grid>
        <Grid item xs={4}>
          <Button
            fullWidth
            variant='contained'
            color='secondary'
            disabled={active[1]}
            onClick={() => handleActive(1)}
          >
            Inseguro
          </Button>
        </Grid>
        <Grid item xs={4}>
          <Button
            fullWidth
            variant='contained'
            color='primary'
            disabled={active[2]}
            onClick={() => handleActive(2)}
          >
            Seguro
          </Button>
        </Grid>
      </Grid>
      {active[0] && (
        <>
          <br />
          <h4>Usuarios Inseguros</h4>
          <br />
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Nombre</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Password</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {usuarioInseguros.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.username}</TableCell>
                  <TableCell>{item.email}</TableCell>
                  <TableCell>{item.password}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <br />
          <br />
          <Button
            disabled={!noTable}
            fullWidth variant='contained'
            color='error'
            onClick={crearTable}
          >
            Crear Tabla
          </Button>
          <br />
          <br />
          <Button
            disabled={usuarioInseguros.length > 0 || noTable}
            fullWidth
            variant='contained'
            color='warning'
            onClick={poblarInseguro}
          >
            Poblar Tabla
          </Button>
          <br />
          <br />
          <br />
          <h4>Usuarios Seguros</h4>
          <br />
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Nombre</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Password</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {usuarioSeguros.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.username}</TableCell>
                  <TableCell>{item.email}</TableCell>
                  <TableCell>{item.password}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <br />
          <br />
          <Button
            disabled={usuarioSeguros.length > 0}
            fullWidth
            variant='contained'
            color='warning'
            onClick={poblarSeguro}
          >
            Poblar Tabla
          </Button>
        </>
      )}
      {active[1] && (
        <>
          <br />
          <br />
          <TextField
            label="email"
            value={inseguro.email}
            onChange={(ev) => {
              let temp = { ...inseguro }
              temp.email = ev.target.value
              setInseguro(temp)
            }
            }
          />
          <TextField
            label="password"
            value={inseguro.password}
            onChange={(ev) => {
              let temp = { ...inseguro }
              temp.password = ev.target.value
              setInseguro(temp)
            }
            }
          />
          <br />
          <br />
          <Button variant='contained' onClick={handleInseguro}>Log In</Button>
          <br />
          <br />
        </>
      )}
      {active[2] && (
        <>
          <br />
          <Paper elevation={3}>
            <br />
            <LoginIcon />
            <Typography variant="h5" gutterBottom>
              Iniciar sesión
            </Typography>
            <TextField
              label="Correo electrónico"
              variant="outlined"
              type="email"
              value={seguro.email}
              onChange={(ev) => {
                let temp = { ...seguro }
                temp.email = ev.target.value
                setSeguro(temp)
              }}
            />
            <br />
            <br />
            <TextField
              label="Contraseña"
              variant="outlined"
              type="password"
              value={seguro.password}
              onChange={(ev) => {
                let temp = { ...seguro }
                temp.password = ev.target.value
                setSeguro(temp)
              }}
            />
            <br />
            <br />
            <Button variant="contained" color="primary" onClick={handleSeguro}>
              Iniciar sesión
            </Button>
            <br />
            <br />
          </Paper>
          <br />
        </>
      )}
    </>
  )
}

export default App
