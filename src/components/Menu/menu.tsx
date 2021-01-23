import React, { useState, createContext } from 'react'
import classNames from 'classnames'

type SelectCallBack = (selectedIndex: number) => void

type MenuMode = 'horizontal' | 'vertical'
export interface MenuProps {
  defaultIndex?: number;  // 默认高亮
  className?: string;
  mode?: MenuMode;
  style?: React.CSSProperties;
  onSelect?: SelectCallBack
}

interface IMenuContext {
  index: number;
  // 问号是可选
  onSelect?: SelectCallBack;
}

// 创建contex
export const MenuContext = createContext<IMenuContext>({ index: 0 })

const Menu: React.FC<MenuProps> = (props) => {
  const {
    className,
    mode,
    style,
    children,
    defaultIndex,
    onSelect,
  } = props;
  const [currentActive, setActive] = useState(defaultIndex)
  const classes = classNames('viking-menu', className, {
    'menu-vertical': mode === 'vertical'
  })
  const handleClick = (index: number) => {
    setActive(index)
    if (onSelect) {
      onSelect(index)
    }
  }
  const passedContext: IMenuContext = {
    index: currentActive ? currentActive : 0,
    onSelect: handleClick
  }
  return (
    <ul className={classes} style={style} data-testid="test-menu">
      {/* 组件内部是自定义的 */}
      <MenuContext.Provider value={passedContext}>
        {children}
      </MenuContext.Provider>
    </ul>
  )
}

Menu.defaultProps = {
  defaultIndex: 0,
  mode: 'horizontal'
}
export default Menu;