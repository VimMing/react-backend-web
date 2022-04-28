import {Routes, Route} from 'react-router-dom'
import Introduce from '@/pages/Intro';

function App() {
  return (
    <Routes>
      <Route element={<Introduce/>}></Route>
    </Routes>  
    // <Introduce></Introduce>
  );
}

export default App;
