# 博客项目接口设计
[toc]

## 数据库设计
- 用户表
   
   |id | 用户名 | 密码 | 真实姓名 |
   | ---- |  ---- | -----|--- |
   | id | username | password | realname|
   | int | varchar(20) | varchar(20) | varchar(10) |

- 博客表

    | id | 标题 | 内容 | 创建时间 | 作者 |
    | ---| ---| ----| ----| ---|
    | id | title | content | createtime | author |
    | int | varchar(50) | longtext | bigint(20) | varchar(20) |
    
## api设计

### 获取博客列表

- 请求路径

    /api/blog/list
    
- 请求方式
    
    GET
    
- 请求参数
    
    | 参数名 | 是否必填 | 说明 |
    |------|---------| ---  |
    |author | 否 | 作者名 |
    |keyword| 否 |   关键字 |
   
- 返回参数

    ```json
        {
            "errno" : 0,
            "message": '',
            "data": []
        }     

### 获取博客详情

- 请求路径
    
    /api/blog/detail
    
- 请求方式
    
    GET
    
- 请求参数

    | 参数名 | 是否必填 | 说明 |
    | ----- | -------| -----|
    | id   | 否 | 博客id|
    
- 返回参数
    
    ```json
        {
            "errno": 0,
            "message":"",
            "data": {}
        }    
        
### 新建一篇博客

- 请求路径
      
      /api/blog/new
      
- 请求方式
    
    POST
    
- 请求参数

    | 参数名 | 是否必填 | 说明|
    | ---- | ----|--------|
    | title | 是 | 博客标题 | 
    | content | 是 | 博客内容 |
    | author | 是 | 作者 |
    
- 返回参数

    ```json
        {
            "id": "",
            "errno": 0,
            "message": ""
        }
        
### 更新一篇博客

- 请求路径
    
    /api/blog/update
    
- 请求方式

    POST
    
- 请求参数

    | 参数名 | 是否必填 | 说明 |
    | ---- | ------| ------ |
    | title | 是 | 博客标题 | 
    | content | 是 | 博客内容 | 
    | id| 是 | 博客id |
    
- 返回参数

    ```json 
        {
            "errno": 0,
            "message": ""
        }
        
### 删除一篇博客

- 请求路径
    
    /api/blog/del

- 请求方法

    POST

- 请求参数

    | 参数名 | 是否必填 | 说明 |
    | ----  | ------ | ----|
    | id | 是 | 博客id |
    | author | 是 | 作者 |
    
- 返回参数

    ```json
        {
            "errno": 0,
            "message": ""
        }        
       
###  登录

- 请求路径

    /api/user/login
    
- 请求方法

    POST
    
- 请求参数

    | 参数名 | 是否必填 | 说明 |
    |---- | ----- | ------ |
    | username | 是 | 用户名 |
    | password | 是 | 密码 |
    
 - 返回参数
 
    ```json
        {
            "errno": 0,
            "message": ""
        }            
        
              
    