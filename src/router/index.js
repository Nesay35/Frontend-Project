import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import UserLayout from '../layouts/user-layout';
import HomePage from '../pages/HomePage';
import CoursesPage from '../pages/courses-page';
import EventsPage from '../pages/events-page';
import AboutPage from '../pages/about-page';
import ContactPage from '../pages/contact-page';
import LoginPage from '../pages/login-page';
import DashboardPage from '../pages/dashboard/dashboard-page';
import AdminManagementPage from '../pages/dashboard/admin-management-page';
import PrivateRoute from './private-route';
import { config } from '../helpers/config';
import UnauthorizedPage from '../pages/unauthorizedPage';


const router = createBrowserRouter([
    {
        path: `/`,
        element: <UserLayout/>,
        children: [
            {
                index: true,
                element: <HomePage/>,
            },
            {
                path: "courses",
                element:<CoursesPage/>
            },
            {
                path: "events",
                element:<EventsPage/>
            },
            {
                path: "about",
                element:<AboutPage/>
            },
            {
                path: "contact",
                element:<ContactPage/>
            },
            
            {
                path: "login",
                element:<LoginPage/>
            },
            {
                path: "unauthorized",
                element:<UnauthorizedPage/>
            },
            {
                path: "dashboard",
                children: [
                    {
                        index: true,
                        element: <PrivateRoute roles={config.pageRoles.dashboard}><DashboardPage/></PrivateRoute>
                    },
                    {
                        path:"admin-management",
                        element: <PrivateRoute roles={config.pageRoles.adminManagement}><AdminManagementPage/></PrivateRoute>
                    }
                ]
            }

        ],
    },
]);


const AppRouter = () => {
  return <RouterProvider router={router} />;

};

export default AppRouter;
