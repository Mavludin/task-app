import { BrowserRouter } from 'react-router-dom';
import './App.css';
import { Header } from './components/Header/Header';
import { Tasks } from './components/Tasks/Tasks';
import { Nav } from './components/Nav/Nav';

export const App = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <Nav />
        <div className="mainBlock">
          <Header />
          <Tasks />
        </div>
      </div>
    </BrowserRouter>
  );
}
