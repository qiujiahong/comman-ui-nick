import React, { useEffect, useState } from 'react'
import useInterval from 'use-interval'

export enum DisplayMode {
  Setting = 'setting',  //设置模式
  Play = 'play'         //播放模式
}

interface PlayInfo {
  curPage: number,
  nextPage: number,
  curUrl: string,
  nextUrl: string,
  count: number
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
    startPage
  } = props

  const [count, setCount] = useState(0)
  const [url1, setUrl1] = useState("")
  const [url2, setUrl2] = useState("")

  const [playInfo, SetPlayInfo] = useState<PlayInfo>({
    curPage: 0,
    nextPage: 0,
    curUrl: '',
    nextUrl: '',
    count: 0
  })
  const getPageInfo = (start: number) => {
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
      curUrl: urls[cur],
      nextUrl: urls[next],
      count: 0
    }
  }

  useEffect(() => {
    const {
      startPage
    } = props
    const play = getPageInfo(startPage || 0)
    setUrl1(play.curUrl)
    setUrl2("")
    SetPlayInfo(play);
  }, [urls, loadTime, stayTime])


  useInterval(() => {
    let {
      count
    } = playInfo;
    console.log("test", count, stayTime)
    if (count === loadTime) {//加载第二页
      count++;
      console.log("load next iframe",)
    }
    else if (count === stayTime) {//显示第二页，第二页变成第一页，更新第二页，复位计数器

      count = 0
    } else {
      count++;
    }
    SetPlayInfo(old => {
      return { ...old, count: count }
    })

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
          url1 !== "" &&
          <iframe src={url1} title={"iframe1"} frameBorder="no" style={{
            width: "100%",
            height: "100%",
          }} ></iframe>
        }
        {
          url2 !== "" &&
          <iframe src={url2} title={"iframe1"} frameBorder="no" style={{
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