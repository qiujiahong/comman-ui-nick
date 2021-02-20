

export type AlignRule = 'center' | 'left' | 'right' | 'top' | 'down' | undefined;
export type TextAlignProperty =  "center" | "end" | "justify" | "left" | "match-parent" | "right" | "start";

export interface ITableProps {
  width?: string,
  height?: string,
  reverse?: boolean,
  align? :  AlignRule,
  title?: string,
  titleColor?: string,
  titleAlign?: TextAlignProperty  //TextAlign
  titleSize?: string,
  border?: string,
  headerColor?: string
  headerBackground?: string
  headerSize?: string
  bodyColor?: string
  bodyBackground: string[]
  bodySize?: string
  fillSize?: number      //需填充的行数
  horizontalPage?: number //横向分页
  pageSize?: number  //最多可以显示10条记录
  stayTime?: number   //每页记录停留多少ms
  bodyData: string[][]      //body 二维数组
  header:string[]
  cols?: number
  balance?: boolean   //数据均衡，在多大列的情况下，每大列的数据是否均衡
}