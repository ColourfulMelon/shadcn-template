'use client';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { authClient } from '@/lib/client.ts';
import { toast } from 'sonner';
import { useRouter, useSearchParams } from 'next/navigation';
import { zPassword } from '@/lib/validation';

const formSchema = z.object({
    newPassword: zPassword,
    confirmPassword: zPassword,
}).refine(
    (data) => data.newPassword === data.confirmPassword,
    {
        message: 'Passwords do not match',
        path: ['confirmPassword'],
    },
);

type FormInputs = z.infer<typeof formSchema>;

export default function ResetPassword() {
    const searchParams = useSearchParams();
    const token = searchParams.get('token');
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormInputs>({
        resolver: zodResolver(formSchema),
    });
    
    const onSubmit = async (inputs: FormInputs) => {
        if (!token) {
            toast.error('Invalid token');
            return;
        }
        const { error } = await authClient.resetPassword({
            newPassword: inputs.newPassword,
            token,
        });
        if (error) {
            toast.error(error.message);
            return;
        }
        router.push('/login');
    };
    
    return (
        <>
            <h1 className="text-primary text-lg">Create a new password</h1>
            <p>
                You may reset your password here.
            </p>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                <div>
                    <label htmlFor="new-password" className="text-sm">New Password</label>
                    <Input
                        id="new-password"
                        {...register('newPassword')}
                        placeholder="Enter New Password"
                        aria-invalid={errors.newPassword ? 'true' : 'false'}
                    />
                    {errors.newPassword && (
                        <span className="text-negative text-sm">{errors.newPassword.message}</span>
                    )}
                </div>
                <div>
                    <label htmlFor="confirm-password" className="text-sm">Confirm Password</label>
                    <Input
                        id="confirm-password"
                        {...register('confirmPassword')}
                        placeholder="Confirm New Password"
                        aria-invalid={errors.confirmPassword ? 'true' : 'false'}
                    />
                    {errors.confirmPassword && (
                        <span className="text-negative text-sm">{errors.confirmPassword.message}</span>
                    )}
                </div>
                <Button type="submit">
                    Reset Password
                </Button>
            </form>
        </>
    );
}