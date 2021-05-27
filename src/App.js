import { BrowserRouter } from "react-router-dom";
import "./App.css";
import { Header } from "./components/Header/Header";
import { Tasks } from "./components/Tasks/Tasks";
import { Nav } from "./components/Nav/Nav";
import { TaskCreation } from "./components/TaskCreation/TaskCreation";
import { useState } from "react";
import { TaskEdit } from "./components/TaskEdit/TaskEdit";

export const App = () => {
  const [showForm, setShowForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [selectedTask, setSelectedTask] = useState({});

  return (
    <BrowserRouter>
      <div className="App">
        <Nav />
        <div className="mainBlock">
          {showForm && (
            <TaskCreation
              setSelectedTask={setSelectedTask}
              setShowForm={setShowForm}
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
          <Tasks
            setShowForm={setShowForm}
            setSelectedTask={setSelectedTask}
            setShowEditForm={setShowEditForm}
          />
        </div>
      </div>
    </BrowserRouter>
  );
};
