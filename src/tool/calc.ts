import { IExtendState } from '../redux/common'
var path = require('path');
/**
 * todo 这里遗留一个问题
 * 
 * calc被tool.index索引
 * category被common.index索引
 * 而calc引用了category
 * 如果calc建立索引恰好在category建索引之前，就会引用不到category
 * 所以这里存在一个index索引次序问题
 */

// console.log('--------calc-------')
// console.log(category)

const API_PATH_AVATAR = 'user/avatar/'

export default {

    tool(v: any) {
        return v
    },
    addAvatarApiPath(fileName:string){
        return path.join(API_PATH_AVATAR, fileName)
    },
    getAvatarPathFromUser(user: any) {
        if (user.source === 'oauth') {
            return user.oauth.avatarUrl
        } else {//暂时认为只有 oauth 及 register 两类                
            if (user.avatarFileName) {
                return API_PATH_AVATAR + user.avatarFileName
            } else {
                return API_PATH_AVATAR + 'default.png'
            }
        }
    },
    calcAvatarPath(
        user: any,
        anonymous: boolean,
        isMyself: boolean,
    ): string {
        if (anonymous) {
            if (isMyself) {
                return API_PATH_AVATAR + 'myanonymous.png'
            } else {
                return API_PATH_AVATAR + 'anonymous.png'
            }
        } else {
            if (user.source === 'oauth') {
                return user.oauth.avatarUrl
            } else {//暂时认为只有 oauth 及 register 两类                
                if (user.avatarFileName) {
                    return API_PATH_AVATAR + user.avatarFileName
                } else {
                    return API_PATH_AVATAR + 'default.png'
                }
            }
        }
    },

    calcExtendVoteOptions(v: IExtendState) {

        if (v.addVote && v.addVote.options) {
            return {
                ...v, addVote: {
                    ...v.addVote, options: v.addVote.options.filter((v: string) => {
                        return v.length > 0
                    })
                }
            }
        } else {
            return v
        }
    },

    // categoryIdstr2QueryStr(idStr, category){

    //     /**
    //      * 首先在category数组里面寻找
    //      * 如果没有，匹配category数组的
    //      */

    //     let found
    //     for(let v in category){
    //         // console.log(v)
    //         // console.log(category[v].idStr)
    //         if(category[v].idStr==idStr){
    //             found = category[v].name
    //             // console.log(found)
    //             // return true
    //         }
    //     }
    //     return found
    // },
    categoryIdstr2Name(idStr: string, category: any[]) {

        // console.log('--------calc categoryIdstr2Name-------')
        // console.log(category)
        // console.log(idStr)

        let found
        for (let v in category) {
            // console.log(v)
            // console.log(category[v].idStr)
            if (category[v].idStr === idStr) {
                found = category[v].name
                // console.log(found)
                // return true
            }
        }
        return found
    },
    // getAvatarImgPath(user){
    //     let fileName = user && user.result && user.result.data && user.result.data.avatarFileName
    //     if (fileName) {
    //       console.log('avatar file name')
    //       console.log(fileName)
    //       return 'user/avatar/' + fileName
    //     } else {
    //       return ''
    //     }
    //   },
    calcPaginateArray(current = 1, ext = 2, maxRight: number) {
        // required:
        //  current <= maxright

        let ba = [current]
        for (let i = 0; i < ext; i++) {
            ba.push((current + 1) + i)
        }
        for (let i = 0; i < ext; i++) {
            ba.unshift((current - 1) - i)
        }
        // console.log(ba)
        while (1) {
            if (ba[0] < 1) {
                ba.shift()
                let addRight = ba[ba.length - 1] + 1
                if (addRight <= maxRight) {
                    ba.push(addRight)
                }
            } else {
                break
            }
        }
        // console.log(ba)
        while (1) {
            if (ba[ba.length - 1] > maxRight) {
                ba.pop()
                let addLeft = ba[0] - 1
                if (addLeft >= 1) {
                    ba.unshift(addLeft)
                }
            } else {
                break
            }
        }
        // console.log(ba)
        return ba
    },
    getRandomColorString(){

        var hex = Math.floor(Math.random() * Math.floor(0xffffff))
        var hexStr = hex.toString(16)
        
        while (hexStr.length < 6) {
            hexStr = "0" + hexStr;
        }
        
        // console.log(hexStr)
        return "#" + hexStr
    }

}