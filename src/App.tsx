import React, { useState } from 'react';
import Button, { ButtonType, ButtonSize } from './components/Button/button'
import Alert from './components/Alert/alert'
import Menu from './components/Menu/menu'
import MenuItem from './components/Menu/menuItem'
import SubMenu from './components/Menu/subMenu'
import Table,{HorizontalTable} from './components/Table'

function App() {
  const [stayTime,setStayTime] = useState(5000)
  const closeAlert1 = () => {
    console.log("on close alert1")
  }
  return (
    <div className="App">
      <header className="App-header">
      <Button btnType={ButtonType.Primary} size={ButtonSize.Small} onClick={()=>{
        setStayTime(p=>{
          p+=1000
          console.log(p)
          return p
        })
      }}>
          ++
        </Button>

        <Button btnType={ButtonType.Primary} size={ButtonSize.Small} onClick={()=>{
        setStayTime(p=>{
          p-=1000
          console.log(p)
          return p
        })
      }}>
          --
        </Button>
        <HorizontalTable
          title="标题1ww"
          titleSize="30px"
          titleAlign={"center"}
          titleColor={"red"}
          bodyData={[
                      ["1.1","1.2"],
                      ["2.1","2.2"],
                      ["3.1","3.2"],
                      ["4.1","4.2"],
                      ["5.1","5.2"],
                      ["6.1","6.2"],
                      ["7.1","7.2"],
                      ["8.1","8.2"],
                      ["9.1","9.2"],
                      ["10.1","10.2"],
                    ]}
          header={["h.1","h.2"]}
          bodyBackground={['#0f2444','#0a1a37','#0f3454','#0a2a47']}
          pageSize={4}
          stayTime={stayTime}
          horizontalPage={2}
          balance={true}
          >
        </HorizontalTable>

        <Table
        title="标题1"
        titleAlign={"left"}
          titleColor={"red"}
          bodyData={[["1.1","1.2"],["2.1","2.2"],["3.1","3.2"],["4.1","4.2"],["5.1","5.2"]]}
          header={["h.1","h.2"]}
          bodyBackground={['#0f2444','#0a1a37']}
          pageSize={2}
          stayTime={stayTime}>
        </Table>
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

      </header>
    </div >
  );
}

export default App;
