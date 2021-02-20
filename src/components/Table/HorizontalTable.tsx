import React ,{ useEffect,useState} from "react"
import deepcopy from 'ts-deepcopy'
import useInterval from 'use-interval'
import {ITableProps} from './TableProps'
import {Table} from './Table'

interface Page {
    current: number,    //当前页码
    pages: number,      //总共有多少页
    limit: number       //每页有多少数据
  }

  
export type AlignRule = 'center' | 'left' | 'right' | 'top' | 'down' | undefined;
export const HorizontalTable: React.FC<ITableProps> = (props) => {
    const {
        horizontalPage,
        bodyData,
        title,
        titleColor,
        titleSize,
        titleAlign,
        balance
    } = props;

    const [tableProps,setTableProps] = useState<ITableProps[]>();
    const [cols,setCols] = useState(0);
    
    const [page,setPage] = useState<Page>({
        current: 0,
        pages: 1,
        limit: 100000
    });
    useInterval(() => {
        nextPage()
      }, props.stayTime || 5000);
      
    const nextPage = ()=>{
        let {
            current,
            pages,
            limit
        } = page;
        const curPage = (current + 1 >= pages) ? 0 : (current + 1)
        current = curPage
        // console.log("nextPage1",current,pages)
        //1. 拆分小页 props.body
        let list:ITableProps[] = []
        let tempProps:ITableProps = {...props}
        tempProps.header = []
        tempProps.bodyBackground = []
        tempProps.bodyData = []
        let bodys:string[][][] = getBodys(props.bodyData,limit)

        let avgRecords = Math.ceil(bodys[current].length / (horizontalPage||1)) 
        let min = Math.min((props.pageSize||10),avgRecords)
        for(let page = 0 ; page < (horizontalPage || 1)  ; page++){
            let temp = deepcopy<ITableProps>(tempProps);
            temp.header = [...props.header]
            temp.bodyBackground = getBodyBackground(page,props.bodyBackground)
            if(balance){
                temp.bodyData = bodys[current].splice(0,min)
            }else{
                temp.bodyData = bodys[current].splice(0,props.pageSize)
            }
            list.push(temp);
        }
        setTableProps(list)
        setPage({current,pages,limit})
      }
    // @body  - 数据
    // @limit - 限制
    // @pages - 有多少页
    const getBodys = (body:string[][],limit: number)=>{
        let temp = deepcopy<string[][]>(body);
        let bodys:string[][][] = []
        let count = true
        do{
            let s:string[][] = temp.splice(0,limit)
            if(s.length !== 0){
                bodys.push(s)
            }else {
                count = false;
            }
        } while(count)
        return bodys;
    }
    const getBodyBackground = (page:number,bg:string[])=>{
        let ret 
        if(page%2 === 0){
            ret = [bg[0],bg[1]]
        }else {
            ret = [bg[2],bg[3]]
        }
        return ret
    }
    useEffect(() => {
        let {
            current,
            pages,
            limit,  
        } = page;
        if(bodyData !== undefined  && bodyData.length > 0) {
            // console.log('props1:',props,props.body[0].length)
            //1. 拆分大页 props.body
            let dataSize = bodyData.length;
            // 一大页最多能放多少条数据
            limit = (horizontalPage || 1) * (props.pageSize ||10)
            pages = Math.ceil(dataSize/limit)
            setPage({current,pages,limit})

            let bodys:string[][][] = getBodys(bodyData,limit)
        
            if(current  > bodys.length - 1){
                if(bodys.length !== 0 ){
                    current = bodys.length -1;
                }
            }
            setCols(props.bodyData[0].length)

            //1. 拆分小页 props.body
            let list:ITableProps[] = []
            let tempProps:ITableProps = {
                ...props
            }
            tempProps.header = []
            tempProps.bodyBackground = []
            tempProps.bodyData = []
            let avgRecords = Math.ceil(bodys[current].length / (horizontalPage||1)) 
            let min = Math.min((props.pageSize||10),avgRecords)
            for(let page = 0 ; page < (horizontalPage || 1)  ; page++){
                let temp = deepcopy<ITableProps>(tempProps);
                temp.header = [...props.header]
                temp.bodyBackground = getBodyBackground(page,props.bodyBackground)
                if(balance){
                    temp.bodyData = bodys[current].splice(0,min)
                }else{
                    temp.bodyData = bodys[current].splice(0,props.pageSize)
                }
                list.push(temp);
            }
            setTableProps(list)
        } 
      }, [props])
    return (
        <div className='HorizTableWrapper'>
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
        <div className='HorizTables'>
        {
            tableProps?.map((v,i)=>{
              return  <Table 
                key={`table${i}`}
                reverse={v.reverse}
                align={v.align}
                titleColor={v.titleColor}
                titleSize={v.titleSize}
                titleAlign={v.titleAlign}
                headerColor={v.headerColor}
                headerBackground={v.headerBackground}
                headerSize={v.headerSize}
                bodyColor={v.bodyColor}
                bodySize={v.bodySize}
                bodyBackground={v.bodyBackground}
                horizontalPage={1}
                pageSize={v.pageSize}
                stayTime={v.stayTime}
                header={v.header}
                bodyData={v.bodyData}
                cols={cols}
                  ></Table>
            })
        }
        </div>
        </div>
    )
}
