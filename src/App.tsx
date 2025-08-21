import './css/App.css'
import {createBrowserRouter, RouterProvider} from "react-router";
import Home from "./Home.tsx";
import PetDetails from "./PetDetails.tsx";
import MainPage from "./MainPage.tsx";
import PetOverview from "./PetOverview.tsx";
import {useFetchInitialData} from "./fetchInitialData.tsx";
import PetForm from "./PetForm.tsx";

function App() {
    useFetchInitialData()

  return (
    <>
        <RouterProvider router={createBrowserRouter([
            {
                path: "/",
                element: <Home/>,
                children:[
                    {
                        path: "/",
                        element: <MainPage/>
                    },
                    {
                        path: "/pet",
                        element: <PetOverview/>
                    },
                    {
                        path: "/pet/:petID",
                        element:<PetDetails/>
                    },
                    { // pet form for filling out information about a pet - create one or edit one
                        path: "/pet/form/create",
                        element: <PetForm/>
                    },
                    { // pet form for filling out information about a pet - create one or edit one
                        path: "/pet/form/:petID/edit",
                        element: <p>edit pet</p>
                    },
                    {
                        path: "/pet/:petID/buy",
                        element:<p>a specific pet</p>
                    }
                ]
            }
        ])}/>
    </>
  )
}

export default App
