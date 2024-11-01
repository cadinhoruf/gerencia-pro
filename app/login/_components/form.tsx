'use client'
import { Button } from '@/app/_components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/app/_components/ui/form'
import { MailIcon, LockIcon, LoaderCircleIcon } from 'lucide-react'
import { Input } from '@/app/_components/ui/input'
import { toast } from 'sonner'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { signIn } from 'next-auth/react'
import { loginSchema, LoginSchema } from '@/app/_lib/schemas/auth'

const LoginForm = () => {
  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })
  const onSubmit = async (data: LoginSchema) => {
    console.log('Submitting form', data)

    const { email, password } = data

    const response = await signIn('credentials', {
      email,
      password,
      redirect: true,
      callbackUrl: '/dashboard'
    })

    if (response?.error) {
      toast.error('Login ou senha inválidos!')
    } else {
      toast.success('Login realizado com sucesso!')
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-3 p-5'>
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
                    className='rounded-md border border-gray-300 pl-10 focus:outline-none focus:ring-2 focus:ring-slate-500'
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
                    placeholder='********'
                    className='rounded-md border border-gray-300 pl-10 focus:outline-none focus:ring-2 focus:ring-slate-500'
                    {...field}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className='w-full' type='submit' disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? <LoaderCircleIcon className='infinite animate-spin' /> : 'Log in'}
        </Button>
      </form>
    </Form>
  )
}

export { LoginForm }
