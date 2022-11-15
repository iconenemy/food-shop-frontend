import {Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Main from './components/Main';
import Login from './components/authComponents/Login';
import Register from './components/authComponents/Register';
import { useContext, useEffect } from 'react';
import StoreContext from './index';
import {observer} from 'mobx-react-lite'

const App = () => {
  const {store} = useContext(StoreContext)

  useEffect( () => {
    if (localStorage.getItem('access_token')) {
      store.checkAuth()
    }
  }, [store])

  return ( <>
    {store.isLoading ? 
      <div>Loading...</div> 
      : 
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Main />} />
          <Route path='login' element={<Login />} />
          <Route path='register' element={<Register />} />
        </Route>
      </Routes>
      }
  </>
  );
}

export default observer(App);
