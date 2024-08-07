import usePut from "../hooks/usePut";
import {API_URL} from "../config";
import useFetch from "../hooks/useFetch";

const API_BASE_URL = API_URL;

export function changePassword() {
    return usePut(`${API_BASE_URL}user/change-password/`, {});
}

export function getAllSkills() {
    return useFetch(`${API_BASE_URL}skills/`, []);
}

export function getAllSeniorities() {
    return useFetch(`${API_BASE_URL}seniorities/`, []);
}
