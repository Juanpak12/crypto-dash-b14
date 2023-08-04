import '../styles/Footer.css';
import Header from './Header';


const Footer = () => {
    return (
        <div className="Footer">
            <div className="footer-down">
                <p>Developed by</p>
                <div>
                    <a href='https://github.com/Juanpak12' target="_blank">
                    <img className='logo-footer' src="./img/LOGO copia.png" alt="Juan Pablo Developer" />
                    </a>
                </div>
            </div>
        </div>
    );
}
export default Footer;