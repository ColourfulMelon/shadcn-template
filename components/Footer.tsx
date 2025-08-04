import Image from 'next/image';
export default function Footer(){
    return(
        <footer className="bg-primary p-4">
            <p>Footer</p>
            
            <a
                className="self-center text-xs text-muted-foreground flex items-center gap-1"
                href="https://dev3.studio/"
            >
                Made with ❤️ by{' '}
                <Image
                    src={'https://cdn.dev3.studio/logo.svg'}
                    alt={'Dev3 Studio Logo'}
                    className="h-2 w-auto"
                    width={300}
                    height={62}
                />
            </a>
        </footer>
    )
}