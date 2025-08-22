import {atom} from "jotai";
import type {pet} from "../PetDetails.tsx";

// https://jotai.org/docs/core/atom
export const petsAtom = atom<pet[]>([])