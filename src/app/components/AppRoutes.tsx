import React from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import LoginContainer from './LoginContainer'
import { Home } from '../../home'
import NotFound from './NotFound'
import LogoutContainer from './LogoutContainer'
import { LocalStorage } from '../../common'
import { CheckupCategoryContainer } from '../../checkup_category'
import { RoutesType } from '../types/routes.data.types'

const AppRoutes = (): React.ReactElement => {
  return (
    <Routes>
      {publicRoutes.map((publicRoute) => (
        <Route key={publicRoute.path} path={publicRoute.path} element={publicRoute.element} />
      ))}
      {protectedRoutes.map((protectedRoute) => (
        <Route key={protectedRoute.path} path={protectedRoute.path} element={getElement(protectedRoute.element)}>
          {protectedRoute.subroutes &&
            protectedRoute.subroutes.map((subroute) => (
              <Route key={subroute.path} path={subroute.path} element={getElement(subroute.element)} />
            ))}
        </Route>
      ))}
      {protectedRoutes.map(
        (protectedRoute) =>
          protectedRoute.submenus &&
          protectedRoute.submenus.map((submenu) => (
            <Route key={submenu.path} path={submenu.path} element={getElement(submenu.element)}>
              {submenu.subroutes &&
                submenu.subroutes.map((subroute) => (
                  <Route key={subroute.path} path={subroute.path} element={getElement(subroute.element)} />
                ))}
            </Route>
          )),
      )}
    </Routes>
  )
}

const getElement = (children: React.ReactElement | undefined) => children && <RequireAuth>{children}</RequireAuth>

function RequireAuth({ children }: { children: React.ReactElement }) {
  const location = useLocation()
  const isLoggedIn = LocalStorage.getItem('token') as string
  return isLoggedIn?.length ? children : <Navigate to="/" replace state={{ redirect: location.pathname }} />
}

const publicRoutes: RoutesType[] = [
  {
    path: '*',
    element: <NotFound />,
  },
  {
    path: '/',
    element: <LoginContainer />,
  },
  {
    path: '/logout',
    element: <LogoutContainer />,
  },
]

export const protectedRoutes: RoutesType[] = [
  {
    path: '/home',
    display: 'Home',
    element: <Home />,
  },
  {
    path: '/checkup_category',
    display: 'Checkup Category',
    element: <CheckupCategoryContainer />,
  },
]

export default AppRoutes
