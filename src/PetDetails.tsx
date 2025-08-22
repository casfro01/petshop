import {useNavigate, useParams} from "react-router";
import {useAtom} from "jotai";
import {petsAtom} from "./states/pets.ts";
import {description} from "./states/genericDescription.ts";

export interface pet{
    id: string;
    name: string;
    breed: string;
    imgurl: string;
    sold: boolean;
}

export type petIDParameter = {
    petID: string;
}


export default function PetDetails(){
    const params = useParams<petIDParameter>()
    const [pets, ] = useAtom(petsAtom)

    const navigator = useNavigate();

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const currentPet: pet = pets.find(pet => pet.id === params.petID);
    const desc: string = description[Math.floor(Math.random() * (description.length - 1))];

    return <>
        <div className="hero bg-base-300 min-h-screen">
            <div className="hero-content flex-col lg:flex-row">
                <img
                    src={currentPet.imgurl}
                    className="max-w-sm rounded-lg shadow-2xl"
                />
                <div>
                    <h1 className="text-5xl font-bold">Buy: {currentPet.name}</h1>
                    <div className="py-6">
                    <p >Breed: {currentPet.breed}</p>
                    <p>{desc}</p>
                    </div>
                    <button className="btn btn-primary" onClick={()=> navigator("/pet/"+currentPet.id+"/buy")}>Purchase</button>
                </div>
            </div>
        </div>
    </>
}