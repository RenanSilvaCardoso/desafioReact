import { Link } from "react-router-dom"
import styles from './styles/Navbar.module.css'

export default function Navbar(){
    return(
        <nav className={`${styles['nav']}`}>
            <div className={`${styles['container']}`}>
                <div className={`${styles['nav_logo']}`}><Link to='/'>Suite Store</Link></div>
                <div className={`${styles['nav_links']}`}>
                    <Link to="/">Home</Link>
                    <Link to="/products">Products</Link>
                    <Link to="/categories">Categories</Link>
                    <Link to="/history">History</Link>
                </div>
            </div>
        </nav>
    )
}