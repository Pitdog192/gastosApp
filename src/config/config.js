//use require in module mode 
import { createRequire } from 'module'
const require = createRequire(import.meta.url);
const env = process.argv[2] || '.env'
//environment variables
require('dotenv').config({path: env})

const config = {
    port: process.env.PORT,
    mongoUri: process.env.MONGOURI
}

export default config