import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import BlogList from 'pages/blogs'
import Admin from 'pages/admin'

function App() {
  return (
    <div className='App p-5'>
      <BrowserRouter>
        <Routes>
          <Route path='home' element={<BlogList />} />
          <Route path='admin' element={<Admin />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
