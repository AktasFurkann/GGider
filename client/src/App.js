import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";


import './App.css';
// import Deneme from './components/Deneme';
import AnaSayfa from './Pages/AnaSayfa';
import Gelir from './Pages/Gelir/Gelir';
import Gider from './Pages/Gider/Gider';
import Header from './components/Header';
import KayitOl from './Pages/KayitOl/KayitOl';




function App() {

  return (
<div className="App">


<BrowserRouter>

<Header></Header>

<Routes>  


<Route path="/" element={<AnaSayfa />}/>  
<Route path='Gelir' element={ <Gelir></Gelir> }/>
<Route path='Gider' element={ <Gider></Gider> }/>
<Route path='KayitOl' element={ <KayitOl></KayitOl> }/>

</Routes>
</BrowserRouter>
    
        
    </div>
  );
}

export default App;
