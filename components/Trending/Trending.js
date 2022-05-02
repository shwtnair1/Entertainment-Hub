
import styles from './Trending.module.css';
import {useEffect,useState} from 'react';
import axios from 'axios';
import Pagination from '@material-ui/lab/Pagination';

export const Trending =  ()=>{
    const [trending,setTrending] = useState([]);
    const [page,setPage] = useState(1);
    useEffect(()=>{
        const fetchData = async()=>{
            let res =  await axios.get(`https://api.themoviedb.org/3/trending/all/day?api_key=b34aaaf0238f2468c2fe4a496791ab0d&page=${page}`);
             setTrending(res.data.results) 
        }

        fetchData();
    },[page])

    const handleChange = (e,value)=>{
        setPage(value)
    }
    return (
        <div className={styles.pageContainer}>
            <span className={styles.pageTitle}>Trending Today</span>
            {trending.length>0 && trending.map((data)=>{
                    return (
                    <div className={styles.listContainer} key={data.id}>
                        <div className={styles.titelContainer}>
                            <h2>{data.title || data.name}</h2>
                            <span>&#9733;{data.vote_average}</span>
                        </div>
                        <p>{data.overview}</p>
                    </div>
                    )
                })}
            <div className={styles.paginationContainer}>
                <Pagination count={10} color="primary" onChange={handleChange}/>
            </div>
        </div>
    )
}