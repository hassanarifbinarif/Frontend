import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import List from "./Pages/List";
import EditView from "./Pages/EditView";

function App() {
  
  return (
    <>
      <Router>
        <Routes>
          <Route exact path='/' element={<List />} />
          <Route exact path='/editview' element={<EditView />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
