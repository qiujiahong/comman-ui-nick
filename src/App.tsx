import React from 'react';
import Button, { ButtonType, ButtonSize } from './components/Button/button'
import Alert from './components/Alert/alert'
// import logo from './logo.svg';
// import './App.css';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Alert title="title" message="消息"></Alert>
        <Alert title="title111" message="消息22" type="danger"></Alert>
        <Button >hello</Button>
        <Button size={ButtonSize.Large}
          onClick={(e) => { e.preventDefault(); alert('abcd') }}>
          default large
        </Button>
        <Button disabled btnType={ButtonType.Primary} size={ButtonSize.Large}>
          disabled button
        </Button>
        <Button btnType={ButtonType.Primary} size={ButtonSize.Large}>
          large primary
        </Button>
        <Button btnType={ButtonType.Danger} size={ButtonSize.Small}>
          small danger
        </Button>
        <Button btnType={ButtonType.Link} size={ButtonSize.Large}
          href="https://www.baidu.com">
          baidu link
        </Button>
        <Button btnType={ButtonType.Link} disabled size={ButtonSize.Large}
          href="https://www.baidu.com">
          baidu link disable
        </Button>
        {/* <h1>hello word</h1>
        <h2>hello word</h2>
        <h3>hello word</h3>
        <hr />
        <code>
          const a = 'b'
        </code> */}
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
