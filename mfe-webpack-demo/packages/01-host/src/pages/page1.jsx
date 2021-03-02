import React from "react";

const Dialog = React.lazy(() => import("app_two/Dialog"));

const Page1 = () => {
    return (
        <div>
            <h1>Page 1</h1>
            <React.Suspense fallback="Loading Material UI Dialog...">
                <Dialog />
            </React.Suspense>
        </div>
    );
}

export default Page1;
