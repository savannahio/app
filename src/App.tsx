import React, { useContext } from "react";
import { BrowserRouter } from "react-router-dom";
import Navbar from "@components/navigation/Navbar";
import { AuthContext, AuthContextType } from "@context/authContext";
import Router from "@routes/Router";

const App: React.FC = () => {
  const { user } = useContext(AuthContext) as AuthContextType

  return (
    <BrowserRouter>
      <Navbar user={user} />
      <Router user={user} />
    </BrowserRouter>
  );
};

export default App;
