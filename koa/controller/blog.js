const xss = require('xss')
const {exec} = require('../db/mysql')
const getList = async (author,keyword) => {
    let sql = `select * from blogs where 1=1 `
    if(author){
        sql += `and author='${author}' `
    }
    if(keyword){
        sql += `and title like '%${keyword}%' `
    }
    sql += `order by createtime desc;`
    return await exec(sql)
}

const getDetail = async (id) =>{
    const sql = `select * from blogs where id='${id}'`
    const rows = await exec(sql)
    return rows[0]
    // return await exec(sql).then(rows=>{
    //     return rows[0]
    // })
}


const newBlog = async (blogData={})=>{
    const title = xss(blogData.title)
    const content = xss(blogData.content)
    const author = blogData.author
    const createTime = Date.now()
    const sql = `insert into blogs (title,content,createtime,author) values ('${title}','${content}','${createTime}','${author}')`;
    return await exec(sql).then(insertData=>{
        return {
            id : insertData.insertId
        }
    })
}

const updateBlog = async (id,blogData={})=>{
    const title = xss(blogData.title)
    const content = xss(blogData.content)
    const sql = `
      update blogs set title='${title}',content='${content}' where id=${id}
    `
    return await exec(sql).then(updateData=>{
        if(updateData.affectedRows>0){
            return true
        }
        return false
    })
}

const delBlog = async (id, author) => {
    const sql = `
      delete from blogs where id='${id}' and author='${author}'
    `
    return await exec(sql).then(delData=>{
        if(delData.affectedRows>0){
            return true
        }
        return false
    })
}

module.exports = {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    delBlog
}
