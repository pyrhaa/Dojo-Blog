import { useState, useEffect } from 'react';

//simulate a time loading when fetching data from a database
//abortController  to abort fetch when unmounting component
const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const abortCont = new AbortController();

    setTimeout(() => {
      fetch(url, { signal: abortCont.signal })
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
          if (e.name === 'AbortError') {
            console.log('fetch aborted');
          } else {
            setIsPending(false);
            setError(e.message);
          }
        });
    }, 1000);

    return () => abortCont.abort();
  }, [url]);

  return { data, isPending, error }; //object {}
};

export default useFetch;
