// src/components/HomePage.tsx
import React, { useState, useEffect, useCallback } from 'react';
import axios, { AxiosResponse } from 'axios';
import Cards from './Cards';
interface Movie {
  id: string;
  title: string;
  summary: string;

}

const App: React.FC = () => {
  const [data, setData] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '55eebd27c7msh57b19e6cfe5c0b9p184074jsn13934c4fb0ee',
      'X-RapidAPI-Host': 'netflix54.p.rapidapi.com'
    }
  };

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('https://netflix-data.p.rapidapi.com/search/?query=stranger&offset=0&limit_titles=50&limit_suggestions=20', options)
      const data = await res.json();
      console.log(data)
      setData(data.titles);
      // setData((prevData) => [...prevData, ...data.data]);
      // setPage(page + 1);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
    setLoading(false);
  }, [page]);


  useEffect(() => {
    fetchData();
  }, []);

  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight &&
      !loading
    ) {
      fetchData();
    }
  }, [loading]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  return (
    <div>
      <div className="row">
        {
          data.map((curElem) => {
            return <Cards key={curElem.summary.id} actualData={curElem} />
          })
        }
      </div>
      {loading && <p>Loading...</p>}
    </div>
  );
};

export default App;
