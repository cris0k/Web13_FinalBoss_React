/* import { Routes, Route, Navigate} from 'react-router-dom';
import Layout from './layout/Layout'; */
import AdvertsPage from "./components/adverts/AdvertsPage";

import { Provider } from "react-redux";
import store from "./components/store/advertsList";

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <AdvertsPage />
      </Provider>
      {/* <Routes >
          <Route path ='/login' />
          <Route path = '/adverts' element={<Layout />}/>

            
          
          <Route path='/' element={<Navigate to='/adverts'/>}/>
          <Route path='/404' element={<h1>404 | Not Found</h1>}/>
          <Route path='*' element={<Navigate to='/404'/>}/>
        </Routes> */}
    </div>
  );
}

export default App;
