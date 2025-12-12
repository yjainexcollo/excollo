"use client";

import React from "react";
import { Box, Typography, Button } from "@mui/material";

export class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        console.error("ErrorBoundary catch:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <Box sx={{ p: 4, textAlign: "center" }}>
                    <Typography variant="h6" color="error">
                        Something went wrong in this section.
                    </Typography>
                    <Button
                        onClick={() => this.setState({ hasError: false })}
                        variant="outlined"
                        sx={{ mt: 2 }}
                    >
                        Try Again
                    </Button>
                </Box>
            );
        }

        return this.props.children;
    }
}
