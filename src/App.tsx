import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import pwrLogo from '/pwr.png'
import './App.css'
import { Route, Routes } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import PrivateRoute from "./PrivateRoute";
import Dashboard from './Dashboard';

function App() {

  return (
      <>
      <div className="background-container">
          

          <div className="flex flex-col items-center">


                  <div className="NameHeader animate-fade-in-down">
                      <div className="flex items-center justify-between">

                          <div className="logo-movie">MovieBuddy</div>

                          <div className="flex items-end">


                              <div>
                                  <div className="font-extralight mb-2">Powered by</div>

                                  <div className="flex items-center justify-between">

                                      <a href="https://vitejs.dev" target="_blank">
                                          <img src={viteLogo} className="logo" alt="Vite logo"/>
                                      </a>
                                      <a href="https://react.dev" target="_blank">
                                          <img src={reactLogo} className="logo react" alt="React logo"/>
                                      </a>
                                      <a href="https://pwr.edu.pl" target="_blank">
                                          <img src={pwrLogo} className="logo" alt="Pwr logo"/>
                                      </a>

                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>

                    <div className="flex">

                      <Routes>
                          <Route path="/" element={<Login/>}/>
                          <Route path="/register" element={<Register/>}/>
                          <Route path="/dashboard" element={
                              <PrivateRoute>
                                  <Dashboard/>
                              </PrivateRoute>
                          }/>
                      </Routes>


                    </div>

          </div>

              </div>

      </>

  )
}

export default App
