import axios from 'axios';
import { useEffect, useState } from 'react';

const useFetch = (method, url, requestBody) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);

    axios({
      method: method | 'post',
      url: url,
      data: requestBody | {}
    })
      .then((response) => {
        setData(response.data);
      })
      .catch(error => setError(error))
      .finally(() => setLoading(false))
  },
    [method, url, requestBody]
  )

  return { data, loading, error };
}

export default useFetch;