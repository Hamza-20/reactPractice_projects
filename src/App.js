import { useEffect, useState } from "react";
import './App.css';
import SearchIcon from './search.svg';
import MovieCard from "./MovieCard";

const searchMovies = async(title) =>{
  
    try{
   const response = await fetch(`http://www.omdbapi.com/?apikey=feb03d2d&s=${title}`);
   const data = await response.json();
   console.log(data);
   console.log(data.Search);

   return data.Search;
    }catch(error){
        console.error(error);
        throw error;
    }
} 


const App = () => {
    const [movies,setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");


    useEffect(()=>{
       
        const fetchMovies = async () => {
            const searchResult = await searchMovies("Batman");
            setMovies(searchResult);
          };
      
          fetchMovies();

     },[])
   
  return(
       <div className="app">
            <h1>Movie Land</h1>

            <div className="search">
                <input
                placeholder="Search for movies"
                value= {searchTerm}
                onChange={(e)=>setSearchTerm(e.target.value)}
                >
                </input>

              <img src={SearchIcon} alt="search" onClick={async ()=>{
                const movieResult = await searchMovies(searchTerm);
                setMovies(movieResult);
                }
                }></img>

                
            </div>

            {
                movies?.length > 0 ?
                (
                <div className="container">
                    {
                    movies.map((movie)=>
                    <MovieCard movie={movie}/>
                    )
                    }
                </div>
                ) :(
                <div className="empty">
                    <h2>No movies found</h2>
                </div>
                )
            }


         
       </div>
  );
};

export default App;
