import { useNavigate, useParams } from "react-router-dom";
import { Header } from "../components/Header";
import { useEffect, useState } from "react";
import { getRepoById } from "../services/users.service";
import { useLoading } from "../Contexts/LoadingContext";
import { Spinner } from "../components/Spinner";

interface RepoDetailed {
    name: string;
    html_url: string;
    language: string;
    description: string;
    private: boolean;
}

export function Repo() {
    const [repos, setRepos] = useState<RepoDetailed>();

    const {isLoading, setLoadingState} = useLoading();

    const {username, repoName} = useParams();

    const navigate = useNavigate()

    const getUserRepo = async () => {
        try {
            setLoadingState(true);
            const response = username && repoName && await getRepoById(username, repoName);
            setRepos(response!);
            setLoadingState(false);
        } catch (error) {
            throw new Error(error as string);
        }
    }

    useEffect(() => {
        getUserRepo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <main>
            <Header />
            <h1 className="font-bold text-4xl mb-12 px-72 py-10">Especificações</h1>
            {isLoading ? (
                <div className="my-10 flex justify-center items-start">
                    <Spinner />
                </div>
            ) : 
                <section className="flex justify-center">
                    <div className="border w-5/12 rounded-xl shadow-2xl">
                        <div className="flex justify-between">
                            <h3 className="my-7 mx-10 font-semibold">{repos?.name}</h3>
                            <button onClick={() => navigate(`/main/${username}/repos`)} className="my-7 mx-10">✖️</button>
                        </div>
                        <hr className="w-10/12 mx-auto"/>
                        <div className="flex flex-col justify-center border-none my-5 mx-20 px-5 rounded-2xl bg-gray-100 mb-8">
                            <span className="ml-1 my-2 text-xs text-slate-400">Link</span>
                            <a href={repos?.html_url} className="ml-1 mb-2 font-semibold hover:underline">{repos?.html_url}</a>
                        </div>
                        <div className="flex flex-col justify-center border-none border my-5 mx-20 px-5 rounded-2xl bg-gray-100 mb-8">
                            <span className="ml-1 my-2 text-xs text-slate-400">Privacidade</span>
                            <span className="mx-1 font-medium text-gray-800 mb-2">{repos?.private ? "Privado" : "Público"}</span>
                        </div>
                        <div className="flex flex-col justify-center border-none border my-5 mx-20 px-5 rounded-2xl bg-gray-100 mb-8">
                            <span className="ml-1 my-2 text-xs text-slate-400">Linguagem</span>
                            <span className="mx-1 font-medium text-gray-800 mb-2">{repos?.language}</span>
                        </div>
                        <div className="flex flex-col justify-center border-none border my-5 mx-20 px-5 rounded-2xl bg-gray-100 mb-8">
                            <span className="ml-1 my-2 text-xs text-slate-400">Descrição</span>
                            <p className="mx-1 font-medium text-gray-800 mb-2">{repos?.description == null ? "Sem descrição" : repos?.description}</p>
                        </div>
                    </div>
                </section>
            }
                
        </main>
    )
}



