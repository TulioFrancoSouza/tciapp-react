import React from "react";
import { Route, Routes } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext";
import { SearchProvider } from "./context/SearchContext";
import ProtectedRoute from "./components/ProtectedRoute";

import Signin from "./components/home/Signin";
import Signup from "./components/home/Signup";

import Account from "./pages/Account";
import Summary from "./pages/Summary";
import Terms from "./pages/Terms";
import TicketInfo from "./pages/TicketInfo";

function App() {
  return (
    <div>
      <SearchProvider>
        <AuthContextProvider>
          <Routes>
            <Route path="/" element={<Signin />} />
            <Route path="/signup" element={<Signup />} />
            <Route
              path="/account"
              element={
                <ProtectedRoute>
                  <Account />
                </ProtectedRoute>
              }
            />

            <Route
              path="/summary"
              element={
                <ProtectedRoute>
                  <Summary />
                </ProtectedRoute>
              }
            />

            <Route
              path="/ticketinfo/:tId"
              element={
                <ProtectedRoute>
                  <TicketInfo />
                </ProtectedRoute>
              }
            />

            <Route
              path="/terms"
              element={
                <ProtectedRoute>
                  <Terms />
                </ProtectedRoute>
              }
            />
          </Routes>
        </AuthContextProvider>
      </SearchProvider>
    </div>
  );
}

export default App;
