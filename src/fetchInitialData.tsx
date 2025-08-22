import {useSetAtom} from "jotai";
import {petsAtom} from "./states/pets.ts"
import {useEffect} from "react";
import {petApi} from "./URL/petApi.ts";

export function useFetchInitialData(){
    const setPets = useSetAtom(petsAtom)

    useEffect(() =>{
        fetch(petApi.getPetsUrl).
        then(result =>{
            result.json().then(data =>{
                setPets(data)
            })
        })
    }, [])
}