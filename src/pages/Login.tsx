import { useEffect, useState } from "react";
import {  getUser } from "../services/users.service";
import { useNavigate } from "react-router-dom";

export function Login() {
    const[search, setSearch] = useState("");
    const [check, setCheck] = useState(false);
    const [username, setUsername] = useState("");

    const navigate = useNavigate();

    const searchUser = async () => {
        try {
            console.log("Buscando User");
            const response = await getUser(username) 
            console.log(response);
            if(response) {
                console.log("user encontrado")
                navigate(`/main/${username}/repos`);
            } else {
                setCheck(true);
            }
        } catch (error) {
            setCheck(true)
        }
    }

    useEffect(() => {
        if(username) 
            searchUser()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [username]);

    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        setUsername(search)
        setCheck(false)
    }

    return (
        <div className="flex">
            <div className="bg-blue-700 w-3/5 h-screen flex justify-center items-center">
                <img src="src\assets\github.png" alt="github image" className="w-80 h-80"/>
            </div>
            <div className="w-2/5 h-screen flex flex-col justify-center items-center">
                {check && (
                    <div className="bg-orange-500 rounded-lg w-1/2 h-20 flex justify-center flex-col pl-12">
                        <span className="font-bold text-white">Ops!</span>
                        <p className="text-white text-xs">Não conseguimos identificar sua conta</p>
                    </div>
                )}
                <span className="text-gray-700 text-4xl font-bold font-sans py-7">Entrar</span>
                <form action="" method="get" className="flex flex-col" onSubmit={handleSubmit}>
                    <label htmlFor="user">Usuário</label>
                    <input onChange={(e) => setSearch(e.target.value)} type="text" name="user" placeholder="Digite aqui seu usuário do GitHub" className="border-2 rounded w-96 h-10 shadow focus:outline-none hover:shadow-md ease-in-out duration-300 pl-4 mt-2" />
                    <input type="submit" className="bg-blue-700 rounded w-96 h-10 mt-5 font-bold text-white shadow hover:scale-105 cursor-pointer ease-in-out duration-200"/>
                </form>
            </div>
        </div> 
    )
}