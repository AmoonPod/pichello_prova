export default function ScrittaPiccolina({ children, white }: { children: string, white?: boolean }) {
    return <h2 className={`text-sm font-thin italic ${white ? "text-white" : "text-secondary"}`}>
        {children}
    </h2>
}