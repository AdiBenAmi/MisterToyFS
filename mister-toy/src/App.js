import { Route, HashRouter as Router, Routes } from 'react-router-dom'
import { Provider } from 'react-redux'

import { store } from './store/store'
import { ToyIndex } from './pages/toy-index'
import { AppHeader } from './cmps/app-header'
import { AppFooter } from './cmps/app-footer'
import { HomePage } from './pages/home-page'
import { ToyEdit } from './pages/toy-edit'
import { ToyDetails } from './pages/toy-details'


import './assets/styles.scss'
//replace the css here 

export default function App() {
  return (
      <Provider store={store}>
          <Router>
              <section className="app main-layout ">
                  <AppHeader />
                  <main className='main-container main-layout full'>
                      <Routes>
                          <Route element={<HomePage />} path="/" />
                          {/* <Route element={<AboutUs />} path="/about" /> */}
                          <Route element={<ToyIndex />} path="/toy" />
                          <Route element={<ToyEdit />} path="/toy/edit" />
                          <Route element={<ToyEdit />} path="/toy/edit/:toyId" />
                          <Route element={<ToyDetails />} path="/toy/:toyId" />
                          {/* <Route element={<UserDetails />} path="/user/:userId" /> */}
                      </Routes>
                  </main>
                  {/* <AppFooter /> */}
              </section>
          </Router>
      </Provider>
  );
}


