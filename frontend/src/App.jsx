import {RouterProvider, createBrowserRouter} from "react-router-dom"
import { CourtsPage, LandingPage, NewCourtPage } from './pages'
import { RouteError } from './components'
import {newCourtAction} from "./actions/newCourtAction"

const bballconnectrouter = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
    errorElement: <RouteError />
  },
  {
    path: "/courts",
    element: <CourtsPage />,
    errorElement: <RouteError />
  },
  {
    path: "/courts/new",
    element: <NewCourtPage />,
    errorElement: <RouteError />,
    action: newCourtAction
  }
])

const App = () => {
  return (
    <RouterProvider router={bballconnectrouter} />
  )
}

export default App