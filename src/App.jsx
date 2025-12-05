import './App.css'
import { Route, Routes } from 'react-router'
import Home from './pages/Home'
import Topic from './pages/Topic'
import AddCard from './pages/AddCard'
import { NotFound } from './pages/NotFound'
import AddTopic from './pages/AddTopic'
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer } from 'react-toastify'
import { MyToastify } from './components/MyToastify'

function App() {


  return (
    <>
           <MyToastify />
       <ToastContainer />
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/topic' element={<Topic/>}></Route>
        <Route path='/addcard' element={<AddCard/>}></Route>
        <Route path='/addtopic' element={<AddTopic/>}></Route>
        <Route path='*' element={<NotFound/>}></Route>
      </Routes>
    </>
  )
}

export default App
