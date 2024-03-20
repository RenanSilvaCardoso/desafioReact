import styles from './styles/Btn.module.css'

export default function Btn(props){

    return(
        <input type="submit" value={props.valor} className={`${styles[`${props.classe}`]}`} onClick={props.event}/>
    )
}