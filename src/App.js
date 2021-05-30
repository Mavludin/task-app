import { BrowserRouter } from "react-router-dom";
import "./App.css";
import { Header } from "./components/Header/Header";
import { Nav } from "./components/Nav/Nav";
import { TaskCreation } from "./components/TaskCreation/TaskCreation";
import { TaskEdit } from "./components/TaskEdit/TaskEdit";
import { Routes } from "./components/Routes/Routes";
import { useSelector } from "react-redux";
import { createFormVisibility } from "./store/slices/createForm";
import { editFormVisibility } from "./store/slices/editForm";

export const App = () => {

  const isEditFormVisible = useSelector(editFormVisibility)
  const isCreateFormVisible = useSelector(createFormVisibility)

  return (
    <BrowserRouter>
      <div className="App">
        <Nav />
        <div className="mainBlock">
          { isCreateFormVisible && <TaskCreation /> }
          { isEditFormVisible && <TaskEdit /> }
          <Header />
          <Routes />
        </div>
      </div>
    </BrowserRouter>
  );
};
