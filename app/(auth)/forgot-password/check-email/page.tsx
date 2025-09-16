'use client';
import { MailCheck } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { z } from 'zod';
import { authClient } from '@/lib/client.ts';
import { toast } from 'sonner';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

export default function ForgotPasswordEmail() {
    const searchParams = useSearchParams();
    const emailParam = searchParams.get('email');
    const parsedEmailParam = z.email().safeParse(emailParam);
    const email = parsedEmailParam.success ? parsedEmailParam.data : null;
    const [resendDisabled, setResendDisabled] = useState<boolean>(false);
    
    const resendForgotPasswordEmail = async (email: string) => {
        if (resendDisabled) {
            toast.error('Please wait before resending the email');
            return;
        }
        const { data, error } = await authClient.forgetPassword({
            email: email,
            redirectTo: '/reset-password',
        });
        if (error) {
            toast.error('Something went wrong');
            return;
        }
        if (data) {
            setResendDisabled(true);
            toast.success('Verification email sent successfully');
        }
    };
    
    useEffect(() => {
        const timer = setTimeout(() => {
            setResendDisabled(false);
        }, 30000); // 30 seconds
        return () => clearTimeout(timer);
    }, [resendDisabled]);
    
    return (
        <>
            {!email && <>
                <h1 className="text-primary text-lg">Oops! Something went wrong</h1>
                <p>We couldn&#39;t find your email address. Please try again.</p>
            </>}
            {email && <>
                <h1 className="text-primary text-lg">Check your mail</h1>
                <p>
                    We have sent password recovery instructions to your email.
                </p>
                <MailCheck className="mx-auto size-16" strokeWidth={1}/>
                <p className="text-muted text-sm text-center">Didn&#39;t receive the email? Check your spam folder
                    or{' '}
                    <span
                        className={cn(
                            'text-primary cursor-pointer',
                            resendDisabled && 'text-primary-loading cursor-default',
                        )}
                        onClick={() => resendForgotPasswordEmail(email)}
                    >
                    resend
                </span>.
                </p>
            </>}
        </>
    );
}