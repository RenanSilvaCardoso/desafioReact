import styles from './styles/TableProducts.module.css';
import { useState ,useEffect } from "react";

export function TableProducts(props){
    const [data, setData] = useState([]);
    
    async function getProducts(){
        const res = await fetch(`${props.url}`);
        const json = await res.json();
        setData(json);
    }
    useEffect(() => {
        getProducts();
    }, [])
    return(
        <table className={styles.table}>
            <thead>
                <tr>
                    <th>Code</th>
                    <th>Product</th>
                    <th>Amount</th>
                    <th>Price</th>
                    <th>Category</th>
                </tr>
            </thead>
            <tbody>
                {data.map((product) => (
                    <tr key={product.code}>
                        <td>{product.code}</td>
                        <td>{product.product_name}</td>
                        <td>{product.amount}</td>
                        <td>{product.price}</td>
                        <td>{product.category_name}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}