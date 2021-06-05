import { BrowserRouter } from "react-router-dom";
import "./App.css";
import { Header } from "./components/Header/Header";
import { Nav } from "./components/Nav/Nav";
import { Routes } from "./components/Routes/Routes";

export const App = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <Nav />
        <main className="mainBlock">
          <Header />
          <Routes />
        </main>
      </div>
    </BrowserRouter>
  );
};
