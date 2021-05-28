import { BrowserRouter } from "react-router-dom";
import "./App.css";
import { Header } from "./components/Header/Header";
import { Nav } from "./components/Nav/Nav";
import { TaskCreation } from "./components/TaskCreation/TaskCreation";
import { useState } from "react";
import { TaskEdit } from "./components/TaskEdit/TaskEdit";
import { Routes } from "./components/Routes/Routes";

export const App = () => {
  const [showCreateForm, setShowCraeteForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [selectedTask, setSelectedTask] = useState({});

  return (
    <BrowserRouter>
      <div className="App">
        <Nav />
        <div className="mainBlock">
          {showCreateForm && (
            <TaskCreation
              setSelectedTask={setSelectedTask}
              setShowCraeteForm={setShowCraeteForm}
              setShowEditForm={setShowEditForm}
            />
          )}

          {showEditForm && (
            <TaskEdit
              selectedTask={selectedTask}
              setShowEditForm={setShowEditForm}
            />
          )}

          <Header />

          <Routes
            setShowCraeteForm={setShowCraeteForm}
            setSelectedTask={setSelectedTask}
            setShowEditForm={setShowEditForm}
            showEditForm={showEditForm}
          />

        </div>
      </div>
    </BrowserRouter>
  );
};
