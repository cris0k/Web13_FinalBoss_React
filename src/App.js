import { Route, Routes } from "react-router-dom";
import LoginPage from "./components/auth/LoginPage";
import RequireAuth from "./components/auth/RequiteAuth";
import Layout from "./components/layout/Layout";

function App() {
  return (
    
      <div className="App" >
        <Routes>
          <Route path ='/login' element={<LoginPage />}/>
          <Route path='/'
        element={
          <RequireAuth>
            <Layout />
          </RequireAuth>
        }>
        <Route index path='/'/>
        
      </Route>
        </Routes>
          
      </div>
    
  );
    
}

export default App;
