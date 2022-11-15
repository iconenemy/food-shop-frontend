import React, { useContext, useState } from 'react'; 
import { Link, useNavigate } from 'react-router-dom';
import { observer} from 'mobx-react-lite';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

import StoreContext from '../../index'

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props} style={{marginBottom: "4"}}>
    {'Copyright © '}
    <Link to='/' style={{color: "#38757b"}}>
      I C O N
    </Link>{' '}
    {new Date().getFullYear()}
    {'.'}
    </Typography>
  );
}

const Login = () => {
  const {store} = useContext(StoreContext)
  const navigate = useNavigate()
  
  const initialData = Object.freeze({
    username: '', 
    password: ''
  })
  
  const [formData, setFormData] = useState(initialData)
    
  const handleChange = (event) => {
    setFormData({
      ...formData, 
      [event.target.name]: event.target.value.trim()
    })
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(formData);
    try{
      store.login(formData.username, formData.password)
      navigate('/')
    } catch (err) {
      console.log(err);
      navigate('/login')
    }
  };
  
  return (
    <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
          >
          <Avatar sx={{ m: 1, bgcolor: 'teal' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5" style={{color: 'teal'}}>
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              onChange={handleChange}
              autoFocus
            />
            <TextField
              margin="normal"
              type="password"
              required
              fullWidth
              id="password"
              label="Password"
              name="password"
              autoComplete="current-password"
              onChange={handleChange}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleSubmit}
            >
              Sign In
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to='/register' variant="body2" style={{color: "teal"}}>
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
  );

}

export default observer(Login)