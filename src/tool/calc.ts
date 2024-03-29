import { IExtendState } from '../redux/common'

//var path = require('path');
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
import { sys } from '../config';

var urljoin = require('url-join');

console.log(urljoin(sys.appHomepage, sys.graphql_endpoint))

const PATH_AVATAR = 'user/avatar/'
const AVATAR_DEFAULT = 'default.png'
const AVATAR_MY_ANONYMOUS = 'myanonymous.png'
const AVATAR_ANONYMOUS = 'anonymous.png'



export default {

    addBaseUrl(url: string) {
        return urljoin(sys.appHomepage, url)
    },
    getVerifyPath(random: number) {
        return urljoin(sys.appHomepage, `/tool/verify?mt=${random.toString()}`)
    },
    tool(v: any) {
        return v
    },
    // addAvatarApiPath(fileName:string){
    //     return urljoin(PATH_AVATAR, fileName)
    // },
    getAvatarUrlFromUser(user: any) {
        console.log(`getAvatarUrlFromUser() enter`)
        if (user.source === 'oauth') {
            return user.oauth.avatarUrl
        } else {//暂时认为只有 oauth 及 register 两类                
            if (user.avatarPath) {
                console.log(`user.avatarPath: ${user.avatarPath}`)
                console.log(`getAvatarUrlFromUser(): ${this.addBaseUrl(user.avatarPath)}`)
                return this.addBaseUrl(user.avatarPath)
            } else {
                return this.addBaseUrl(urljoin(PATH_AVATAR, AVATAR_DEFAULT))
            }
        }
    },
    getAvatarPathFromUser(user: any) {
        if (user.source === 'oauth') {
            return user.oauth.avatarUrl
        } else {//暂时认为只有 oauth 及 register 两类                
            if (user.avatarFileName) {
                return this.addBaseUrl(urljoin(PATH_AVATAR, user.avatarFileName))
            } else {
                return this.addBaseUrl(urljoin(PATH_AVATAR, AVATAR_DEFAULT))
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
                console.log(`avatar address: ${this.addBaseUrl(urljoin(PATH_AVATAR, AVATAR_MY_ANONYMOUS))}`)
                return this.addBaseUrl(urljoin(PATH_AVATAR, AVATAR_MY_ANONYMOUS))                
            } else {
                console.log(`avatar address: ${this.addBaseUrl(urljoin(PATH_AVATAR, AVATAR_ANONYMOUS))}`)
                return this.addBaseUrl(urljoin(PATH_AVATAR, AVATAR_ANONYMOUS))                 
            }
        } else {
            if (user.source === 'oauth') {
                console.log(`avatar address: ${user.oauth.avatarUrl}`)
                return user.oauth.avatarUrl
            } else {//暂时认为只有 oauth 及 register 两类                
                if (user.avatarFileName) {
                    console.log(`avatar address: ${this.addBaseUrl(urljoin(PATH_AVATAR, user.avatarFileName))}`)
                    return this.addBaseUrl(urljoin(PATH_AVATAR, user.avatarFileName))
                } else {
                    console.log(`avatar address: ${this.addBaseUrl(urljoin(PATH_AVATAR, AVATAR_DEFAULT))}`)
                    return this.addBaseUrl(urljoin(PATH_AVATAR, AVATAR_DEFAULT))
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
    calcPaginateArray(current:number = 1, ext:number = 2, maxRight: number) {
        // console.log('------------calcPaginateArray---------------')
        // console.log(typeof current)
        // console.log(current)
        // console.log(ext)
        // console.log(maxRight)
        // required:
        //  current <= maxright

        let ba:number[] = [current]
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