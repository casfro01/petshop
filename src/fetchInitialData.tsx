import {useSetAtom} from "jotai";
import {petsAtom} from "./states/pets.ts"
import {useEffect} from "react";

export function useFetchInitialData(){
    const setPets = useSetAtom(petsAtom)

    useEffect(() =>{
        fetch("https://api-divine-grass-2111.fly.dev/GetPets").
        then(result =>{
            result.json().then(data =>{
                setPets(data)
            })
        })
    }, [])
}