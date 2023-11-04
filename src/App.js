import React, { useEffect } from 'react'
import AppRouter from './router'
import { getUser } from './api/auth-service';
import { useDispatch } from 'react-redux';
import { login } from './store/slices/auth-slice';


const App = () => {
  const dispatch = useDispatch();

  const loadData = async () => {
    try {
      const resp = await getUser();
      dispatch(login(resp));

    } catch (err) {
      
    }
    
  }

  useEffect(() => {
    loadData();
  }, [])

  return <AppRouter/>
   
}

export default App
