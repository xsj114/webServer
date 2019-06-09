const querystring = require('querystring')
const {get, set} = require('./src/db/redis')
const handleBlogRouter = require('./src/router/blog')
const handleUserRouter = require('./src/router/user')

// 获取cookie的过期时间
const getCookieExpires = () => {
    const d = new Date()
    d.setTime(d.getTime()+(24 * 60 * 60 * 1000))
    return d.toGMTString()
}

// session数据
// const SESSION_DATA = {}


const getPostData = (req)=>{
    const promise = new Promise((resolve,reject)=>{
        if(req.method !== "POST"){
            resolve({})
            return
        }
        if(req.headers['content-type']!=='application/json'){
            resoleve({})
            return
        }
        let postData = ''
        req.on('data',chunk=>{
            postData += chunk.toString()
        })
        req.on('end',()=>{
            if(!postData){
                resolve({})
                return
            }
            resolve(JSON.parse(postData))
        })
    })
    return promise
}

const serverHandle = (req,res)=>{
    res.setHeader('Content-type','application/json')

    const url = req.url
    req.path = url.split('?')[0]

    req.query = querystring.parse(url.split('?')[1])

    // 解析 cookie
    req.cookie = {}
    const cookieStr = req.headers.cookie || ''
    cookieStr.split(';').forEach(item => {
        if (!item) {
            return
        }
        const arr = item.split('=')
        const key = arr[0].trim()
        const val = arr[1].trim()
        req.cookie[key] = val
    })

    //解析 session
    // if (userId) {
    //     if (!SESSION_DATA[userId]) {
    //         SESSION_DATA[userId] = {}
    //     }
    // } else {
    //     needSetCookie = true
    //     userId = `${Date.now()}_${Math.random()}`
    //     SESSION_DATA[userId] = {}
    // }
    // req.session = SESSION_DATA[userId]
    let needSetCookie = false
    let userId = req.cookie.userid
    if (!userId) {
        needSetCookie = true
        userId = `${Date.now()}_${Math.random()}`
        set(userId,{})
    }
    req.sessionId = userId
    get(req.sessionId).then(sessionData => {
        if (sessionData === null) {
            set(req.sessionId,{})
            req.session = {}
        } else {
            req.session = sessionData
        }
        return getPostData(req)
    }).then(postData => {
        req.body = postData

        const blogResult = handleBlogRouter(req,res)
        const userResult = handleUserRouter(req,res)
        console.log(blogResult)
        if(blogResult){
            blogResult.then(blogData=>{
                if (needSetCookie) {
                    res.setHeader('Set-Cookie', `userid=${userId};path=/;httpOnly;expires=${getCookieExpires()}`)
                }
                res.end(
                    JSON.stringify(blogData)
                )
            })
            return
        }
        if(userResult){
          userResult.then(userData=>{
              if (needSetCookie) {
                res.setHeader('Set-Cookie', `userid=${userId};path=/;httpOnly;expires=${getCookieExpires()}`)
              }
              res.end(
                JSON.stringify(userData)
              )
          })
          return
        }

        res.writeHead(404,{"Content-type" : "text/plain"})
        res.write("404 Not Found\n")
        res.end()

    })

}


module.exports = serverHandle
