'use client'
import { Button } from '@/app/_components/ui/button'
import { Input } from '@/app/_components/ui/input'
import { LockIcon, MailIcon } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/app/_components/ui/form'
import { useAction } from 'next-safe-action/hooks'

const LoginForm = () => {
  const form = useForm<LoginSchema>({
    shouldUnregister: true,
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(data => executeLogin(data))} className='space-y-3 p-5'>
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <div className='relative'>
                  <MailIcon className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-500' size={18} />
                  <Input
                    id='email'
                    type='email'
                    placeholder='user@example.com.br'
                    className='rounded-md border border-gray-300 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500'
                    {...field}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Senha</FormLabel>
              <FormControl>
                <div className='relative'>
                  <LockIcon className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-500' size={18} />
                  <Input
                    id='password'
                    type='password'
                    placeholder='user@example.com.br'
                    className='rounded-md border border-gray-300 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500'
                    {...field}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className='w-full' type='submit'>
          Log in
        </Button>
      </form>
    </Form>
  )
}

export { LoginForm }
