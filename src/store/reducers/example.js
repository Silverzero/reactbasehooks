import axios from 'axios'

// Constants
const initialData = {
    data : [],
    offset: 0,
    index: null
}

const GET_POKEMONS = 'GET_POKEMONS'
const GET_NEXT_POKEMONS = 'GET_NEXT_POKEMONS'
const INDEX_POKEMON = 'INDEX_POKEMON'

// Reducers
export default function pokemonReducer(state = initialData, action){
    
    switch(action.type){
        case GET_POKEMONS:
            return {...state, data: action.payload}
        case GET_NEXT_POKEMONS:
            return {...state, data: action.payload.data, offset : action.payload.offset }
        case INDEX_POKEMON:
            return {...state, index: action.payload}    
        default:
            return {...state}
    }

}

// Actions
export const getPokemonsAction = () => async (dispatch, getState) => {
    try{
        
        const params   = getState().pokemons
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=${params.offset}&limit=${params.limit}`)
        dispatch({
            type: GET_POKEMONS,
            payload: response.data.results
        })
    } catch (error) {
        console.log(error);
    }
}

export const getNextPokemonsAction = (limit) => async (dispatch, getState) => {
    try{
        
        const params   = getState().pokemons
        const next     = params.offset + limit
        let response
        
        if(localStorage.getItem(`getPokemon.offset.${params.offset}`))
            response = JSON.parse(localStorage.getItem(`getPokemon.offset.${params.offset}`))
        else{
            response = await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=${params.offset}&limit=${limit}`)
            localStorage.setItem(`getPokemon.offset.${params.offset}`, JSON.stringify(response))
        }

        

        dispatch({
            type: GET_NEXT_POKEMONS,
            payload: {
                data: response.data.results,
                offset: next
            }
        })
    } catch (error) {
        console.log(error);
    }
}

export const getBeforePokemonsAction = (limit) => async (dispatch, getState) => {
    try{
        
        const params   = getState().pokemons
        const before   = (params.offset - (limit * 2) >= 0) ? params.offset - (limit * 2) : 0

        let response

        if(localStorage.getItem(`getPokemon.offset.${before}`))
            response = JSON.parse(localStorage.getItem(`getPokemon.offset.${before}`))
        else
            response = await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=${before}&limit=${limit}`)

        localStorage.setItem(`getPokemon.offset.${before}`, JSON.stringify(response))

        dispatch({
            type: GET_NEXT_POKEMONS,
            payload: {
                data: response.data.results,
                offset: before
            }
        })
    } catch (error) {
        console.log(error);
    }
}

export const getPokemon = (url) => async (dispatch, getState) => {
    
    let response

    if(localStorage.getItem(url)){
        console.log("entro")
        response = JSON.parse(localStorage.getItem(url))
    }else{
        response = await axios.get(url)
        localStorage.setItem(url, JSON.stringify(response))
    }

    dispatch({
        type: INDEX_POKEMON,
        payload: response.data
    })

}