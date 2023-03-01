import {Routes, Route, Outlet, Navigate} from 'react-router-dom'
import {lazy, Suspense} from 'react'
import useAuthContext from './components/context/authContext'
import Register from '@/components/pages/auth/register'
import Login from './components/pages/auth/login'

function App() {
  const Home = lazy(() => import('@/components/pages/Home'))
  const Notfound = lazy(() => import('@/components/pages/NotFound'))
  const Loading = lazy(() => import('@/components/pages/Loading'))
    const { isAuthenticated }  = useAuthContext() 
    const ProtectedRoutes = () => (isAuthenticated ? <Outlet /> : <Navigate to='/login' />)
    const PublicRoutes = () => (!isAuthenticated ? <Outlet /> : <Navigate to='/' />)
  
  return (
    <>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route element={<PublicRoutes />}>
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />
          </Route>
          <Route element={<ProtectedRoutes />}>
            <Route path='/' element={<Home />} />
          </Route>
          <Route path='*' element={<Notfound />} />
        </Routes>
      </Suspense>
    </>
  )
}
export default App