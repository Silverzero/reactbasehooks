import React, { lazy }   from 'react'
import { Switch, Route } from 'react-router-dom'

const HomePage     = lazy(() => import('routes/HomePage'));
const LoginPage    = lazy(() => import('routes/LoginPage'));
const RegisterPage = lazy(() => import('routes/RegisterPage'));
const NotFoundPage = lazy(() => import('routes/NotFoundPage'));
const LoadingPage  = lazy(() => import('routes/LoadingPage'));


export const AdminRoutes = () => {
    return(
        <Switch>
            <Route component={HomePage}     path={["/home","/"]} exact/>
            <Route component={NotFoundPage} path="/:others?"   />
        </Switch>
    )
}

export const UserRoutes = () => {
    return(
        <Switch>
            <Route component={HomePage}     path={["/home","/"]} exact/>
            <Route component={NotFoundPage} path="/:others?"   />
        </Switch>
    )
}

export const NoSessionRoutes = () => {
    return(
        <Switch>
            <Route component={LoginPage}    path="/login"    exact/>
            <Route component={RegisterPage} path="/register" exact/>
            <Route component={NotFoundPage} path="/:others?"   />
        </Switch>
    )
}