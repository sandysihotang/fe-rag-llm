import React from 'react';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { HomePage } from './component/HomePage';
import { ChatGroup } from './component/Dashboard';
import { Login } from './component/Login';
import { Register } from './component/Register';
import { ProtectedRoute, UseAuth } from './router/Auth';
import { FileProcess } from './component/group/File';
import { Chat } from './component/group/Chat';

const App = () => {
  const { auth } = UseAuth()
  return (
    <Router>
      <Routes>
        <Route path="/" element={auth ? <Navigate to='/dashboard' /> : <HomePage />} />
        <Route path="/login" element={auth ? <Navigate to='/dashboard' /> : <Login />} />
        <Route path="/Register" element={auth ? <Navigate to='/dashboard' /> : <Register />} />
        <Route
          path='/dashboard'
          element={<ProtectedRoute>
            <ChatGroup />
          </ProtectedRoute>}>
          <Route index element={<FileProcess />} />
          <Route path='chat' element={<Chat />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
