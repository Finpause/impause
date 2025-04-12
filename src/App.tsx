import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';

// Import page components
import Home from './pages/Home/Home';
import Dashboard from './pages/Dashboard/Dashboard';
import FinanceWrapped from './pages/FinanceWrapped/FinanceWrapped';
import ImpulseBuying from './pages/ImpulseBuying/ImpulseBuying';
import AccountabilityBuddy from './pages/AccountabilityBuddy/AccountabilityBuddy';
import Settings from './pages/Settings/Settings';
import SignIn from './pages/SignIn/SignIn';
import SignUp from './pages/SignUp/SignUp';


const App: React.FC = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<Home />} />

      {/* App routes */}
      <Route
        path="/dashboard"
        element={
          <Layout><Dashboard /></Layout>
        }
      />
      <Route
        path="/finance-wrapped"
        element={
          <Layout><FinanceWrapped /></Layout>
        }
      />
      <Route
        path="/impulse-buying"
        element={
          <Layout><ImpulseBuying /></Layout>
        }
      />
      <Route
        path="/accountability-buddy"
        element={
          <Layout><AccountabilityBuddy /></Layout>
        }
      />
      <Route
        path="/settings"
        element={
          <Layout><Settings /></Layout>
        }
      />

      <Route
        path="/signin"
        element={
          <Layout><SignIn /></Layout>
        }
      />

      <Route
        path="/signup"
        element={
          <Layout><SignUp /></Layout>
        }
      />
    </Routes>
  );
};

export default App;
