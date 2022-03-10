import React from 'react'
import s from './App.module.scss'
import Navbar from './components/Navbar/Navbar'
import {AppRouter} from  './components/AppRouter'

function App() {
  return (
      <div className={s.App}>
          <div className={s.navBar}>
              <Navbar />
          </div>
          <div className={s.pageWrapper}>
              <AppRouter/>
          </div>
      </div>
  )
}

export default App
