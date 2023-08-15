import React, { useState } from 'react'
import './App.css'
import { Button, Grid, Paper, TextField, Typography } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';

function App() {
  const [active, setActive] = useState([true, false]);
  const [inseguro, setInseguro] = useState({
    email: '',
    password: '',
  })
  const [seguro, setSeguro] = useState({
    email: '',
    password: '',
  })

  const handleActive = (current) => {
    let temp = [false, false]
    temp[current] = true;
    setActive(temp);
  }

  const handleInseguro = () => {
    let post = {
      email: inseguro.email,
      password: inseguro.password
    }

    //llamado a api
  }

  return (
    <>
      <h1>SQL Injection - Seguridad</h1>
      <h2>Universidad del Istmo de Guatemala - Facultad de Ingenieria</h2>
      <h3>Luis Enrique Menendez Figueroa</h3>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Button
            fullWidth
            variant='contained'
            color='secondary'
            disabled={active[0]}
            onClick={() => handleActive(0)}
          >
            Inseguro
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button
            fullWidth
            variant='contained'
            color='primary'
            disabled={active[1]}
            onClick={() => handleActive(1)}
          >
            Seguro
          </Button>
        </Grid>
      </Grid>
      {active[0] && (
        <>
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
        </>
      )}
      {active[1] && (
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
            <Button variant="contained" color="primary" onClick={() => { }}>
              Iniciar sesión
            </Button>
            <br />
            <br />
          </Paper>
        </>
      )}
    </>
  )
}

export default App
