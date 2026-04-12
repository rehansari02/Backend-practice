import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './components/home'
import CreatePost from './components/CreatePost'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<CreatePost />} />
      </Routes>
    </div>
  )
}

export default App