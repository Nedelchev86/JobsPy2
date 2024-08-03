import useFetch from "../hooks/useFetch";
import {API_URL} from "../config";

const API_BASE_URL = `${API_URL}blogs/`;

export function getAllBlogs() {
    return useFetch(`${API_BASE_URL}`, []);
}

export function getBlog(id) {
    return useFetch(`${API_BASE_URL}${id}`, {});
}

export function getLastFiveBlogs() {
    return useFetch(`${API_BASE_URL}latest-blog-posts/`, []);
}
