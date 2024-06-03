import Logo from "../assets/github.png"

export function Header() {
    return (
        <>
            <div className="flex justify-between bg-blue-700 h-24">
                <div className="flex h-24 ml-8">
                    <img src={Logo} alt="github logo" className="w-20 h-18 my-auto"/>
                    <h2 className="pt-7 pl-1 text-2xl">MyRepo</h2> 
                </div>
                <a href="/" className="mt-9 mx-16 font-bold">Pesquisar 🔎</a>
            </div>
        </>
        
        
    )
}