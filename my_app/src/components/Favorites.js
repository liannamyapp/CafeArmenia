import React, { useContext } from 'react';
import ribeye from '../images/ribeye.JPG';
import risotto from '../images/risotto.JPG';
import caprese from '../images/caprese.JPG';
import fondant from '../images/fondant.JPG';
import Modal from './Modal';
import Menu from './Menu';
import { AuthContext } from '../context/AuthContext';


const menuItems = [
    { id: 1, title: "Стейк Рибай на гриле", img: ribeye },
    { id: 2, title: "Ризотто с морепродуктами", img: risotto },
    { id: 3, title: "Салат Капрезе", img: caprese },
    { id: 4, title: "Шоколадный фондан", img: fondant },
];

export default function Favorites() {
    const { isMenuOpen, setIsMenuOpen } = useContext(AuthContext);

    return (
        <section className="favorites" >
            <div className="favorites__container">
                <div className="favorites__header">
                    <div className="favorites__feature">
                        <h3>Свежие ингредиенты</h3>
                        <p>Попробуйте лучшее, что предлагает наше меню</p>
                    </div>
                    <div className="favorites__title">
                        <h2>Любимые блюда гостей</h2>
                        <p>Попробуйте лучшее из нашего меню</p>
                    </div>
                    <div className="favorites__feature">
                        <h3>Уютная атмосфера</h3>
                        <p>Ощутите совершенство в каждом блюде</p>
                    </div>
                </div>

                <div className="favorites__grid" >
                    {menuItems.map(item => (
                        <div key={item.id} className="food-card">
                            <div className="food-card__image">
                                <img src={item.img} alt={item.title} />
                            </div>
                            <div className="food-card__info" >
                                <h4>{item.title}</h4>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="favorites__actions" id="menu" >
                    <button  className="view-menu-btn" onClick={() => setIsMenuOpen(prev => !prev)}>
                        Посмотреть полное меню
                    </button>
                </div>

                <Modal isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)}>
                    <Menu />
                </Modal>
            </div>
           
        </section>
    );
}
