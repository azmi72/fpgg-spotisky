import React from 'react'
import theme from './theme'
import './App.css'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import { useAppSelector } from './redux'
import Login from './pages/login'
import Home from './pages/home'
import CreatePlaylist from './pages/create-playlist'
import { ChakraProvider } from '@chakra-ui/react';
import SidebarWithHeader from './components/sidebar';


function App() {
  
  const { isAuthenticated }  = useAppSelector(state => state.auth)

  return (
    <ChakraProvider theme={theme}>
      <div className="App">
        <BrowserRouter>        
        {isAuthenticated ?
          <SidebarWithHeader>
             <Switch>
                <Route exact path='/create-playlist' >
                  { isAuthenticated ? <CreatePlaylist /> : <Redirect to='/' />}
                </Route>
                <Route exact path='/home' >
                  { isAuthenticated ? <Home /> : <Redirect to='/' />}
                </Route>
              </Switch>          
          </SidebarWithHeader>
        :
          <Switch>
            <Route path="/">
                <Login />
            </Route>
          </Switch>
        }
        </BrowserRouter>     
      </div>
    </ChakraProvider>
    
  );
}

export default App;