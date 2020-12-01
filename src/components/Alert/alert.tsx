
import React from 'react'
import classNames from 'classnames'
// export enum AlertType {
//   Primary = 'success',
//   Default = 'default',
//   Danger = 'danger',
//   Link = 'link'
// }

export type AlertType = 'success' | 'default ' | 'danger' | 'warning' | any

interface BaseAlertProps {
  title?: string
  message?: string
  type?: AlertType
  onClose?: () => void
}

const Alert: React.FC<BaseAlertProps> = (props) => {
  const {
    title,
    message,
    type,
    onClose
  } = props

  // const classes = classNames('btn', className, {
  //   [`btn-${btnType}`]: btnType,
  //   [`btn-${size}`]: size,
  //   'disabled': (btnType === ButtonType.Link) && disabled
  // })

  const classes = classNames('alert', {
    [`alert-${type}`]: type,
  })


  return (<div className={classes}>
    <div >
      {title}
    </div>
    <div>
      {message}
    </div>
    <div className={'close'} onClick={onClose}>
      x
    </div>
  </div>)
}

Alert.defaultProps = {
  type: 'default'
}
export default Alert;
