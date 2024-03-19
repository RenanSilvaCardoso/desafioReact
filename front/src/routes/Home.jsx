import { useState, useEffect } from 'react'
import styles from './styles/Home.module.css'
// import Button from '../components/button';
import TableHome from '../components/TableHome';


export default function Home(){
    const [data, setData] = useState([]);
    const [taxInput, setTaxInput] = useState('Tax');
    const [priceInput, setPriceInput] = useState('Price');
    const [product, setProduct] = useState('Price');
    const [amount, setAmount] = useState('');
    const [values, setValues] = useState([]);
    const [cart, setCart] = useState([]);
    const [details, setDetails] = useState([]);
    const [products, setProducts] = useState([]);

    async function getCart(){
        const res = await fetch(`http://localhost/api/deleteItem.php`);
        const json = await res.json();
        setCart(json);
    }
    async function getProductsBD(){
        const res = await fetch('http://localhost/api/getProductsBD.php');
        const json = await res.json();
        setProducts(json);
    }

    async function getDetails(){
        const res = await fetch('http://localhost/api/getDetails.php');
        const json = await res.json();
        setDetails(json);
    } 
    
    async function getProducts(){
        const res = await fetch('http://localhost/api/selectProductsHome.php');
        const json = await res.json();
        setData(json);
    }

    async function getPriceAndTax(){
        const res = await fetch('http://localhost/api/getPriceAndTax.php');
        const json = await res.json();
        setValues(json);
        values.forEach((el) => {
            if(el.code == product){
                setPriceInput(el.price);
                setTaxInput(el.tax_category);
            }
        })
    }
        
    useEffect(() => {
        getProducts();
        getPriceAndTax();
        getCart();
        getDetails();
        getProductsBD();
    }, []);
    
    useEffect(()=> {
        getPriceAndTax();
        getDetails();
        getCart();
    },[product]);
    
    useEffect(()=> {
        getDetails();
    },[cart]);

    function submitProduct(e){
        e.preventDefault();

        let total = (Number(priceInput) * Number(amount)) + ((Number(priceInput) * Number(amount)) * (Number(taxInput)/100));
        let dados = {
            product_code: product,
            product_amount: amount,
            product_price: priceInput,
            product_tax: taxInput,
            total: total
        }
        if(cart){
            if(cart.find((c) => c.product_code == product)){
                alert('Este produto já está no seu carrinho.');
            }else{
                if(products.find((p) => p.amount < amount)){
                    alert('Quantidade maior que a disponível');
                } else{
                    fetch('http://localhost/api/insertCart.php', {
                        method: "POST",
                        body: JSON.stringify(dados),
                        headers: {"Content-Type": "application/json; charset=UTF-8"}
                })
                }
            }
        }else{
            fetch('http://localhost/api/insertCart.php', {
                method: "POST",
                body: JSON.stringify(dados),
                headers: {"Content-Type": "application/json; charset=UTF-8"}
            })
        }
        location.reload();
    }
    

    function handleCancel(e){
        e.preventDefault();
        fetch('http://localhost/api/deleteCart.php');
        location.reload();
    }

    function postOrders(){
        fetch('http://localhost/api/postOrders.php');
    }

    function postOrderItem(){
        fetch('http://localhost/api/postOrderItem.php');
    }

    function handleFinish(e){
        e.preventDefault();
        postOrders();
        postOrderItem();
        fetch('http://localhost/api/putProducts.php');
        fetch('http://localhost/api/deleteCart.php');
        location.reload();
    }

    return(
        <main>
            <h1>Shopping Cart</h1>
            <div className={`${styles['container']}`}>
                <div className={`${styles['container-form']}`}>
                <form onSubmit={submitProduct}>
                        <div className={`${styles['form-select']}`}>
                            <select defaultValue={'DEFAULT'} onChange={e => setProduct(e.target.value)}>

                                <option value="DEFAULT" disabled>Product</option>
                                {data.map((product) => (
                                    <option key={product.code} value={product.code}>{product.product_name}</option>
                                ))}

                            </select>
                        </div>
                        <div className={`${styles['form-inputs']}`}>
                            <input type="number" placeholder='Amount' value={amount} onChange={e => setAmount(e.target.value)} min='1' required/>

                            <input type="text" value={taxInput} disabled/>

                            <input type="text" value={priceInput} disabled/>
                        </div>
                        <div className={`${styles['form-submit']}`}>
                            <input type="submit" value="Add Product" />
                        </div>
                    </form>
                </div>
                <div className={`${styles['container-table']}`}>
                    <form action="">
                        <div className={`${styles['table']}`}>
                            <TableHome url='http://localhost/api/getCart.php' />
                        </div>
                        <div className={`${styles['table-details']}`}>
                            <div className={`${styles['table-inputs']}`}>
                                <label htmlFor="tax">Tax:</label>
                                <input id='tax' type="text" placeholder='0%' value={details[0]?.tax ? details[0].tax + '%' : '0.00%' } disabled/>
                            </div>
                            <div className={`${styles['table-inputs']}`}>
                                <label htmlFor="total">Total:</label>
                                <input id='total' type="text" placeholder='$0.00' value={details[0]?.total ? details[0].total + '%'  : '0.00%'} disabled/> 
                            </div>
                        </div>
                        <div className={`${styles['table-submits']}`}>
                            <input className={`${styles['submit-cancel']}`} type="submit" value='Cancel' onClick={handleCancel} />
                            <input className={`${styles['submit-finish']}`} type="submit" value='Finish' onClick={handleFinish} />
                        </div>
                    </form>
                </div>
                {/* <Button /> */}
            </div>
        </main>
    )
}