import {useState, useEffect} from 'react'
import styles from './styles/TableHistory.module.css'

export default function TableDetails(props){
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
                    <th>Data</th>
                    <th>Items</th>
                    <th>Total</th>
                </tr>
            </thead>
            <tbody>
            {history.map((item, index) => (
                    <tr key={index}> 
                        <td>{item.dt}</td>
                        <td>{item.items}</td>
                        <td>${item.total_oi}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}