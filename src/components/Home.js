import React, { useState } from 'react';
import '../styles.css';

const Home = () => {
    const [email, setEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const response = await fetch('https://email-capture-worker.nicholasjamessmith22.workers.dev/subscribe', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            if (response.ok) {
                setEmail('');
                setShowModal(true);
                setTimeout(() => {
                    setShowModal(false);
                }, 2000);
            }
        } catch (error) {
            // Silently fail - keeping it minimal
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="landing-page">
            {/* Header */}
            <header className="site-header">
                <div className="container">
                    <div className="header-content">
                        <div className="logo">Know Supplements</div>
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <section className="hero-section">
                <div className="container">
                    <div className="hero-content">
                        <h1 className="heading-gradient">
                            Elevate Your Potential Through Purposeful Supplementation
                        </h1>
                        <p className="text-xl" style={{ color: '#fff', marginBottom: '3rem' }}>
                            Premium supplements designed for men who demand more from life.
                            No hype. No compromise. Just clarity in every capsule.
                        </p>
                        <form onSubmit={handleSubmit} className="waitlist-form">
                            <div className="form-group">
                                <input
                                    type="email"
                                    placeholder="Enter email"
                                    className="form-input"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                                <button
                                    type="submit"
                                    className="button"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? (
                                        <span className="loader"></span>
                                    ) : (
                                        '→'
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>

            {/* Products Preview Section */}
            <section className="section">
                <div className="container">
                    <div className="products-grid">
                        <div className="product-card">
                            <h3>PRIME</h3>
                            <p className="product-tagline">Daily Vitality Optimizer</p>
                            <p className="product-description">
                                Enhance energy, performance, and drive. Your foundation for peak male vitality,
                                backed by science and powered by nature.
                            </p>
                        </div>
                        <div className="product-card">
                            <h3>FOCUS</h3>
                            <p className="product-tagline">Mental Clarity Complex</p>
                            <p className="product-description">
                                Sharpen your edge. A precise blend for enhanced cognitive function,
                                mental clarity, and sustained focus without the crash.
                            </p>
                        </div>
                        <div className="product-card">
                            <h3>BALANCE</h3>
                            <p className="product-tagline">Hormonal Harmony Formula</p>
                            <p className="product-description">
                                Optimize your foundation. Support healthy hormone levels and stress response
                                for improved recovery, mood, and overall wellbeing.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Mission Section */}
            <section className="section">
                <div className="container">
                    <h2 className="section-title">The Know Difference</h2>
                    <div className="values-grid">
                        <div className="value-card">
                            <h3>Scientific Precision</h3>
                            <p>Every ingredient selected and dosed based on peer-reviewed research.
                                No fillers, no compromises.</p>
                        </div>
                        <div className="value-card">
                            <h3>Male-Focused Formulation</h3>
                            <p>Specifically designed for men's biological needs and performance goals.
                                Targeted solutions for real results.</p>
                        </div>
                        <div className="value-card">
                            <h3>Quality Guarantee</h3>
                            <p>Premium ingredients, third-party tested, and manufactured in the USA.
                                Transparency in every bottle.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Trust Section */}
            <section className="section" style={{ borderBottom: 'none', paddingBottom: '60px' }}>
                <div className="container">
                    <div className="trust-content">
                        <h2 className="section-title">Our Promise</h2>
                        <p className="text-lg" style={{ maxWidth: '700px', margin: '0 auto', textAlign: 'center' }}>
                            We believe in the power of intentional supplementation. Every product we create
                            is born from a commitment to enhance men's lives through clean, effective formulations.
                            No marketing hype, just results you can trust.
                        </p>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="site-footer">
                <div className="container">
                    <div className="footer-content">
                        <div className="footer-row">
                            <div className="footer-left">
                                <p>© 2024 Know Supplements</p>
                            </div>
                            <div className="footer-center">
                                <a href="https://instagram.com/niccksmith" target="_blank" rel="noopener noreferrer" className="social-link">
                                    Instagram
                                </a>
                            </div>
                            <div className="footer-right">
                                <p className="built-by">Built by Josh Luke Stewart</p>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>

            {/* Success Modal */}
            {showModal && (
                <div className="modal-overlay">
                    <div className="modal">
                        <div className="modal-checkmark">
                            <svg className="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                                <circle className="checkmark-circle" cx="26" cy="26" r="25" fill="none" />
                                <path className="checkmark-check" fill="none" d="M14 28L24 38L38 15" />
                            </svg>
                        </div>
                        <p>You're on the list</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Home; 