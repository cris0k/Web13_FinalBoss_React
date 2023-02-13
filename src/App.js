import { Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "./components/auth/LoginPage";
import RequireAuth from "./components/auth/RequiteAuth";
import Layout from "./components/layout/Layout";
import AdvertsPage from "./components/adverts/AdvertsPage";

function App() {
  return (
    
      <div className="App" >
        <Routes>
          <Route path ='/login' element={<LoginPage />}/>
          <Route path='/adverts'
        element={
          <RequireAuth>
            <Layout />
          </RequireAuth>
        }>
          <Route index element={<AdvertsPage />}/>
          
          </Route>
          <Route path="/" element={<Navigate to="/adverts" />} />
          <Route path="*" element={<Navigate to="/404" />} />
        </Routes>
          
      </div>
    
  );
}

export default App;
