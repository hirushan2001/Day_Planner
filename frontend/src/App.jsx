import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider } from "./context/AuthContext";
import AuthWrapper from "./components/AuthWrapper";
import Layout from "./components/Layout";
import DayPlanner from "./components/DayPlanner";
import Analytics from "./components/Analytics";
import Profile from "./components/Profile";
import Login from "./components/Login";
import { Toaster } from "./components/ui/toaster";

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <div className="App min-h-screen transition-colors duration-300">
          <BrowserRouter>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/*" element={
                <AuthWrapper>
                  <Layout>
                    <Routes>
                      <Route path="/" element={<DayPlanner />} />
                      <Route path="/analytics" element={<Analytics />} />
                      <Route path="/profile" element={<Profile />} />
                    </Routes>
                  </Layout>
                </AuthWrapper>
              } />
            </Routes>
          </BrowserRouter>
          <Toaster />
        </div>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;