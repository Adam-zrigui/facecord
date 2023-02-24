import { lazy, Suspense } from "react"
import { Navigate, Outlet, Route, Routes } from "react-router-dom"

const App = lazy(() => import("@/components/App"))
const Login = lazy(() => import("@/components/pages/auth/login"))
const Register = lazy(() => import("@/components/pages/auth/register"))
const Loading = lazy(() => import("@/components/pages/Loading"))
const NotFound = lazy(() => import("@/components/pages/404"))

export default function Router() {
const isAuthed = false
const PubRoute = () => !isAuthed ? <Outlet /> : <Navigate to='/' />  
const PrivRoute = () => isAuthed ? <Outlet /> : <Navigate to='/login' /> 

  return (
 <>
 <Suspense fallback={<Loading />} >
  <Routes>
<Route element={<PubRoute />}>
<Route element={<Register />} path='/register' />
<Route element={<Login />} path='/login' />
</Route>
<Route element={<PrivRoute />} >
  <Route path="/" element={<App />} />
</Route>
<Route path="*" element={<NotFound />} />
  </Routes>
 </Suspense>
 </>
  )
}
