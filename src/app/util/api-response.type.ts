export type ApiResponse = {
    name: string,
    sprites: {
        front_default: string,
    },
    weight: number,
    types: Array<{
        type: {
            name: string;
        }
    }>
};

const fetchPokemon = async (id: number): Promise<ApiResponse> => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    return response.json();
};

fetchPokemon(1).then((data) => {
    console.log(data);
})