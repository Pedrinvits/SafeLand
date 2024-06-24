"use client"
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "../ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "../ui/textarea";
import { createPosts } from "../../../data/createPost";
import { auth } from "../../../auth";
import { startTransition, useState, useTransition } from "react";



const CreatePost =  () => {
    const [isPending,startTransition] = useTransition()
    const [error,SetError] = useState<string | undefined>("")
    const [sucess,SetSucess] = useState<string | undefined>("")
    const formSchema = z.object({
        title: z.string({
            required_error: "Name is required",
            invalid_type_error: "Name must be a string",
        }),
        content: z.string({
            required_error: "Name is required",
            invalid_type_error: "Name must be a string",
        }),
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            content: "",
        },
    })
    // 2. Define a submit handler.
     const onSubmit = async (values: z.infer<typeof formSchema>) => {
      try {
       
        SetError("")
        SetSucess("")

       startTransition(()=>{
        createPosts(values.title,values.content)
            .then((data) => {
               
               console.log(data);
               
            })
       })
      }catch(err){
        console.log(err);
        
      }
    //    console.log(posts);
    }
   
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                                <Input placeholder="shadcn" {...field} />
                            </FormControl>
                            <FormDescription>
                                This is your public display name.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="content"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Content</FormLabel>
                            <FormControl>
                                <Textarea placeholder="Write the content of your post" className="w-full min-h-[200px]" {...field} />
                            </FormControl>
                            <FormDescription>
                                This is your public display name.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">Submit</Button>
            </form>
        </Form>
    )



}

export default CreatePost;