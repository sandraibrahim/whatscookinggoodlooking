import { Navigate } from "react-router-dom";
import { useAuth } from "./auth-provider.js";
import React from 'react';

export const ProtectedRoute = ({ children }) => {
    const auth = useAuth();
    if (!auth.user) {
        // user is not authenticated
        return <Navigate to="/" />;
    }
    return children;
};