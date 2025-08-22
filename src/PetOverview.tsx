import {useAtom} from "jotai";
import {petsAtom} from "./states/pets.ts";
import type {pet} from "./PetDetails.tsx";
import toast from "react-hot-toast";
import {petApi} from "./petApi.ts";

export default function PetOverview() {
    const [pets, setPets] = useAtom(petsAtom)
    return <>
        <header><title>Pets Overview</title></header>
        <div className="container justify-items-center">
        {
            pets.map(pet => {
                return <>
                    <br/>
                <div className="card bg-base-100 w-96 shadow-sm">
                    <figure>
                        <img
                            src={pet.imgurl}
                            alt="Pet" />
                    </figure>
                    <div className="card-body">
                        <h2 className="card-title">{pet.name}</h2>
                        <p>Breed: {pet.breed}</p>
                        <p className={pet.sold ? "text-green-400" : "text-red-400"}>Sold: {pet.sold ? "Yes" : "No"}</p>
                        <div className="card-actions justify-start">
                            <button className="btn btn-primary" disabled={pet.sold}>Buy Now</button>
                            <div className="w-33"></div>
                            <button className="btn btn-error justify-end" onClick={async ()=>{
                                const deleted = await deletePet(pet)
                                if (!deleted) {return}
                                const duplicate = [...pets]
                                const index = duplicate.findIndex(p => p.id === pet.id)
                                duplicate.splice(index, 1)
                                setPets(duplicate)
                            }}>Delete</button>
                        </div>
                    </div>
                </div>
                    <br/>
                </>
            })
        }
        </div>
    </>
}

async function deletePet(p: pet): Promise<boolean>{
    const confirm: boolean = window.confirm("Are you sure you want to delete: " + p.name + "?")
    if (confirm){
        // apparently you make queries with '?' followed by the parameter like omfg
        return await fetch(petApi.getDeleteUrl + "?id=" + p.id, {
            method: "DELETE",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(p),
        }).then(response => {
            if (response.ok) {
                toast.success("Pet deleted.");
                return true
            }
            else{
                toast.error("Failed to delete pet.")
                return false
            }
        })
    }
    else{
        toast.error("Abandoned deletion!")
        return false
    }
}