'use client';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { authClient } from '@/lib/client.ts';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

const formSchema = z.object({
    email: z.email(),
});

type FormInputs = z.infer<typeof formSchema>;

export default function ForgotPassword() {
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormInputs>({
        resolver: zodResolver(formSchema),
    });
    
    const onSubmit = async (inputs: FormInputs) => {
        const { error } = await authClient.forgetPassword({
            email: inputs.email,
            redirectTo: '/reset-password',
        });
        if (error) {
            toast.error('Something went wrong');
            return;
        }
        router.push(`/forgot-password/check-mail?email=${inputs.email}`);
    };
    
    return (
        <>
            <h1 className="text-primary text-lg">Reset your password</h1>
            <p>
                Enter the email associated with your account and we&#39;ll send you an email with instructions to reset
                your password
            </p>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                <div>
                    <label htmlFor="email" className="text-sm">Email Address</label>
                    <Input
                        id="email"
                        {...register('email')}
                        placeholder="Enter Email Address"
                        aria-invalid={errors.email ? 'true' : 'false'}
                    />
                    {errors.email && (
                        <span className="text-negative text-sm">{errors.email.message}</span>
                    )}
                </div>
                <Button type="submit">
                    Send Instructions
                </Button>
            </form>
        </>
    );
}