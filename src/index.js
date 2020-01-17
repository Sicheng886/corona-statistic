import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import vibType from './vibType.json';
import { enText, chText } from './text';

const text = navigator.language === 'zh-CN' ? chText : enText;

const VibForm = () => {
  const [vibVal, setVibVal] = useState('1000');
  const [goContinue, setGoContinue] = useState(false);

  const continuesVib = useRef();

  useEffect(() => {
    if (!goContinue) {
      clearInterval(continuesVib.current);
    }
    if (goContinue) {
      continuesVib.current = setInterval(() => {
        if (navigator.vibrate) {
          navigator.vibrate(1000);
        } else {
          alert(text.alert);
        }
        console.log('called');
      }, 1000);
    }
  });

  return (
    <form>
      <label>{text.preset}</label>
      <div className='presets'>
        {vibType.map((item, index) => {
          return (
            <button
              key={index}
              onClick={e => {
                e.preventDefault();
                setVibVal(item);
              }}
            >
              {text.preset} {index + 1}
            </button>
          );
        })}
      </div>
      <label>{text.intro}</label>
      <input
        type='text'
        value={vibVal}
        onChange={e => {
          setVibVal(e.target.value);
        }}
      />
      <button
        name='btn'
        type='button'
        onClick={e => {
          e.preventDefault();
          if (navigator.vibrate) {
            navigator.vibrate(vibVal.split(','));
          } else {
            alert(text.alert);
          }
        }}
      >
        {text.goBtn}
      </button>
      <div>
        <button type='button' onClick={() => setGoContinue(true)}>
          {text.continues}
        </button>
        <button type='button' onClick={() => setGoContinue(false)}>
          {text.stop}
        </button>
      </div>
    </form>
  );
};

const Main = () => {
  return (
    <div className='container'>
      <h1>{text.title}</h1>
      <VibForm />
      <p>Made by Wally, 2020</p>
    </div>
  );
};

ReactDOM.render(<Main />, document.getElementById('root'));
