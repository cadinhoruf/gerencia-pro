import { LockIcon } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../_components/ui/card'
import { LoginForm } from './_components/form'

export default async function LoginPage() {
  return (
    <div className='flex min-h-screen w-screen items-center justify-center bg-gray-100'>
      <Card className='w-full max-w-md'>
        <CardHeader className='space-y-1'>
          <div className='mb-4 flex items-center justify-center'>
            <div className='rounded-full bg-primary p-2 text-primary-foreground'>
              <LockIcon size={24} />
            </div>
          </div>
          <CardTitle className='text-center text-2xl'>GerenciaPro</CardTitle>
          <CardDescription className='text-center'> com suas credenciais para acessar sua conta</CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
      </Card>
    </div>
  )
}
