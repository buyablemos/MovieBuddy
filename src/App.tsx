import React from "react";
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes } from 'react-router-dom';
import Login from './Login';
import Register from './Register';

function App() {

  return (
      <>
          <header className="NameHeader">
              <div className="flex items-center justify-between">

                  <div className="logo-movie">MovieBuddy</div>

                  <div className="flex items-end">


                      <div>
                          <p>Powered by</p>

                          <div className="flex items-center justify-between">

                              <a href="https://vitejs.dev" target="_blank">
                                  <img src={viteLogo} className="logo" alt="Vite logo"/>
                              </a>
                              <a href="https://react.dev" target="_blank">
                                  <img src={reactLogo} className="logo react" alt="React logo"/>
                              </a>

                          </div>
                      </div>
                  </div>
              </div>
          </header>


          <div className="background-container">
              <Routes>
                  <Route path="/" element={<Login />} />
                  <Route path="/register" element={<Register />} />
              </Routes>
          </div>

      </>

  )
}

export default App
