// Layout.js
import React, { useEffect, useRef } from 'react';
import PerfectScrollbar from 'perfect-scrollbar';
import 'perfect-scrollbar/css/perfect-scrollbar.css';

const Scrollbar = ({ children }) => {
    const containerRef = useRef(null);

    useEffect(() => {
        const container = containerRef.current;
        const ps = new PerfectScrollbar(container, {
            // Add any additional options here if needed
        });

        // Clean up Perfect Scrollbar when the component unmounts
        return () => {
            ps.destroy();
        };
    }, []); // Empty dependency array ensures that this effect runs once on mount

    return <div ref={containerRef}>{children}</div>;
};

export default Scrollbar;
