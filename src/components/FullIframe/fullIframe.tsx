import React, { useEffect, useState } from 'react'
import useInterval from 'use-interval'

export enum DisplayMode {
  Setting = 'setting',  //设置模式
  Play = 'play'         //播放模式
}

interface PlayInfo {
  curPage: number,    //props.urls的下标
  nextPage: number,   //props.urls的下标
  count: number,
  topIndex: number,   //disUrl的下标
  downIndex: number,  //disUrl的下标
  disUrl: string[]    //props.urls的的值转移2个到disUrl内
}


interface FullIframeProps {
  displayMode?: DisplayMode;
  startPage?: number  // 播放的首个url
  stayTime?: number   // 每一页iframe多长时间 s   
  loadTime?: number   // 每一页iframe到多长时间开始加载,s，例：stayTime = 10，loadTime=7 ，则在7s的时候开始加载第二页，在10s时切换显示第二页，第一页隐藏
  urls: string[]
}

const FullIframe: React.FC<FullIframeProps> = (props) => {
  const {
    urls,
    loadTime,
    stayTime,
  } = props

  const [playInfo, SetPlayInfo] = useState<PlayInfo>({
    curPage: 0,
    nextPage: 0,
    count: 0,
    topIndex: 0,
    downIndex: 1,
    disUrl: ["", ""]
  })
  const getInitPageInfo = (start: number) => {
    let cur = start || 0
    if (cur >= urls.length) {
      cur = (urls.length - 1)
    }
    let next = cur + 1;
    if (next >= urls.length) {
      next = 0
    }

    return {
      curPage: cur,
      nextPage: next,
      count: 0,
      topIndex: 0,
      downIndex: Math.min(props.urls.length, 1),
      disUrl: [urls[cur], ""]
    }
  }

  const changeDisPage = () => {
    console.log("changeDisPage")
  }

  useEffect(() => {
    const {
      startPage
    } = props
    const play = getInitPageInfo(startPage || 0)
    SetPlayInfo(play);
  }, [urls, loadTime, stayTime])


  useInterval(() => {
    let {
      count,
      disUrl,
      downIndex,
      nextPage
    } = playInfo;
    console.log("test", count, stayTime)
    if (count === loadTime) {//加载第二页
      count++;
      disUrl[downIndex] = urls[nextPage]
      SetPlayInfo(old => {
        return { ...old, count: ++count, disUrl }
      })
    }
    else if (count === stayTime) {//显示第二页，第二页变成第一页，更新第二页，复位计数器
      changeDisPage()
      SetPlayInfo(old => {
        return { ...old, count: 0 }
      })
    } else {
      SetPlayInfo(old => {
        return { ...old, count: ++count }
      })
    }


  }, 1000)


  return (
    <div className={"FullIframeContainer"}>
      <div className={"setting"}>
        {
          urls && urls.map((v, i) => {
            return <div key={"settingUrl" + i}>{v}</div>
          })
        }
      </div>
      <div className={"play"}>
        {
          playInfo.disUrl[0] !== "" &&
          <iframe src={playInfo.disUrl[0]} title={"iframe1"} frameBorder="no" style={{
            width: "100%",
            height: "100%",
          }} ></iframe>
        }
        {
          playInfo.disUrl[1] !== "" &&
          <iframe src={playInfo.disUrl[1]} title={"iframe1"} frameBorder="no" style={{
            width: "100%",
            height: "100%",
          }} ></iframe>
        }

      </div>
    </div >
  )

}

FullIframe.defaultProps = {
  displayMode: DisplayMode.Setting,
  startPage: 0,
  stayTime: 10,
  loadTime: 7,
}

export default FullIframe;