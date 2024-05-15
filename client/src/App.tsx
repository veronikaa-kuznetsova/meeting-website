import { Routes, Route } from 'react-router-dom'
import EditUserPage from './components/pages/EditUserPage'
import AppLoader from './components/ui/hooks/appLoader'
import Layout from './components/ui/Layout'
import UserPage from './components/pages/UserPage'
import Main from './layouts/Main'
import Login from './layouts/Login'
import User from './layouts/User'
import UsersList from './components/ui/UsersList'

function App() {
  return (
    <AppLoader>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Main />} />
          <Route path='user' element={<User />} />
          <Route path='user/:userId' element={<UserPage />} />
          <Route path='user/:userId/edit' element={<EditUserPage />} />
          <Route path='users/search' element={<UsersList />} />
          <Route path='login' element={<Login />} />
          <Route path='*' element={<Main />} />
        </Route>
      </Routes>
    </AppLoader>
  )
}

export default App
