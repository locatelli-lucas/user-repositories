

export async function getUser(username: string) {
    try {
        const response = await fetch(`https://api.github.com/users/${username}`);
        if (!response.ok) {
            throw new Error(`Erro ao buscar usuário: ${response.statusText}`);
        }
        const json = await response.json();
        return json;
    } catch (error) {
        throw new Error(error as string);
    }
}

export async function getRepos(username: string) {
    try {
       const response = await fetch(`https://api.github.com/users/${username}/repos`)
       if(!response.ok)
        throw new Error(`Erro ao buscar usuário: ${response.statusText}`);
       const json = await response.json();
       return json;
    } catch (error) {
        throw new Error(error as string);
    }
}

export async function getRepoById(username: string, repoName: string) {
    try {
        const response = await fetch(`https://api.github.com/repos/${username}/${repoName}`)
        if(!response.ok)
            throw new Error(`Erro ao buscar repositório: ${response.statusText}`)
        const json = await response.json();
        console.log(json);
        return json;
    } catch (error) {
        throw new Error(error as string);
    }
}

