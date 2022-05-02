import React from 'react';
import {Header} from '../components/Header/Header'
import {Footer} from '../components/Footer/Footer'
import {Trending} from '../components/Trending/Trending';
import SearchIcon from '@mui/icons-material/Search';

const App = ()=>{
    let footerComp = SearchIcon;
    let path = '/Search';
    return (<div className="app-container">
            <Header />
            <Trending />
            <Footer comp={footerComp} path={path}/>
            </div>
    )
}

export default App;