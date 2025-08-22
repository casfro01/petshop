import type {pet} from "../PetDetails.tsx";
import {petApi} from "../petApi.ts";
import toast from "react-hot-toast";
import {useState} from "react";
import {useAtom} from "jotai";
import {petsAtom} from "../states/pets.ts";
import {useNavigate} from "react-router";
import {useParams} from "react-router";

export type PetIDParameter ={
    petID: string;
}

export default function PetEditForm(){
    const navigator = useNavigate();

    const [pets, setPets] = useAtom(petsAtom);
    const params = useParams<PetIDParameter>()
    const currentPet: pet = pets.find(p => p.id === params.petID)


    const [petName, setName] = useState(currentPet.name);
    const [petBreed, setBreed] = useState(currentPet.breed);
    const [petSold, setSold] = useState(currentPet.sold);
    const [petUrl, setUrl] = useState(currentPet.imgurl);

    return <>
        <header><title>Create Pet</title></header>
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Edit: {currentPet.name}</h1>
                    <p className="py-6">
                        Tell us about your companion to set up their profile. Enter the <b>name</b> and <b>breed</b>, then paste a <b>link</b> to a clear photo hosted online. This information allows us to display your pet across the site and support you with relevant care guidance.
                    </p>
                </div>
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <div className="card-body">
                        <fieldset className="fieldset">
                            <label className="label">Name</label>
                            <input className="input" placeholder={currentPet.name} onChange={curr => {
                                if (curr.target.value === "") {
                                    setName(currentPet.name)
                                }
                                else {
                                    setName(curr.target.value)
                                }
                            }} />
                            <label className="label">Breed</label>
                            <input className="input" placeholder={currentPet.breed} onChange={curr => {
                                if (curr.target.value === "") {
                                    setBreed(currentPet.breed)
                                }
                                else {
                                    setBreed(curr.target.value)
                                }
                            }}/>
                            <label className="label">Sold</label>
                            <input className="checkbox" type="checkbox" checked={petSold} onChange={curr => {
                                setSold(!petSold)
                            }} />
                            <label className="label">URL</label>
                            <input className="input" placeholder={currentPet.imgurl} onChange={curr => {
                                if (curr.target.value === "") {
                                    setUrl(currentPet.imgurl)
                                }
                                else {
                                    setUrl(curr.target.value)
                                }
                            }} />
                            <button className="btn btn-success mt-4" onClick={async () =>{
                                const pet = updatePet({
                                    id: currentPet.id,
                                    name: petName,
                                    breed: petBreed,
                                    imgurl: petUrl,
                                    sold: petSold
                                })
                                pet.then(
                                    p => {
                                        if (p) {
                                            const duplicate = [...pets]
                                            const index = duplicate.findIndex(_p => _p.id === p.id)
                                            duplicate[index] = p
                                            setPets(duplicate)
                                            navigator("/pet")
                                        }})
                            }
                            }>Submit</button>
                            <button className="btn btn-warning" onClick={() =>{
                                toast("Edit canceled.")
                                navigator("/pet")
                            }
                            }>Cancel</button>
                            <button className="btn btn-error" onClick={async ()=>{
                                const deleted = await deletePet(currentPet)
                                if (!deleted) {return}
                                const duplicate = [...pets]
                                const index = duplicate.findIndex(p => p.id === currentPet.id)
                                duplicate.splice(index, 1)
                                setPets(duplicate)
                                navigator("/pet")
                            }}>Delete</button>
                        </fieldset>
                    </div>
                </div>
            </div>
        </div>
    </>
}

async function updatePet(p: pet): Promise<Pet>{
    return await fetch(petApi.getUpdateUrl, {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(p),
    }).then(response => {
        if (response.ok) {
            toast.success("Pet updated successfully.", {});
        } else {
            toast.error("Pet update failed.");
        }
        return response.json() as pet
    })
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