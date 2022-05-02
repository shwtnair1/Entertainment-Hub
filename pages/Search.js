import {
  createMuiTheme,
  Tab,
  Tabs,
  TextField,
  ThemeProvider,
} from "@material-ui/core";
import Pagination from '@material-ui/lab/Pagination';
import SingleContent from "../components/SingleContent/SingleContent";

import axios from "axios";
import { useState } from 'react'
import styles from './Search.module.css'
import { Footer } from '../components/Footer/Footer'
import {TrendingFooter} from '../components/TrendingFooter'

const darkTheme = createMuiTheme({
  palette: {
    type: "dark",
    primary: {
      main: "#fff",
    },
  },
});

const Search = () => {
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState('');
  const [type, setType] = useState(1);
  const [content, setContent] = useState(null);

  function debounce(fn,delay){
    let timer;
    return function(...args){
      clearTimeout(timer);
      timer = setTimeout(()=>{fn.apply(this,args)},delay);
    }
  }
  const handleChange = (e, value) => {
    setPage(value);
  };

  
  const fetchSearch = (text) => {
    setSearchText(text)
    async function fetchdata(){
      let res = await axios.get(`https://api.themoviedb.org/3/search/${type == 1 ? "movie" : "tv"}?api_key=b34aaaf0238f2468c2fe4a496791ab0d&language=en-US&query=${text}&page=${page}&include_adult=false`)
      setContent(res.data.results)
    }
    text ? fetchdata() : setContent([]);
  }

  const handleSearch = debounce(fetchSearch,500);
  

  return (<div className={styles.searchContainer}>
    <ThemeProvider theme={darkTheme}>
      <div className={styles.search}>
        <TextField
          style={{ flex: 1 }}
          label="Search"
          variant="filled"
          id="filled-basic"
          onChange={(e)=>handleSearch(e.target.value)}
        />
      </div>
      <Tabs
        value={type}
        indicatorColor="primary"
        textColor="primary"
        onChange={(event, newValue) => {
          setType(newValue);
          setPage(1);
        }}
        style={{ paddingBottom: 5, margin: '10px 50px' }}
        aria-label="disabled tabs example"
      >
        <Tab style={{ width: "50%" }} label="Search Movies" value={1} />
        <Tab style={{ width: "50%" }} label="Search TV Series" value={2} />
      </Tabs>
    </ThemeProvider>
    <div className={styles.listContent}>
      {content &&
        content.map((c) => (
          <SingleContent
            key={c.id}
            id={c.id}
            poster={c.poster_path}
            title={c.title || c.name}
            overview={c.overview}
            date={c.first_air_date || c.release_date}
            media_type={type ? "tv" : "movie"}
            vote_average={c.vote_average}
          />
        ))}
      {searchText &&
        (!content || content.length == 0) &&
        (type ? <h2 className={styles.emptyContainer}>No Series Found</h2> : <h2 className={styles.emptyContainer}>No Movies Found</h2>)}
    </div>
    {content && content.total_pages > 1 && (
      <Pagination count={content.total_pages} color="primary" onChange={handleChange} />
    )}
    
    <Footer comp={TrendingFooter} path='/'/>

  </div>

  )
}

export default Search;