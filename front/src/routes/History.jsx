import styles from './styles/History.module.css'
import TableHistory from '../components/TableHistory'
import TableDetails from '../components/TableDetails'

export default function History(){
    
    return(
        <main>
            <h1>History</h1>
            <div className={`${styles['container-table']}`}>
                <div className={`${styles['wrapper-table']}`}>
                    <TableHistory url='http://localhost/api/getHistory.php' />
                </div>
            </div>
            <h1>Purchase Details</h1>
            <div className={`${styles['container-details']}`}>
                <div className={`${styles['details-table']}`}>
                    <TableDetails url='http://localhost/api/getHistory.php' />
                </div>
            </div>
        </main>
    )
}