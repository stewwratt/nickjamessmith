import React from 'react';
import '../styles.css';

const About = () => {
    return (
        <div>
            <section className="section" style={{ paddingTop: 0 }}>
                <div className="container">
                    <div style={{ maxWidth: '700px' }}>
                        <h1 className="heading-gradient">
                            The Mission Behind Know Supplements
                        </h1>
                        <p className="text-xl" style={{ color: '#fff', lineHeight: '1.6', marginBottom: '2rem' }}>
                            I've dedicated my career to understanding how supplements can enhance men's lives,
                            focusing on the often-overlooked aspects of male optimization and wellness.
                        </p>
                    </div>
                </div>
            </section>

            <section className="section">
                <div className="container">
                    <h2 className="section-title">Our Vision</h2>
                    <p className="text-lg" style={{ marginBottom: '2rem' }}>
                        Know Supplements was born from a recognition that men's wellness needs are unique
                        and deserve specialized attention. We're not just creating another supplement line –
                        we're building a foundation for men to achieve their highest potential through
                        scientifically-validated supplementation.
                    </p>
                    <p className="text-lg">
                        By focusing specifically on male optimization, we're addressing a critical gap in the
                        market. Our approach combines cutting-edge research with premium ingredients to support
                        men's physical performance, mental clarity, and overall well-being.
                    </p>
                </div>
            </section>

            <section className="section">
                <div className="container">
                    <h2 className="section-title">The Know Supplements Promise</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem' }}>
                        <div>
                            <h3 style={{ color: 'white', marginBottom: '1rem' }}>Research-Driven</h3>
                            <p>Every formula is backed by peer-reviewed research and clinical studies, ensuring
                                you're getting supplements that actually work.</p>
                        </div>
                        <div>
                            <h3 style={{ color: 'white', marginBottom: '1rem' }}>Male-Focused</h3>
                            <p>Our products are specifically designed for men's biological needs, supporting
                                everything from hormonal balance to cognitive function.</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="section">
                <div className="container">
                    <h2 className="section-title">Join the Movement</h2>
                    <p className="text-lg">
                        We're creating more than just supplements – we're building a community of men
                        committed to optimization and self-improvement. Through Know Supplements, we're
                        providing the tools and knowledge needed to achieve peak performance in every
                        aspect of life.
                    </p>
                </div>
            </section>
        </div>
    );
};

export default About; 