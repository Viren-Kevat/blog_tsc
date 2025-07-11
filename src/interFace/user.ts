interface User{
    id :string
    username :string
    email :string
    post? : []
    comment?:[]
    password:string
}

interface CookieOption{
    expires:Date
    httpOnly : boolean
}



export {User,CookieOption}
