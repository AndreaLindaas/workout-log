import "./App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Header from "./components/Header/Header";
import Dashboard from "./pages/Dashboard/Dashboard";
import Footer from "./components/Footer/Footer";
import Excercises from "./pages/Excercises/Excercises";
import RegisterPerformance from "./pages/RegisterPerformance/RegisterPerformance";
import CreateExcercise from "./pages/CreateExcercise/CreateExcercise";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Excercise from "./pages/Excercise/Excercise";
import WorkoutLog from "./pages/WorkoutLog/WorkoutLog";
import WorkoutLogDay from "./pages/WorkoutLogDay/WorkoutLogDay";
function App() {
  return (
    <>
      <BrowserRouter>
        <Header />

        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/excercises" element={<Excercises />} />
            <Route path="/excercise/:id" element={<Excercise />} />
            <Route path="/workout-log" element={<WorkoutLog />} />
            <Route path="/workout-log/:date" element={<WorkoutLogDay />} />
            <Route
              path="/register-performance"
              element={<RegisterPerformance />}
            />
            <Route path="/create" element={<CreateExcercise />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
