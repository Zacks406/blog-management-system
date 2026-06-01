
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
import EditPost from './pages/EditPost';

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

        {/* <Link to='/:id'>
          EditPost
        </Link> */}
      </nav>

      <Routes>
        {/*  <Route
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

        <Route
          path='/EditPost/:id'
          element={<EditPost />}
        /> */}

        <Route path='/Login' element={<Login />} />
        <Route path='/Register' element={<Register />} />

        <Route element={<ProtectedRoute />}>
          <Route path='/Dashboard' element={<Dashboard />} />
          <Route path='/create' element={<CreatePost />} />
          <Route path='/EditPost/:id' element={<EditPost />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App