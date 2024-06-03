import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Login } from "./pages/Login"
import { MainPage } from "./pages/MainPage"
import { Repo } from "./pages/Repo"
import { LoadingContextProvider } from "./Contexts/LoadingContext"

function App() {
    return (
      <LoadingContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />}/>
            <Route path="/main/:username/repos" element={<MainPage />}/>
            <Route path="/main/:username/repos/:repoName" element={<Repo />}/>
          </Routes>
        </BrowserRouter>
      </LoadingContextProvider>
    )
      
      
}

export default App
