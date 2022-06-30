import { Route, Routes, BrowserRouter } from "react-router-dom";

//pages and components
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Issues from "./pages/Issues";
import CreateIssue from "./pages/CreateIssue";

//mui
import { Container } from "@mui/material";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Container>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/issues" element={<Issues />} />
            <Route path="/create-issue" element={<CreateIssue />} />
          </Routes>
        </Container>
      </BrowserRouter>
    </div>
  );
}

export default App;
