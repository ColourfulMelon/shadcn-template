import Link from 'next/link';
import { ReactNode, Suspense } from 'react';
import { Card } from '@/components/ui/card';

export default function SecondaryAuthLayout({ children }: { children: ReactNode }) {
    return (
        <Card className="flex flex-col gap-y-2 max-w-[600px] h-fit p-4 mx-auto my-auto">
            <div className="flex justify-between">
                {/*<BackChevronButton/>*/}
                <Link href={'/support'} className="text-primary cursor-pointer">Need help?</Link>
            </div>
            <Suspense>
                {children}
            </Suspense>
        </Card>
    );
}