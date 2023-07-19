import { BrowserRouter, Routes, Route } from "react-router-dom"
import { AloneCrew, AloneRockets, Capsule, Header, Rockets } from "./components"
import {
  Homepage,
  Error,
  Core,
  Crew,
  
} from "./pages"

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Homepage />}></Route>
        <Route path="/capsule" element={<Capsule />}></Route>
        <Route path="/core" element={<Core />}></Route>
        <Route path="/crew" element={<Crew/>}></Route>
        <Route path="/rockets" element={<Rockets/>}></Route>
        <Route path="/rockets/:id" element={<AloneRockets/>}></Route>
       <Route path="/crew/:id" element={<AloneCrew/>}></Route>
        <Route path="*" element={<Error />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
