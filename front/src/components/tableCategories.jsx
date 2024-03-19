import styles from './styles/TableCategories.module.css';
import { useEffect, useState } from "react"

export default function TableCategories(props){
    const [data, setData] = useState([]);
    async function getCategories(){
        const res = await fetch(`${props.url}`);
        const json = await res.json();
        setData(json);
    }
    useEffect(() => {
        getCategories();
    }, [])
    return(
        <table className={styles.table}>
            <thead>
                <tr>
                    <th>Code</th>
                    <th>Category</th>
                    <th>Tax</th>
                </tr>
            </thead>
            <tbody>
                {data.map((category) => (
                    <tr key={category.code}>
                        <td>{category.code}</td>
                        <td>{category.category_name}</td>
                        <td>{category.tax}%</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}