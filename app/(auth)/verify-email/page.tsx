'use client';
import { MailCheck } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { z } from 'zod';
import { authClient } from '@/lib/client.ts';
import { toast } from 'sonner';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

export default function VerifyEmail() {
    const searchParams = useSearchParams();
    const emailParam = searchParams.get('email');
    const parsedEmailParam = z.email().safeParse(emailParam);
    const email = parsedEmailParam.success ? parsedEmailParam.data : null;
    const [resendDisabled, setResendDisabled] = useState<boolean>(false);
    
    const resendVerificationEmail = async (email: string) => {
        if (resendDisabled) {
            toast.error('Please wait before resending the email');
            return;
        }
        const { data, error } = await authClient.sendVerificationEmail({
            email,
        });
        if (error) {
            toast.error('Failed to send verification email');
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
                <h1 className="text-primary text-lg">Verify your email</h1>
                <p>
                    We sent a verification link to your email address. Please check your inbox and click the link to
                    verify
                    your email.
                </p>
                <MailCheck className="mx-auto size-16" strokeWidth={1}/>
                <p className="text-muted text-sm text-center">Didn&#39;t receive the email? Check your spam folder
                    or{' '}
                    <span
                        className={cn(
                            'text-primary cursor-pointer',
                            resendDisabled && 'text-primary-loading cursor-default',
                        )}
                        onClick={() => resendVerificationEmail(email)}
                    >
                    resend
                </span>.
                </p>
            </>}
        </>
    );
}