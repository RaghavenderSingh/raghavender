export function BackgroundPattern() {
    return (
        <>
            <div className="fixed inset-0 -z-50 h-full w-full bg-background" />
            <div className="fixed inset-0 -z-40 h-full w-full">
                <div className="h-full w-full">
                    <div className="col-start-1 row-span-full row-start-1 h-full w-full bg-[image:repeating-linear-gradient(315deg,_var(--pattern-fg)_0,_var(--pattern-fg)_1px,_transparent_0,_transparent_50%)] bg-[size:10px_10px] bg-fixed [--pattern-fg:var(--color-black)]/5 dark:[--pattern-fg:var(--color-white)]/10" />
                </div>
            </div>
        </>
    );
}
