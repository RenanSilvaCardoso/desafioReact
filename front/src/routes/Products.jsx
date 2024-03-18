import { useState, useEffect } from 'react'
import styles from './styles/Products.module.css'

export default function Products(){
    const regexText = /^[A-Za-z0-9_]+$/g;
    const [toggle, setToggle] = useState(true);
    const [categories, setCategories] = useState([]);
    const [product, setProduct] = useState('');
    const [amount, setAmount] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [data, setData] = useState([]);
    const [registeredProducts, setRegisteredProducts] = useState([]);

    async function getRegisteredProducts(){
        const res = await fetch('http://localhost/api/products.php');
        const json = await res.json();
        setRegisteredProducts(json);
    }
    
    async function getCategories(){
        const res = await fetch('http://localhost/api/selectCategories.php');
        const json = await res.json();
        setCategories(json);
    }

    async function getProducts(){
        const res = await fetch('http://localhost/api/selectProducts.php');
        const json = await res.json();
        setData(json);
    }
    useEffect(() => {
        getCategories();
        getProducts();
        getRegisteredProducts();
    }, []);
    useEffect(() => {
        getProducts();
        getCategories();
        getRegisteredProducts();
    }, [toggle]);
    
    function handleSubmit(e){
        e.preventDefault();
        let dados = {
            product_name: product,
            product_amount: amount,
            product_price: price,
            product_category: category,
        }
        if(registeredProducts){
            if(registeredProducts.find((p) => p.product_name == product)){
                alert('Um produto com o mesmo nome já foi cadastrado.');
            }else if(regexText.test(product) === false){
                alert('Insira um nome sem caracteres especiais.');
            }else{
                fetch('http://localhost/api/insertProduct.php',  {
                    method: 'POST',
                    body: JSON.stringify(dados),
                    headers: {"Content-Type": "application/json; charset=UTF-8"}
                })
            }
        } else{
            fetch('http://localhost/api/insertProduct.php',  {
                method: 'POST',
                body: JSON.stringify(dados),
                headers: {"Content-Type": "application/json; charset=UTF-8"}
            })
        }
        setProduct('');
        setAmount('');
        setPrice('');
        setCategory('');
        setToggle(!toggle);
        location.reload()
    }

    return(
        <main>
            <h1>Products Registration</h1>
            <div className={`${styles['container']}`}>
                <div className={`${styles['container-form']}`}>
                    <form onSubmit={handleSubmit}>
                        <div className={`${styles['form-product']}`}>
                            <input type="text" value={product} placeholder='Product' onChange={e => setProduct(e.target.value)} required/>
                        </div>
                        <div className={`${styles['form-inputs']}`}>
                            <input type="number" value={amount} placeholder='Amount' min='1' onChange={e => setAmount(e.target.value)} required/>

                            <input type="number" placeholder='Price' value={price} onChange={e => setPrice(e.target.value)} required/>

                            <select defaultValue={'DEFAULT'} className={`${styles['select-category']}`} onChange={e => setCategory(e.target.value)}>
                                <option value="DEFAULT" disabled>Category</option>
                                {categories.map((category) => (
                                    <option key={category.code} value={category.code}>{category.category_name}</option>
                                ))}
                            </select>
                        </div>
                        <div className={`${styles['form-submit']}`}>
                            <input type="submit" value="Add Product" />
                        </div>
                    </form>
                </div>
                <div className={`${styles['container-table']}`}>
                    <div className={`${styles['table']}`}>
                        <table>
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
                    </div>
                </div>
            </div>
        </main>
    )
}