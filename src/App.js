import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import CountryPage from './pages/CountryPage'
import HomePage from './pages/HomePage'

const App = () => {
	return (
		<BrowserRouter>
			<Routes>

        <Route path="/" element={<HomePage/>}/>
        <Route path="/country/:name" element={<CountryPage/>}/>

      </Routes>
		</BrowserRouter>
	)
}

export default App
