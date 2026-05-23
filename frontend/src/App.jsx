
import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from 'react-router-dom'

import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import CreatePost from './pages/CreatePost';

function App() {

  return (
    <BrowserRouter>
      <nav>
        <Link to='/Login'>
          Login
        </Link>

        {'|'}

        <Link to='/Register'>
          Register
        </Link>

        {'|'}

        <Link to='/Dashboard'>
          Dashboard
        </Link>

        {'|'}

        <Link to='/Create'>
          Create post
        </Link>
      </nav>

      <Routes>
        <Route
          element={<Login />}
          path='/Login'
        />

        <Route
          element={<Register />}
          path='/Register'
        />

        <Route
          path='/Dashboard'
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path='/create'
          element={
            <ProtectedRoute>
              <CreatePost />
            </ProtectedRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
};

export default App