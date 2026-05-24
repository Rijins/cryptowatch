import { Provider } from 'react-redux'
import './App.css'
import Navbar from './components/Navbar'
import { store } from './Redux/store'
import Home from './pages/Home'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Coin from './pages/Coin'

function App() {

  return (

    <Provider store={store}>

      <BrowserRouter>

      <div className="app">

        <Navbar/>

        <Routes>

          <Route
          path='/'
          element={<Home/>}
          />

          <Route
          path='/coin/:id'
          element={<Coin/>}
          />

        </Routes>

      </div>

      </BrowserRouter>

    </Provider>

  )
}

export default App