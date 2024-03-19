import styles from './styles/TableHistory.module.css'
import {useState, useEffect} from 'react'

export default function TableHistory(props){
    const [history, setHistory] = useState([]);

    async function getHistory(){
        const res = await fetch(`${props.url}`);
        const json = await res.json();
        setHistory(json);
    }
    
    useEffect(() => {
        getHistory();
    }, [])
    return(
        <table className={styles.table}>
            <thead>
                <tr>
                    <th>Code</th>
                    <th>Tax</th>
                    <th>Total</th>
                </tr>
            </thead>
            <tbody>
                {history.map((item, index) => (
                    <tr key={index}> 
                        <td>{item.code}</td>
                        <td>{item.tax}%</td>
                        <td>${item.total}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}