import {useParams} from "react-router";

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
    return <div>jens: {
        params.petID
    }</div>
}