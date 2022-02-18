import './App.css'
import Header from './component/CommonLayout/Header/header'
import Dashboard from './component/Dashboard/Dashboard'
import { Routes, Route } from 'react-router-dom'
import VastuScore from './component/vastuScore/VastuScore'
import VastuscoreCheck from './component/VastuscoreCheck/VastuscoreCheck'
import { Fragment } from 'react'
function App() {
  return (
    <Fragment>
      <Header></Header>

      <Routes>
        <Route
          path="/"
          element={<Dashboard className="Dashboard"></Dashboard>}
        ></Route>
        <Route path="/vastuscore" element={<VastuScore />} />

        <Route path="/vastuscorecheck" element={<VastuscoreCheck />} />
      </Routes>
    </Fragment>
  )
}

export default App
