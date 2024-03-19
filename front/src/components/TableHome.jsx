import './styles/TableHome.module.css';
import { useState, useEffect } from 'react'

export default function TableHome(props){
    const [data, setData] = useState([]);
    
    async function getCart(){
        const res = await fetch(`${props.url}`);
        const json = await res.json();
        setData(json);
    }
    useEffect(() => {
        getCart();
    }, []);

    function handleDelete(e){
        e.preventDefault();
        let productName = e.target.id;
        console.log(productName);
        fetch('http://localhost/api/deleteItem.php', {
            method: "POST",
            body: JSON.stringify(productName),
            headers: {"Content-Type": "application/json; charset=UTF-8"}
        })
        location.reload();
    }
    return(
        <table>
            <thead>
                <tr>
                    <th>Product</th>
                    <th>Price</th>
                    <th>Amount</th>
                    <th>Total</th>
                </tr>
            </thead>
            <tbody>
                {data.map((item) => (
                    <tr key={item.code}>
                        <td>{item.product_name}</td>
                        <td>{item.price}</td>
                        <td>{item.amount}</td>
                        <td>{item.total}</td>
                        <td><button id={item.product_name}onClick={handleDelete}>Delete</button></td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}