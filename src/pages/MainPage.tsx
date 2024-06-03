import { useEffect, useState } from "react";
import { CardList } from "../components/CardList";
import { Header } from "../components/Header";
import { getUser } from "../services/users.service";
import { useParams } from "react-router-dom";
import { useLoading } from "../Contexts/LoadingContext";
import { Spinner } from "../components/Spinner";

interface User {
    avatar_url: string;
    name: string;
    bio: string;
}

export function MainPage() {
    const [data, setData] = useState<User>();

    const {username} = useParams();
    
    const {isLoading, setLoadingState} = useLoading();

    const getData = async () => {
        try {
            setLoadingState(true)
            const response = await getUser(username!);
            setData(response);
            setLoadingState(false)
        } catch (error) {
            throw new Error(error as string);
        }
    }

    useEffect(() => {
        getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    
    return (
        <main>
            <Header />
            <div className="pl-auto">
                <section className="px-72 py-10">
                    <h1 className="font-bold text-4xl mb-12">Informações do perfil</h1>
                    <div className="border rounded-2xl flex w-3/5">
                        <img src={data?.avatar_url} alt="foto do usuário" className="h-36 w-36 mx-6 my-5 rounded-md"/>
                        <div className="flex flex-col my-5 mx-5">
                            <span className="mb-2 text-gray-400">Nome</span>
                            <span className="font-semibold mb-9">{data?.name}</span>
                            <span className="mb-2 text-gray-400">Bio</span>
                            <p className="font-medium">{data?.bio}</p>
                        </div>
                    </div>
                </section>
                <section className="px-72 py-5">
                    <h1 className="font-bold text-4xl mb-12">Repositórios</h1>
                    {isLoading ? (
                        <div className="my-10 flex justify-center items-start">
                            <Spinner />
                        </div>
                    ) : <CardList />}
                </section>
            </div>
            
        </main>
        
        
    )
}