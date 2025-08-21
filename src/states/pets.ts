import {atom} from "jotai";
import type {pet} from "../PetDetails.tsx";

export const petsAtom = atom<pet[]>([])