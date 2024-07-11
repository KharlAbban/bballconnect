import React from 'react'
import {RouterProvider, createBrowserRouter} from "react-router-dom"
import HomeComponent from './components/HomeComponent'
import Explore from './pages/Explore'
import Protected from './components/Protected'

const bballconnectrouter = createBrowserRouter([
  {
    path: "/",
    element: <HomeComponent />
  },
  {
    path: "/explore",
    element: <Explore />
  },
  {
    path: "/protected",
    element: <Protected />
  }
])

const App = () => {
  return (
    <RouterProvider router={bballconnectrouter} />
  )
}

export default App