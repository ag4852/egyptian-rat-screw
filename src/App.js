import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Navbar from './components/navbar';
import Homepage from './pages/homepage';
import Learn from './pages/learn';
import Practice from './pages/practice';
import Quiz from './components/practice/quiz';
import Completion from './components/practice/completion';
import './styles/App.css';

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Navbar />
        <Homepage />
      </>
    ),
  },
  {
    path: "/learn",
    element: (
      <>
        <Navbar />
        <Learn />
      </>
    ),
  },
  {
    path: "/practice",
    element: (
      <>
        <Navbar />
        <Practice />
      </>
    ),
  },
  {
    path: "/practice/quiz",
    element: (
      <>
        <Navbar />
        <Quiz />
      </>
    ),
  },
  {
    path: "/practice/completion",
    element: (
      <>
        <Navbar />
        <Completion />
      </>
    ),
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
