import React from 'react';
import Button, { ButtonType, ButtonSize } from './components/Button/button'
import Alert from './components/Alert/alert'
import Menu from './components/Menu/menu'
import MenuItem from './components/Menu/menuItem'
import SubMenu from './components/Menu/subMenu'

// import logo from './logo.svg';
// import './App.css';


function App() {

  const closeAlert1 = () => {
    console.log("on close alert1")
  }
  return (
    <div className="App">
      <header className="App-header">
        <Menu mode={'vertical'} defaultIndex={0} onSelect={(index) => { alert(index) }}>
          <MenuItem >cool link 0</MenuItem>
          <MenuItem disabled>cool link 1</MenuItem>
          <SubMenu title='dropdown'>
            <MenuItem >drop down 1</MenuItem>
            <MenuItem >drop down 2</MenuItem>
          </SubMenu>
          <MenuItem >cool link 2</MenuItem>
        </Menu>

        <Menu mode={'horizontal'} defaultIndex={0} onSelect={(index) => { alert(index) }}>
          <MenuItem >cool link 0</MenuItem>
          <MenuItem disabled>cool link 1</MenuItem>
          <SubMenu title='dropdown'>
            <MenuItem >drop down 1</MenuItem>
            <MenuItem >drop down 2</MenuItem>
          </SubMenu>
          <MenuItem >cool link 2</MenuItem>
        </Menu>
        <Alert title="title" message="消息" onClose={closeAlert1}></Alert>
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
    </div >
  );
}

export default App;
