"use server"
import * as z from 'zod'

import { db } from '@/lib/db';
import * as bcrypt from "bcrypt-ts";
import { RegisterSchema } from '../../schemas';
import { getUserByEmail } from '../../data/user';

export const Register = async (values : z.infer<typeof RegisterSchema> ) => {

    const validatedFields = RegisterSchema.safeParse(values);

    if(!validatedFields.success) {
        return {
            error : "Invalid Fields"
        };
    }
    const {email, password, name} = validatedFields.data

    const hashPassword = await bcrypt.hash(password,10)
    

    const existingUser = await getUserByEmail(email);

    if(existingUser) {
        return {
            error : "Esse email já está sendo usado!"
        };
    }
    await db.user.create({
        data : {
            name, 
            email,
            password : hashPassword,
        }
    })
    // mandar mensagem de verificacao

    return { sucess : "Usuário criado com sucesso!"};
}