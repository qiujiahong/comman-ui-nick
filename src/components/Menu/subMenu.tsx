import React, { useContext, FunctionComponentElement } from 'react'

import classNames from 'classnames'
import { MenuContext } from './menu'

import { MenuItemProps } from './menuItem'

export interface SubMenuProps {
  indnex?: number,
  title: string;
  className?: string;
}

const SubMenu: React.FC<SubMenuProps> = ({ indnex, title, children, className }) => {
  const context = useContext(MenuContext)
  const classes = classNames('menu-item submenu-item', className, {
    'is-active': context.index === indnex
  })

  const rennderChildren = () => {
    const childrenComponent = React.Children.map(children, (child, i) => {
      const childElement = child as FunctionComponentElement<MenuItemProps>
      if (childElement.type.displayName === 'MenuItem') {
        return childElement;
      } else {
        console.error('Warning: SubMenu has a child which is not a menuItem component')
      }
    })
    return (
      <ul className='viking-submenu'>
        {childrenComponent}
      </ul>
    )
  }

  return (
    <li key={indnex} className={classes}>
      <div className="submenu-title">{title}</div>
      {rennderChildren()}
    </li >
  )
}

SubMenu.displayName = 'SubMenu'

export default SubMenu;