export interface decodedUser {
id: string;
usernames: string;
}
declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace Express {
        export interface Request {
            user?: decodedUser;
        }
    }
}