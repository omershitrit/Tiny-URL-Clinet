import { useState } from 'react';
import axios from 'axios';
import validator from 'validator'

const ERROR_MSG = "Please enter a valid url";

const App = () => {
  const [url, setUrl] = useState("");
  const [tinyurl, setTinyurl] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = e => setUrl(e.target.value);

  // 24:25 in the video i saved
  const save = () => {
    if (!validator.isURL(url)) {
      setErrorMessage(ERROR_MSG)
      setTinyurl('');
      return;
    }
    setErrorMessage('');

    const payload = { key: url, value: null };
    axios({
      url: 'https://tiny-url-react.herokuapp.com/api/save',
      method: 'POST',
      data: payload
    }).then(response => {
      // show the tiny url that received from the server!
      setTinyurl(response.data)
      //        <input className={tinyurl ? '' : 'hidden'} value={tinyurl} />
      //console.log(response.data);
    }
    ).catch(() => {
      // show an error message
    });
  }

  return (
    <div className="container">
      <div className="form">
        <div className="description">Enter a long url to make it shorter</div>
        <div className={errorMessage ? 'error' : 'hidden'}>{errorMessage}</div>
        <input type="text" onChange={handleChange} value={url}></input>
        <input className={tinyurl ? '' : 'hidden'} value={tinyurl} />
        <button onClick={save}>Make it Tiny!</button>
      </div>

    </div>
  );
}

export default App;
