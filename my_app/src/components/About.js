import React from 'react';
import { motion } from 'framer-motion';
import chefImage from '../images/your-chef-image.jpg';
import Reservations from './Reservations';
import Footer from './Footer';

export default function About() {
    return (
        <section className="about" id="about">
            <div className="container">

                {/* Image */}
                <motion.div
                    className="image-container"
                    initial={{ opacity: 0, x: -100 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <img src={chefImage} alt="Chef preparing food" />
                </motion.div>

                {/* Content */}
                <motion.div
                    className="content-container"
                    initial={{ opacity: 0, x: 100 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    {/* ===== Title ===== */}
                    <div className="title-wrapper">
                        <span className="title-line first"></span>
                        <h2 className="section-title">О нас</h2>
                        <span className="title-line"></span>
                    </div>

                    <h3 className="main-heading">
                        Испытайте кулинарное мастерство
                    </h3>

                    <p className="description">
                        Погрузитесь в мир армянской кухни и роскоши в нашем ресторане,
                        где каждое блюдо приготовлено с любовью и точностью.
                    </p>

                    {/* <a href="#" className="btn-learn-more">
                        Галерея
                    </a> */}
                </motion.div>

            </div>

            {/* Reservations section */}
            <Reservations />
            <Footer/>
        </section>
    );
}
