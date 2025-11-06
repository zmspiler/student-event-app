import 'dotenv/config';

export const DATABASE_URL= process.env.DATABASE_URL;
export const AUTH_SECRET= process.env.AUTH_SECRET;
export const AUTH_URL= process.env.AUTH_URL;
export const CLIENT_ORIGIN= process.env.CLIENT_ORIGIN;

const vars = [DATABASE_URL, AUTH_SECRET, AUTH_URL, CLIENT_ORIGIN];

for(const v of vars) {
    if(!v) {
        console.error('Missing environment variable');
        process.exit(1);
    }
}