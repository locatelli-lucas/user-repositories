import { getRepos } from "../services/users.service";
import { useParams } from "react-router-dom";
import { Card } from "./Card";
import { useEffect, useRef, useState } from "react";
import img from "../assets/arrow.png"

interface Repo {
    name: string;
    html_url: string;
    description: string;
}

export function CardList() {
    const carousel = useRef<HTMLDivElement>(null);

    const [repos, setRepos] = useState<Repo[]>([]);
    
    const {username} = useParams();

    const getUserRepos = async () => {
        try {
            const response = await getRepos(username!);
            setRepos(response);
        } catch (error) {
            throw new Error(error as string);
        }
    }

    useEffect(() => {
        getUserRepos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleLeftClick = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        carousel.current!.scrollLeft -= carousel.current!.offsetWidth
    }

    const handleRightClick = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        carousel.current!.scrollLeft += carousel.current!.offsetWidth
    }

    return (
        <div>
            <div className="flex justify-end mb-5 w-11/12">
                <button className="w-10 h-10 rotate-180" onClick={handleLeftClick}><img src={img} alt="left arrow" /></button>
                <button className="w-10 h-10 ml-4" onClick={handleRightClick}><img src={img} alt="right arrow" /></button>
            </div>
            <div className="w-11/12 flex gap-6 overflow-auto scroll-smooth overflow-x-hidden py-4 px-3" ref={carousel}>  
                {repos.map(({name, html_url, description}) => ( 
                    <Card key={name} id={name} name={name} html_url={html_url} description={description}/>
                ))} 
            </div>
        </div>
    )
}