import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import pwrLogo from '/pwr.png'
import './App.css'
import { Route, Routes } from 'react-router-dom';
import Login from './Login-Register/Login.tsx';
import Register from './Login-Register/Register.tsx';
import PrivateRoute from "./checkAcces/PrivateRoute.tsx";
import Dashboard from './Dashboard';
import UserDetails from "./UserDetails.tsx";
import AddRating from "./RatingScreen/RatingForm.tsx";
import Sidebar from "./Sidebar.tsx";
import NeuralNetworkCF  from "./recommendationScreens/NeuralNetworkCF.tsx";
import NeuralNetworkCBF from "./recommendationScreens/NeuralNetworkCBF.tsx";
import KnnHistory from "./recommendationScreens/kNN_history.tsx";
import KnnMovie from "./recommendationScreens/kNN_movie.tsx";
import SVD from "./recommendationScreens/SVD.tsx";
import RouteOnlyAddedUserDetails from "./checkAcces/RouteOnlyAddedUserDetails.tsx";
import RouteOnlyWithHistory from "./checkAcces/RouteOnlyWithHistory.tsx";
import RouteOnlyIfModelIsTrainedOnUser from "./checkAcces/RouteOnlyIfModelIsTrainedOnUser.tsx";
import Metadata from "./recommendationScreens/Metadata.tsx";


function App() {

  return (
      <>
          <div className="background-container">


              <div className="flex flex-col items-center">


                  <div className="NameHeader animate-fade-in-down">
                      <div className="flex items-center justify-between">

                          <div>
                              <div className="logo-movie">MovieBuddy</div>
                              <div className="font-extralight">Engineer's Thesis</div>
                          </div>
                          <div className="flex">


                              <div>

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
                          <Route path="/login" element={<Login/>}/>
                          <Route path="/register" element={<Register/>}/>
                          <Route path="/" element={

                                  <Dashboard/>

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
                          <Route path="/NNCBF" element={
                              <PrivateRoute>
                                  <RouteOnlyAddedUserDetails>

                                          <NeuralNetworkCBF/>

                                  </RouteOnlyAddedUserDetails>
                              </PrivateRoute>
                          }/>
                          <Route path="/NNCF" element={
                              <PrivateRoute>
                                  <RouteOnlyWithHistory>
                                  <RouteOnlyIfModelIsTrainedOnUser model={"nn_cf"}>
                                      <NeuralNetworkCF/>
                                  </RouteOnlyIfModelIsTrainedOnUser>
                                      </RouteOnlyWithHistory>
                              </PrivateRoute>
                          }/>
                          <Route path="/kNNhistory" element={
                              <PrivateRoute>
                                  <RouteOnlyWithHistory>
                                          <KnnHistory/>
                                  </RouteOnlyWithHistory>
                              </PrivateRoute>
                          }/>
                          <Route path="/kNNmovie" element={

                              <KnnMovie/>


                          }/>
                          <Route path="/metadata" element={

                              <Metadata/>


                          }/>
                          <Route path="/SVD" element={
                              <PrivateRoute>
                                  <RouteOnlyWithHistory>
                                      <RouteOnlyIfModelIsTrainedOnUser model={"svd"}>
                                          <SVD/>
                                      </RouteOnlyIfModelIsTrainedOnUser>
                                  </RouteOnlyWithHistory>
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
