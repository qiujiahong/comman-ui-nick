// import { findHighlightChunksInText } from '@grafana/data';
import React, { useEffect, useState } from "react"
// import '../style/AllTable.scss'
import deepcopy from 'ts-deepcopy'
// import { AlignRule } from '../types'
import useInterval from 'use-interval'
import {ITableProps} from './TableProps'



interface Page {
  currentPage: number,
  pages: number,
  limit: number
}

export const Table: React.FC<ITableProps> = (props) => {
    const {
        width,
        height,
        reverse,
        align,
        title,
        titleColor,
        titleAlign,  //TextAlign
        titleSize,
        //border,
        headerColor,
        headerBackground,
        headerSize,
        bodyColor,
        bodyBackground,
        bodySize,
        //fillSize,      //需填充的行数
        //horizontalPage, //横向分页
        pageSize,  //最多可以显示10条记录
        stayTime,   //每页记录停留多少S
        bodyData,      //body 二维数组
        header,
        // fillPage,
        cols,
    } = props;
    const [body, setBody] = useState<string[][]>()
    const [page,setPage] = useState<Page>({
        currentPage: 0,
        pages: 0,
        limit: 100000
    })

    const pageCount = (totalnum: number, limit: number) => {
        return totalnum > 0 ? ((totalnum < limit) ? 1 : ((totalnum % limit) ? (parseInt((totalnum / limit).toString()) + 1) : (totalnum / limit))) : 0;
    }
    const getTdHeight = (fontSize:string)=>{
        let numberStr = fontSize;
        let unit='';
        if(numberStr.endsWith('px')){
            numberStr.replace('px','').replace(' ','')
            unit='px'
        } else if (numberStr.endsWith('vw')){
            numberStr.replace('vw','').replace(' ','')
            unit='vw';
        }
        let number = Math.floor((parseInt(numberStr)*2.3)*100)/100;
        let ret = `${number}${unit}`
        return ret;
    }

    const fillArray = (arr:string[][],fillLength:number,cols: number)=>{
        let list = deepcopy<string[][]>(arr);
        if(arr === undefined ){
            return list;
        }
        if(arr.length < 1){
            let row =[]
            for(let i=0;i<cols;i++){
                row.push('')
            }
            for(let i=arr.length;i<fillLength;i++){
                list.push(deepcopy<[]>(row as []))
            }
        }
        else {
            let row:[]  = deepcopy<string[]>(arr[0]).map(v=>{
                return '';
            }) as [];
            for(let i=arr.length;i<fillLength;i++){
                list.push(deepcopy<[]>(row))
            }
        }
        return list;
    }

    const nextPage = ()=> {
        let {
            currentPage,
            pages,
            limit
        } = page
        currentPage ++ 
        if(currentPage >= pages){
            currentPage = 0
        }
        // console.log("currentPage:",currentPage)
        let tempData =props.bodyData.slice(currentPage * limit, currentPage * limit + limit)
        setBody(fillArray(tempData,pageSize || 10 ,cols ||1 ))
        setPage({currentPage,pages,limit})
    }

    useEffect(() => {
        let {
            currentPage,
            pages,
            limit
        } = page;
        // console.log("test111",props)
        const dataSize: number = bodyData.length
        limit = (pageSize === undefined ? 10000000 : pageSize)
        pages = pageCount(dataSize, limit)
        currentPage = 0;
        let tempData = deepcopy<string[][]>(bodyData);
        setBody(fillArray(tempData.slice(0 * limit, 0 * limit + limit),pageSize||10,cols||1))
        setPage({currentPage,pages,limit})
        // const timer = setInterval(nextPage, props.stayTime);
        // return () => clearInterval(timer)
    }, [width,
        height,
        reverse,
        align,
        title,
        titleColor,
        titleAlign,  //TextAlign
        titleSize,
        headerColor,
        headerBackground,
        headerSize,
        bodyColor,
        bodyBackground,
        bodySize,
        //fillSize,      //需填充的行数
        // horizontalPage, //横向分页
        pageSize,  //最多可以显示10条记录
        stayTime,   //每页记录停留多少S
        bodyData,      //body 二维数组
        header,
        // fillPage,
        cols])

    useInterval(() => {
        nextPage()
    }, stayTime || 5000)

    const renderHeader = ()=>{
        return (
        <thead>
            <tr style={{
                background: headerBackground,
                color: headerColor,
                fontSize: headerSize,
                lineHeight: getTdHeight(bodySize as string),
                height: getTdHeight(bodySize as string),
                display: 'flex',
                }} >
            {
                header !== undefined &&
                header.map((v: string, i: number) => {
                    return <th key={'header' + i} style={{
                    padding: 0,
                    }} > {v} </th>
                })
            }
            </tr>
        </thead>
        )
    }

   // i 代表行数 , j代表列数
    const getBgColor = (colors: string[],i:number,j:number)=>{
        let length:number = 0;
        for(let i=0;i< colors.length && i<4;i++){
            if(colors[i] === undefined || colors[i].replace(' ','') === ''){
                break;
            }else{
                length++;
            }
        }
        if(length === 0) {
            return '#0f2444';
        } else if(length === 1) {
            return  colors[0];
        } else if( length === 2 || length === 3) {
            return colors[i%2];
        } else  { //else if(length === 4)
            if( j%2 === 0 ) {
                return colors[i%2];
            } else {
                return colors[2+i%2];
            }
        }
    }

    const renderBody =()=>{
        return (
        <tbody>
            {
                body &&
                // i 代表行数 , j代表列数
                body.map((v: Array<string>, i: number) => {
                return <tr style={{
                    // background: i % 2 === 0 ? option?.bodyBackground : option?.bodyBackground1,
                    color: bodyColor,
                    fontSize: bodySize,
                }} key={'body' + i}>
                    {
                    v.map((v1: string, j: number) => {
                        return <td style={{
                        flex: 1,
                        lineHeight: getTdHeight(bodySize as string),
                        height: getTdHeight(bodySize as string),
                        background: getBgColor(bodyBackground,i,j),
                        }} key={'body' + i + 'td' + j}
                        > {v1} </td>
                    })
                    }
                </tr>
                })
            }
            </tbody>
        )
    }
    const getAlign = ()=>{
        if(align === 'top'){
            return 'flex-start' as string
        } else if (align === 'down'){
            return 'flex-end' as string
        } else{
            return 'center' as string
        }
    }

    return <div className="TableWrapper" style={{
        width: width,
        height: height,
        justifyContent: getAlign()
    }}>
        {
        title !== undefined && title !== '' &&
        <h3
            style={{
            color: titleColor,
            fontSize: titleSize,
            textAlign: titleAlign,
            width: '100%'
            }}
        >{title}</h3>
        }
        <table
        style={{
            width: width,
        }}>
        {!reverse && renderHeader()}
        {renderBody()}
        {reverse && renderHeader()}
        </table>
    </div>
}
Table.defaultProps = {
  width: '100%',
  reverse: false,
  align: 'center',
  title: '',
  titleColor: '#ffffff',
  titleSize: '20px',
  titleAlign: 'center',
  border: '2px solid red',
  headerColor: 'white',
  headerBackground: '#1a459b',
  bodyColor: 'white',
  bodySize: '16px',
  bodyBackground: ['#0f2444','#0a1a37'],
  pageSize: 1000,  //最多可以显示10条记录
  stayTime: 1000*1000,   //每页记录停留多少ms
//   horizontalPage: 1,
  header:[],
  bodyData: [
    []
  ],
  cols: 0
}

export default Table
