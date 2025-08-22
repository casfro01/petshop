import {useNavigate, useParams} from "react-router";
import type {pet, petIDParameter} from "./PetDetails.tsx";
import {useAtom} from "jotai";
import {petsAtom} from "./states/pets.ts";
import toast from "react-hot-toast";
import {petApi} from "./URL/petApi.ts";

export default function BuyPet(){
    const [pets, setPets] = useAtom(petsAtom)
    const params = useParams<petIDParameter>()

    const navigator = useNavigate();

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const currentPet: pet = pets.find(pet => pet.id === params.petID);

    return <>
        <header>
            <title>Buy Pet</title>
        </header>
        <div className="m-5">
            Insert credit card information
        </div>
        <div>
            <button className="btn btn-primary m-5" onClick={() =>{
                const dupePet: pet = {
                    id: currentPet.id,
                    name: currentPet.name,
                    imgurl: currentPet.imgurl,
                    breed: currentPet.breed,
                    sold: true
                }
                const bool = buyPet(dupePet)
                bool.then(bool => {
                    if (bool) {
                        const duplicate = [...pets]
                        const index = duplicate.findIndex(_p => _p.id === currentPet.id)
                        duplicate[index] = dupePet
                        setPets(duplicate)
                        navigator("/pet")
                    }
                })

            }}>Confirm</button>
            <button className="btn btn-error m-5" onClick={() => {
                navigator("/pet")
                toast.error("Purchase cancelled.")
            }}>Cancel</button>
        </div>
    </>
}

async function buyPet(p: pet): Promise<boolean>{
    const confirm: boolean = window.confirm("Are you sure you want to buy: " + p.name + "?")
    if (confirm){
        return await fetch(petApi.getUpdateUrl, {
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(p),
        }).then(response => {
            if (response.ok) {
                toast.success("Pet bought.");
                return true
            }
            else{
                toast.error("Failed to buy pet.")
                return false
            }
        })
    }
    else{
        toast.error("Abandoned purchase!")
        return false
    }
}