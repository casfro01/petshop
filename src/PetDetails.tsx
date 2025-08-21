import {useParams} from "react-router";

export interface pet{
    petID: string;
    petName: string;
    breed: string;
    imgURL: string;
    sold: boolean;
}

export type petIDParameter = {
    petID: string;
}


export default function PetDetails(){
    const params = useParams<petIDParameter>()
    return <div>jens: {
        params.petID
    }</div>
}