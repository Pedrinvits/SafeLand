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
import { Register } from '@/action/register'
import { useState, useTransition } from 'react'
import { RegisterSchema } from '../../../schemas'

export const RegisterForm = () => {
    
    const [isPending,startTransition] = useTransition()
    const [error,SetError] = useState<string | undefined>("")
    const [sucess,SetSucess] = useState<string | undefined>("")

    const form = useForm<z.infer<typeof RegisterSchema>>({
        resolver : zodResolver(RegisterSchema),
        defaultValues : {
            email : "",
            password : "",
            name : "",
        }
    })

    const OnSubmit = (values : z.infer<typeof RegisterSchema>) => {

        SetError("")
        SetSucess("")

       startTransition(()=>{
            Register(values)
            .then((data) => {
                SetError(data.error);
                SetSucess(data.sucess)
            })
       })

    }
    return (
        <CardWrapper
            headerLabel="Crie sua conta!"
            backButtonLabel="Já possui uma conta?"
            backButtonHref="/auth/login"
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
                            name='name'
                            render={({field}) => (
                                <FormItem>
                                      <FormLabel>Name</FormLabel>
                                      <FormControl>
                                        <Input {...field} placeholder='Seu nome' type='name'/>
                                      </FormControl>
                                      <FormMessage/>
                                </FormItem>
                            )}
                        />

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
                    >Register</Button>
                </form>
           </Form>

        </CardWrapper>
    )
}