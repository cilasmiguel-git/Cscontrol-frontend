import React from 'react';
import './footer.css'; // Importe seu arquivo de estilos CSS
import { IoIosCar } from 'react-icons/io';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-logo">
        <div className="logo-container">
                <Link to="/"><IoIosCar className="car-icon" />
                    <span className="logo-text">MyCars.com</span>
                </Link>
            </div>
        </div>
        <div className="footer-links">
          <ul>
            <li><a href="/">Página Inicial</a></li>
            <li><a href="/carros">Carros à Venda</a></li>
            <li><a href="/contato">Contato</a></li>
            <li><a href="/sobre">Sobre Nós</a></li>
          </ul>
        </div>
        <div className="footer-contact">
          <p>Entre em contato conosco:</p>
          <p>Telefone: (123) 456-7890</p>
          <p>Email: contato@alugueseucarro.com</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2023 MyCars.com. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;
