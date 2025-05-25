import React, { useState } from 'react';
import '../styles.css';

const Home = () => {
    const [email, setEmail] = useState('');
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

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

            const data = await response.json();

            if (response.ok) {
                setToastMessage('Thank you! We\'ll keep you updated about Know Supplements launch.');
                setEmail('');
            } else {
                setToastMessage(data.error || 'Failed to join waitlist. Please try again.');
            }
        } catch (error) {
            setToastMessage('Failed to join waitlist. Please try again.');
        } finally {
            setIsSubmitting(false);
            setShowToast(true);
            setTimeout(() => setShowToast(false), 3000);
        }
    };

    return (
        <div>
            <section className="section" style={{ paddingTop: 0 }}>
                <div className="container">
                    <div style={{ maxWidth: '600px' }}>
                        <h1 className="heading-gradient">
                            Elevate Your Potential
                        </h1>
                        <p className="text-xl" style={{ color: '#fff', marginBottom: '2rem' }}>
                            Join the waitlist for supplements designed specifically for male optimization and peak performance.
                        </p>
                        <form onSubmit={handleSubmit}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                <input
                                    type="email"
                                    placeholder="Enter your email"
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
                                    {isSubmitting ? 'Joining...' : 'Join the Waitlist'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>

            <section className="section">
                <div className="container">
                    <h2 className="section-title">Why Know Supplements</h2>
                    <p className="text-lg" style={{ marginBottom: '2rem' }}>
                        In today's world, male optimization is overlooked. We're changing that by creating supplements
                        that specifically target men's wellness, helping you achieve your peak potential in every aspect of life.
                    </p>
                    <p className="text-lg">
                        Our philosophy is simple: empower men to be better every day through scientifically-backed
                        formulations that enhance physical performance, mental clarity, and overall well-being.
                    </p>
                </div>
            </section>

            <section className="section">
                <div className="container">
                    <h2 className="section-title">Our Commitment</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '3rem' }}>
                        <div>
                            <h3 style={{ color: 'white', marginBottom: '1rem' }}>Science-First Approach</h3>
                            <p>Every ingredient is carefully selected based on peer-reviewed research and proven efficacy.</p>
                        </div>
                        <div>
                            <h3 style={{ color: 'white', marginBottom: '1rem' }}>Male Optimization</h3>
                            <p>Formulated specifically for men's unique biological needs and performance goals.</p>
                        </div>
                        <div>
                            <h3 style={{ color: 'white', marginBottom: '1rem' }}>Complete Transparency</h3>
                            <p>Full disclosure of ingredients, dosages, and the science behind each formulation.</p>
                        </div>
                    </div>
                </div>
            </section>

            {showToast && (
                <div style={{
                    position: 'fixed',
                    bottom: '2rem',
                    right: '2rem',
                    backgroundColor: 'white',
                    color: 'black',
                    padding: '1rem',
                    borderRadius: '4px',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                }}>
                    {toastMessage}
                </div>
            )}
        </div>
    );
};

export default Home; 