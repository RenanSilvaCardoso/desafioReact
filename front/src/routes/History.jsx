import { useEffect, useState } from 'react'
import styles from './styles/History.module.css'

export default function History(){
    const [history, setHistory] = useState([]);

    async function getHistory(){
        const res = await fetch('http://localhost/api/getHistory.php');
        const json = await res.json();
        setHistory(json);
    }
    
    useEffect(() => {
        getHistory();
    }, [])
    return(
        <main>
            <h1>History</h1>
            <div className={`${styles['container-table']}`}>
                <div className={`${styles['wrapper-table']}`}>
                    <table>
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
                </div>
            </div>
            <h1>Purchase Details</h1>
            <div className={`${styles['container-details']}`}>
                <div className={`${styles['details-table']}`}>
                    <table>
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
                </div>
            </div>
        </main>
    )
}