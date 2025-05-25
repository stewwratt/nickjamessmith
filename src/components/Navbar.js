import React from 'react';
import { Link } from 'react-router-dom';
import '../styles.css';

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-content">
                <div className="nav-brand">
                    Nick James Smith
                </div>
                <div className="nav-links">
                    <Link to="/" className="nav-link">
                        Home
                    </Link>
                    <Link to="/about" className="nav-link">
                        About
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar; 