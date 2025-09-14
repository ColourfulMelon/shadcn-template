"use client";
import { Button } from '@/components/ui/button.tsx';
import { Loader2, Mail } from 'lucide-react';
import {siGooglechrome} from 'simple-icons';
import { Label } from '@/components/ui/label.tsx';
import { Input } from '@/components/ui/input.tsx';
import React, { useState } from 'react';
import { Card } from '@/components/ui/card.tsx';
import { authClient } from '@/lib/client.ts';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export function LoginCard(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    
    const router = useRouter();
    
    const handleAuthSuccess = () => {
        setError(null);
        setEmail('');
        setPassword('');
        setIsLoading(false);
    };
    
    const handleAuthError = (err: Error) => {
        console.error('Authentication error:', err);
        setError(err.message || 'An unknown error occurred.');
        setIsLoading(false);
    };
    
    const handleEmailSignIn = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email || !password) {
            setError('Please enter both email and password.');
            return;
        }
        setError(null);
        
        await authClient.signIn.email({
            email,
            password,
            callbackURL: "/account",
        }, {
            onRequest: () => setIsLoading(true),
            onSuccess: () => {
                handleAuthSuccess();
            },
            onError: (ctx) => {
                handleAuthError(ctx.error);
            },
        });
    };
    
    const handleEmailSignUp = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email || !password) {
            setError('Please enter both email and password.');
            return;
        }
        setError(null);
        const name = email.split('@')[0];
        
        await authClient.signUp.email({
            email,
            password,
            name,
            // callbackURL: emailCallbackUrl, // For email verification redirect
        }, {
            onRequest: () => setIsLoading(true),
            onSuccess: () => {
                toast.success('Account created successfully!');
                handleAuthSuccess();
            },
            onError: (ctx) => {
                console.error('Sign up error:', ctx.error);
                handleAuthError(ctx.error);
            },
        });
    };
    
    const handleOAuthSignIn = async (provider: 'google' | 'twitter' | 'github') => { // Added github example based on docs
        setError(null);
        setIsLoading(true);
        
        try {
            await authClient.signIn.social({
                provider,
                callbackURL: "/account",
                newUserCallbackURL: "/details",
            });
        } catch (err) {
            handleAuthError(err instanceof Error ? err : new Error('OAuth failed'));
        }
    };
    
    const handleSignOut = async () => {
        
        try {
            await authClient.signOut();
        } catch (err) {
            handleAuthError(err instanceof Error ? err : new Error('Sign out failed'));
        }
        
        // redirect to login page
        router.push('/login');
    };
    
    const OAUTH_PROVIDERS = [
        { id: 'google' as const, name: 'Google', icon: siGooglechrome },
        // { id: 'twitter' as const, name: 'Twitter', icon: TwitterIcon },
    ];
    
    return(
        <Card className="grid gap-4 p-6">
            {/* Error Display */}
            {error && (
                <p className="text-sm text-center font-medium text-red-600 dark:text-red-500">
                    {error}
                </p>
            )}
            
            {/* OAuth Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {OAUTH_PROVIDERS.map((provider) => (
                    <Button
                        key={provider.id}
                        variant="outline"
                        onClick={() => handleOAuthSignIn(provider.id)}
                        disabled={isLoading}
                        className="w-full"
                    >
                        {isLoading ? (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
                        ) : (
                            // <provider.icon.svg className="mr-2 h-4 w-4"/>
                            <provider.icon.svg/>
                        )}
                        {provider.name}
                    </Button>
                ))}
            </div>
            
            {/* Separator */}
            <div className="relative my-2">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t"/>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-background px-2 text-muted-foreground">
                                Or continue with email
                            </span>
                </div>
            </div>
            
            {/* Email/Password Form */}
            <form onSubmit={handleEmailSignIn} className="grid gap-3">
                <div className="grid gap-1.5">
                    <Label htmlFor="email-signin">Email</Label> {/* Unique ID */}
                    <Input
                        id="email-signin"
                        type="email"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        disabled={isLoading}
                        autoComplete="email"
                    />
                </div>
                <div className="grid gap-1.5">
                    <div className="flex justify-between">
                        <Label htmlFor="password-signin">Password</Label> <a href="/forgot-password"
                                                                             className="underline text-muted-foreground text-sm">Forgot
                        Password?</a>
                    </div>
                    <Input
                        id="password-signin"
                        type="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        disabled={isLoading}
                        autoComplete="current-password"
                    />
                </div>
                {/* Submit/Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-2 mt-3">
                    <Button
                        type="submit"
                        disabled={isLoading || !email || !password}
                        className="flex-1"
                    >
                        {isLoading ? (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
                        ) : (
                            <Mail className="mr-2 h-4 w-4"/>
                        )}
                        Log In
                    </Button>
                    
        
                </div>
                
            </form>
            <p className="mx-auto w-fit text-sm">Dont have an account? <Link
                className="text-primary font-bold" href={'/signup'}>Sign Up</Link></p>
        </Card>
    )
}