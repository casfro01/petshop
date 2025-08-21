import {useAtomValue} from "jotai";
import {petsAtom} from "./states/pets.ts";
import type {pet} from "./PetDetails.tsx";

export default function PetOverview() {
    const pets: pet[] = useAtomValue(petsAtom)
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
                            <button className="btn btn-primary">Buy Now</button>
                            <div className="w-33"></div>
                            <button className="btn btn-error justify-end">Delete</button>
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