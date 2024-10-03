import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import pwrLogo from '/pwr.png'
import './App.css'
import { Route, Routes } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import PrivateRoute from "./PrivateRoute";
import Dashboard from './Dashboard';
import UserDetails from "./UserDetails.tsx";
import AddRating from "./RatingForm.tsx";
import Sidebar from "./Sidebar.tsx";

function App() {

  return (
      <>
          <div className="background-container">


              <div className="flex flex-col items-center">


                  <div className="NameHeader animate-fade-in-down">
                      <div className="flex items-center justify-between">

                          <div>
                              <div className="logo-movie">MovieBuddy</div>
                              <div className="font-extralight">Bachelor's thesis</div>
                          </div>
                          <div className="flex">


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


                  <div className="flex w-full h-full">


                      <Sidebar></Sidebar>


                      <div className="flex w-[100vw] justify-center items-center">

                      <Routes>
                          <Route path="/" element={<Login/>}/>
                          <Route path="/register" element={<Register/>}/>
                          <Route path="/dashboard" element={
                              <PrivateRoute>
                                  <Dashboard/>
                              </PrivateRoute>
                          }/>

                          <Route path="/user-details" element={
                              <PrivateRoute>
                                  <UserDetails/>
                              </PrivateRoute>
                          }/>
                          <Route path="/add-rating" element={
                              <PrivateRoute>
                                  <AddRating/>

                              </PrivateRoute>
                          }/>
                      </Routes>


                      </div>


                  </div>

              </div>


          </div>

      </>

  )
}

export default App
