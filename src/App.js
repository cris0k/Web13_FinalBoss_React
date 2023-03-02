import { Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "./components/auth/LoginPage";
import RequireAuth from "./components/auth/RequiteAuth";
import Layout from "./components/layout/Layout";
import AdvertsPage from "./components/adverts/AdvertsPage";
import RegisterPage from "./components/auth/RegisterPage";
import ProfilePage from "./components/profile/ProfilePage";
import AdvertDetail from "./components/adverts/AdvertDetail";
<<<<<<< HEAD
import NewAdvert from "./components/adverts/NewAdvert";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/adverts" element={<Layout />}>
          <Route index element={<AdvertsPage />} />
          <Route path=":advertId" element={<AdvertDetail />} />
        </Route>

        <Route
          path="/user-profile"
          element={
            <RequireAuth>
              <ProfilePage />
            </RequireAuth>
          }
        />
=======
import NotFoundPage from "./components/common/NotFoundPage";


function App() {
  return (
    
      <div className="App" >
        <Routes>
          
          <Route path='/' element={<Layout />}>
            <Route index element={<AdvertsPage />}/>
            <Route path=":advertId" element={<AdvertDetail />} />
            <Route path='/user-profile' element={
              <RequireAuth>
                <ProfilePage />
              </RequireAuth>
            } />
          </Route>

          <Route path ='/login' element={<LoginPage />}/>
          <Route path='/register' element={<RegisterPage />} />
          <Route path="/404" element={<NotFoundPage/>}/>
          <Route path="/" element={<Navigate to="/adverts" />} />
          <Route path="*" element={<Navigate to="/404" />} />
        </Routes>
          
      </div>
    
>>>>>>> main

        <Route
          path="/newadvert"
          element={
            // <RequireAuth>
            <NewAdvert />
            //</RequireAuth>
          }
        />

        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/" element={<Navigate to="/adverts" />} />
        <Route path="*" element={<Navigate to="/404" />} />
      </Routes>
    </div>
  );
}

export default App;
