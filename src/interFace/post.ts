interface Post {
    id:string,
    userId:string,
    title:string,
    msg:string,
    created_at?: Date,
    comment?:[]
}

interface DataPassPost{
    title :string,
    msg:string
}

export {Post,DataPassPost};