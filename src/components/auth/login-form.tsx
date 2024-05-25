"use client"

import * as  z from 'zod'
import { CardWrapper } from "./cardWrapper"
import { useForm } from "react-hook-form"

import { zodResolver } from "@hookform/resolvers/zod"
import {
    Form,
    FormControl,
    FormField,
    FormLabel,
    FormItem,
    FormMessage,
} from '@/components/ui/form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { FormError } from '../form-error'
import { FormSucess } from '../form-sucess'
import { Login } from '@/action/login'
import { useState, useTransition } from 'react'
import { LoginSchema } from '../../../schemas'

export const LoginForm = () => {
    
    const [isPending,startTransition] = useTransition()
    const [error,SetError] = useState<string | undefined>("")
    const [sucess,SetSucess] = useState<string | undefined>("")

    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver : zodResolver(LoginSchema),
        defaultValues : {
            email : "",
            password : "",
        }
    })

    const OnSubmit = (values : z.infer<typeof LoginSchema>) => {

        SetError("")
        SetSucess("")

       startTransition(()=>{
            Login(values)
            .then((data) => {
                SetError(data.error);
                SetSucess(data.sucess)
            })
       })

    }
    return (
        <CardWrapper
            headerLabel="Bem vindo de volta!"
            backButtonLabel="Não possui conta? Registre-se"
            backButtonHref="/auth/registrer"
            showSocial
        >
           <Form {...form}>
                <form 
                 onSubmit={form.handleSubmit(OnSubmit)}
                 className='space-y-6'
                 >
                    <div className="space-y-4">
                        <FormField
                            control={form.control}
                            name='email'
                            render={({field}) => (
                                <FormItem>
                                      <FormLabel>Email</FormLabel>
                                      <FormControl>
                                        <Input {...field} placeholder='exemplo@exemplo.com' type='email'/>
                                      </FormControl>
                                      <FormMessage/>
                                </FormItem>
                            )}
                        />

                        <FormField
                        control={form.control}
                        name='password'
                        render={({field}) => (
                            <FormItem>
                                    <FormLabel>Senha</FormLabel>
                                    <FormControl>
                                    <Input {...field} placeholder='********' type='password'/>
                                    </FormControl>
                                    <FormMessage/>
                            </FormItem>
                        )}
                        />
                    </div>   
                    <FormError message={error}/>
                    <FormSucess message={sucess}/>
                    <Button 
                    type='submit'
                    className='w-full'
                    disabled={isPending}
                    >Login</Button>
                </form>
           </Form>

        </CardWrapper>
    )
}