import Header from "../header/Header";

export default function Layout({ children } : {children:any}) {
    return (
        <div className="min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
            <Header />
            <main className="flex items-center justify-center">
                    {children}
            </main>
        </div>
    )
}
