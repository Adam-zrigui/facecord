import * as yup from "yup";

export const authReq = yup.object({
    username: yup.string().min(4,'too short').max(15,'too long').required(),
    password: yup.string().min(8, 'too short').max(30, 'too long').required(),
})
export const createMsgReq = yup.object({
    conversationId: yup.string().required(),
    text: yup.string().required().min(1),
    
})