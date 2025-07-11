import { generateToken } from "../helper/generateToken";
import { User,CookieOption } from "../interFace/user";


interface Response {
    status:(code :number) =>Response
    cookie: (name : string , token :string ,option:CookieOption)=>Response
    json:(Body:any)=>void
}
export const setCookie = (user: User, res: Response): void => {
    const token = generateToken(user.id);

    const options: CookieOption = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
    };

    // remove password before sending response
    user.password = "";

    res.cookie("token", token, options).status(200)
};
