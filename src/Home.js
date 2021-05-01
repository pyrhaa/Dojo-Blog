import { useState, useEffect } from 'react';
import BlogList from './BlogList';

const Home = () => {
  const [blogs, setBlogs] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  //simulate a time loading when fetching data from a database
  useEffect(() => {
    setTimeout(() => {
      fetch('http://localhost:8000/blogs')
        .then((res) => {
          if (!res.ok) {
            throw Error('could not fetch the data fot that resource');
          }
          return res.json();
        })
        .then((data) => {
          setBlogs(data);
          setIsPending(false);
          setError(null);
        })
        .catch((e) => {
          setIsPending(false);
          setError(e.message);
        });
    }, 1000);
  }, []);

  return (
    <div className='home'>
      {error && <div>{error}</div>}
      {isPending && <div>Loading...</div>}
      {blogs && <BlogList blogs={blogs} title='All Blogs!' />}
    </div>
  );
};

export default Home;
