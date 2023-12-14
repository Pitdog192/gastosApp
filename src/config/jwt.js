import jwt from "jsonwebtoken";
import config from './config.js';

function accessToken (payload) {
    return new Promise((resolve, reject) => {
        jwt.sign(
            payload,
            config.secret,
            {expiresIn: "1d"},
            (err, token) => {
                if(err) reject(err)
                resolve(token)
            }
        )
    })
}

export default accessToken