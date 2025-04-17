export default function Home() {
    return (
        <main className="flex flex-col items-center p-l">
            <div className="w-full max-w-[1920px]">
                <h1 className="text-4xl font-bold mb-m">Welcome to Our Platform</h1>
                
                <section className="mb-xl">
                    <h2 className="text-3xl font-semibold mb-s">Lorem Ipsum Dolor</h2>
                    <p className="text-m mb-xs">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam pulvinar
                        risus a risus hendrerit, in pulvinar lacus tincidunt. Cras sagittis
                        erat sit amet diam malesuada, at porttitor lorem efficitur.
                    </p>
                    <p className="text-m mb-s">
                        Praesent auctor sagittis nulla, sit amet rhoncus libero varius vitae.
                        Nulla facilisi. Suspendisse potenti. Donec tincidunt justo sed leo tincidunt,
                        in auctor est tempor.
                    </p>
                    
                    <div className="pl-m border-l-2 border-primary/20 my-m">
                        <p className="text-l italic">
                            &quot;Vestibulum ante ipsum primis in faucibus orci luctus et ultrices
                            posuere cubilia curae; Sed at massa vel nunc commodo.&quot;
                        </p>
                    </div>
                </section>
                
                <section className="mb-xl">
                    <h2 className="text-2xl font-semibold mb-s">Key Features</h2>
                    
                    <div className="mb-m">
                        <h3 className="text-xl font-medium mb-2xs">Feature One</h3>
                        <p className="text-s">
                            Maecenas fringilla magna eu dictum finibus. Suspendisse potenti.
                            Etiam efficitur magna non metus molestie, vel bibendum nisl commodo.
                        </p>
                    </div>
                    
                    <div className="mb-m">
                        <h3 className="text-xl font-medium mb-2xs">Feature Two</h3>
                        <p className="text-s">
                            Pellentesque habitant morbi tristique senectus et netus et malesuada
                            fames ac turpis egestas. Integer tempus justo vel quam venenatis.
                        </p>
                    </div>
                    
                    <div className="mb-m">
                        <h3 className="text-xl font-medium mb-2xs">Feature Three</h3>
                        <p className="text-s">
                            Curabitur elementum metus eu magna mattis, vel finibus erat tincidunt.
                            Vivamus gravida eu lacus sit amet lacinia.
                        </p>
                    </div>
                </section>
                
                <section>
                    <h2 className="text-2xl font-semibold mb-s">Additional Information</h2>
                    <p className="text-xs mb-3xs text-muted-foreground">Last updated: June 2023</p>
                    <p className="text-m mb-xs">
                        Fusce at massa est. Curabitur dictum magna non nunc mollis, vitae
                        molestie nisi efficitur. Nunc faucibus libero vitae lectus vehicula,
                        vel convallis magna cursus.
                    </p>
                    <p className="text-m">
                        Aliquam erat volutpat. In id augue felis. Morbi id mollis purus.
                        Suspendisse efficitur lacinia magna, quis molestie sem finibus id.
                        Donec id mattis tellus, in vehicula dui.
                    </p>
                </section>
            </div>
        </main>
    );
}