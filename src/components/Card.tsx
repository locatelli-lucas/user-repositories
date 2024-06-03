import { useNavigate, useParams } from "react-router-dom";

interface Repo {
    id: string;
    name: string;
    html_url: string;
    description: string;
}

export function Card({name, html_url, description}: Repo) {
    const navigate = useNavigate();

    const {username} = useParams();

    return (
        <div role="button" onClick={() => navigate(`/main/${username}/repos/${name}`)} className="w-1/3 border rounded-lg hover:shadow-xl hover:scale-105 hover:ease-in-out transition duration-300 shadow-lg">
            <h1 className="my-7 mx-10 font-semibold">{name}</h1>
            <hr className="border-blue-500"/>
            <div className="h-64 flex flex-col justify-center">
                <div className="flex flex-col justify-center border-none my-5 mx-10 px-5 rounded-3xl bg-gray-100">
                    <span className="ml-1 my-2 text-xs text-slate-400">Link</span>
                    <a href={html_url} className="ml-1 mb-2 truncate font-semibold hover:underline">Link para o repositório no Github</a>
                </div>
                <div className="flex flex-col border-none my-5 mx-10 rounded-3xl bg-gray-100 h-16">
                    <span className="ml-5 my-2 text-xs text-slate-400">Descrição</span>
                    <p className="mx-5 truncate font-medium text-gray-800">
                        {description == null ? "Não possui descrição" : description}
                    </p>
                </div>
            </div>
        </div>
    )
}