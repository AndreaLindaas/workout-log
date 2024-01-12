import "./App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Header from "./components/Header/Header";
import Dashboard from "./pages/Dashboard/Dashboard";
import Footer from "./components/Footer/Footer";
import Excercises from "./pages/Excercises/Excercises";
import RegisterPerformance from "./pages/RegisterPerformance/RegisterPerformance";
import CreateExcercise from "./pages/CreateExcercise/CreateExcercise";
function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard/:id" element={<Dashboard />} />
            <Route path="/excercises" element={<Excercises />} />
            <Route path="/register" element={<RegisterPerformance />} />
            <Route path="/create" element={<CreateExcercise />} />
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
