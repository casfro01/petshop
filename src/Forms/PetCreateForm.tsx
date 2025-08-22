import {useState} from "react";
import {petApi} from "../URL/petApi.ts";
import {petsAtom} from "../states/pets.ts";
import {useAtom} from "jotai";
import toast from "react-hot-toast";
import type {pet} from "../PetDetails.tsx";
import {useNavigate} from "react-router";

export interface PetCreateDto{
    name: string
    breed: string
    imgurl: string
}



export default function PetCreateForm(){
    const [petName, setName] = useState("");
    const [petBreed, setBreed] = useState("");
    const [petUrl, setUrl] = useState("");
    const [pets, setPets] = useAtom(petsAtom);
    const navigator = useNavigate();
    return <>
        <header><title>Create Pet</title></header>
        <div className="hero bg-base-300 min-h-screen">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Add a New Pet</h1>
                    <p className="py-6">
                        Tell us about your companion to set up their profile. Enter the <b>name</b> and <b>breed</b>, then paste a <b>link</b> to a clear photo hosted online. This information allows us to display your pet across the site and support you with relevant care guidance.
                    </p>
                </div>
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <div className="card-body">
                        <fieldset className="fieldset">
                            <label className="label">Name</label>
                            <input className="input" placeholder="Name" onChange={curr => setName(curr.target.value)} />
                            <label className="label">Breed</label>
                            <input className="input" placeholder="Breed" onChange={curr => setBreed(curr.target.value)}/>
                            <label className="label">URL</label>
                            <input className="input" placeholder="URL" onChange={curr => setUrl(curr.target.value)} />
                            <button className="btn btn-neutral mt-4" onClick={async () =>{
                                const pet = create({
                                    name: petName,
                                    breed: petBreed,
                                    imgurl: petUrl,
                                })
                                pet.then(p => {
                                    setPets([...pets, p])
                                    if (p){
                                        navigator("/pet")
                                    }
                                })

                            }
                            }>Submit</button>
                        </fieldset>
                    </div>
                </div>
            </div>
        </div>
    </>
}


async function create(petDto: PetCreateDto): Promise<pet>{
    return await fetch(petApi.getCreateUrl, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(petDto),
    }).then((response) => {
        if (response.ok) {
            toast.success("Pet created successfully.", {});
        } else {
            toast.error("Pet creation failed.");
        }
        return response.json() as unknown as pet;
    })
}