import styles from './Footer.module.css';
import Link from 'next/link'

export const Footer = (props)=>{
    let FooterComp = props.comp;
    let routePath = props.path;
    return (
        <span className={styles.footer}>
            <Link href={routePath}>
                <FooterComp style={{cursor:'pointer'}}/>
            </Link>
             
        </span>
    )
}