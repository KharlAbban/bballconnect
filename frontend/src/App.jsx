import React from 'react'
import {RouterProvider, createBrowserRouter} from "react-router-dom"
import { CourtsPage, LandingPage } from './pages'
import { RouteError } from './components'

const bballconnectrouter = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
    errorElement: <RouteError />
  },
  {
    path: "/courts",
    element: <CourtsPage />
  }
])

const App = () => {
  return (
    <RouterProvider router={bballconnectrouter} />
  )
}

export default App