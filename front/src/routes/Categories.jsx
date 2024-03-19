import TableCategories from '../components/tableCategories';
import styles from './styles/Categories.module.css'
import {useState, useEffect} from 'react';
import Btn from '../components/Btn';

export default function Categories(){
    const regexText = /^[A-Za-z0-9_]+$/g;
    const [toggle, setToggle] = useState(true);
    const [category, setCategory] = useState('');
    const [tax, setTax] = useState('');
    const [registeredCategories, setRegisteredCategories] = useState([]);
    async function getRegisteredCategories(){
        const res = await fetch('http://localhost/api/categories.php');
        const json  = await res.json();
        setRegisteredCategories(json);
    }
    useEffect(() => {
        getRegisteredCategories();
    }, []);
    useEffect(() => {
        getRegisteredCategories();
    }, [toggle]);

    function handleSubmit(e){
        e.preventDefault();
        let dados = {
            category_name: category,
            category_tax: tax
        }
        
        if(registeredCategories){
            if(registeredCategories.find((c) => c.category_name == category)){
                alert('Já existe uma categoria com este nome.');
            }else if(regexText.test(category) === false){
                alert('Insira um nome sem caracteres especiais.');
            }else{
                fetch('http://localhost/api/insertCategory.php',{
                    method: 'POST',
                    body: JSON.stringify(dados),
                    headers:{"Content-Type": "application/json; charset=UTF-8"}
                })
            }
        }else {
            fetch('http://localhost/api/insertCategory.php',{
            method: 'POST',
            body: JSON.stringify(dados),
            headers:{"Content-Type": "application/json; charset=UTF-8"}
            })
        }
        setCategory('');
        setTax('');
        setToggle(!toggle);
        location.reload();
    }

    return(
        <main>
            <h1>Category Registration</h1>
            <div className={`${styles['container']}`}>
                <div className={`${styles['container-form']}`}>
                    <form onSubmit={handleSubmit}>
                        <div className={`${styles['form-inputs']}`}>
                            <input type="text" placeholder='Category' value={category} required onChange={e => setCategory(e.target.value)}/>

                            <input type="number" placeholder='Tax' value={tax} min='1' required onChange={e => setTax(e.target.value)}/>
                        </div>

                        <div className={`${styles['form-submit']}`}>
                            <Btn valor='Add Category' classe='submit-product' />
                        </div>
                    </form>
                </div>
                <div className={`${styles['container-table']}`}>
                    <div className={`${styles['table']}`}>
                        <TableCategories url='http://localhost/api/selectCategories.php' />
                    </div>
                </div>
            </div>
        </main>
    )
}