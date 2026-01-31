import React from "react";
import {
    FaPhoneAlt,
    FaEnvelope,
    FaWhatsapp,
    FaTelegramPlane,
    FaVk
} from "react-icons/fa";

export default function Footer() {
    return (
        <footer className="footer" id="contact">
            <div className="footer__container">

                {/* Бренд */}
                <div className="footer__brand">
                    <h3>Ресторан «Армения»</h3>
                    <p>
                        Изысканная кухня, уютная атмосфера и высокий уровень сервиса.
                        Мы создаём вкусные эмоции для каждого гостя.
                    </p>
                </div>

                {/* Контакты */}
                <div className="footer__contacts">
                    <h4>Контакты</h4>

                    <a href="tel:+73496329977" className="footer__contact">
                        <FaPhoneAlt />
                        <span>+7 349 632 99 77</span>
                    </a>

                    <a href="tel:+79220591111" className="footer__contact">
                        <FaPhoneAlt />
                        <span>+7 922 059 11 11</span>
                    </a>

                    <a href="tel:+79220530303" className="footer__contact">
                        <FaPhoneAlt />
                        <span>+7 922 053 03 03</span>
                    </a>

                    <a href="tel:+79028242200" className="footer__contact">
                        <FaPhoneAlt />
                        <span>+7 902 824 22 00</span>
                    </a>

                    <a href="tel:+73496432200" className="footer__contact">
                        <FaPhoneAlt />
                        <span>+7 349 643 22 00</span>
                    </a>

                    <a href="mailto:mailyan08@mail.ru" className="footer__contact">
                        <FaEnvelope />
                        <span>mailyan08@mail.ru</span>
                    </a>
                </div>

                {/* Социальные сети */}
                <div className="footer__socials">
                    <h4>Мы в социальных сетях</h4>

                    <div className="footer__icons">
                        <a
                            href="https://t.me/armenya_89"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Telegram"
                        >
                            <FaTelegramPlane />
                        </a>

                        <a
                            href="https://vk.ru/dvor.arm89"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="ВКонтакте"
                        >
                            <FaVk />
                        </a>

                  

                        <a
                            href="https://wa.me/79220591111"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="WhatsApp"
                        >
                            <FaWhatsapp />
                        </a>

                     
                    </div>
                </div>

            </div>

            <div className="footer__bottom">
                © {new Date().getFullYear()} Ресторан «Армения». Все права защищены.
            </div>
        </footer>
    );
}
