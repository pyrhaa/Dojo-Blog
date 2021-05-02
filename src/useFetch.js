import { useState, useEffect } from 'react';

//simulate a time loading when fetching data from a database
const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      fetch(url)
        .then((res) => {
          if (!res.ok) {
            throw Error('could not fetch the data fot that resource');
          }
          return res.json();
        })
        .then((data) => {
          setData(data);
          setIsPending(false);
          setError(null);
        })
        .catch((e) => {
          setIsPending(false);
          setError(e.message);
        });
    }, 1000);
  }, [url]);

  return { data, isPending, error }; //object {}
};

export default useFetch;
