import React from 'react'
import { calc } from 'tool'

interface IState2Prop {
    ext: any,
    current: number,
    pageSize: number,
    totalDocs: number,
}
interface IDispatch2Prop {
    nav: (v: number) => void,
}

function PageRound({ current, ext, totalDocs, pageSize, nav }: IState2Prop & IDispatch2Prop) {

    // console.log('-------------pageRound---------------')
    // console.log(current)
    // console.log(ext)
    // console.log(totalDocs)
    // console.log(pageSize)
    // if(!pageSize) {pageSize=10}
    var maxRight = Math.ceil(totalDocs / pageSize)
    if (!maxRight) { maxRight = 1 }


    const ba: number[] = calc.calcPaginateArray(current, ext, maxRight)
    // console.log(current)
    // console.log(ext)
    // console.log(maxRight)
    // console.log(ba)

    return (
        <div>

            {ba[0] === 1 ? null : <span><button onClick={() => nav(1)} >1</button>{ba[0] === 2 ? null : <span>...</span>}</span>}
            {ba.map((item) => <button
                key={item}
                onClick={() => nav(item)}
                disabled={item === current}
            >{item}</button>)}
            {ba[ba.length - 1] === maxRight ? null : <span>{ba[ba.length - 1] === maxRight - 1 ? null : <span>...</span>}<button onClick={() => nav(maxRight)}>{maxRight}</button></span>}

        </div>
    );
}

export default PageRound