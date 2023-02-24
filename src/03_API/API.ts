import axios from 'axios'
import {ResponseWithTopNewsType} from '../999_Store/Reducers/loginReducer/loginReducer'

const API_BASE_URL = 'https://newsapi.org/v2/'


export const API = {
    login: async (apiKey: string) => {
        const headers = {
            headers: {
                'X-Api-Key': apiKey
            }
        }
        return axios.get<ResponseWithTopNewsType>(`${API_BASE_URL}top-headlines?country=NO`, headers).then(res => res.data)
    },
    topNews: async (apiKey: string, searchQuery: string = '', currentPage: number = 1, pageSize: number = 5) => {
        const headers = {
            headers: {
                'X-Api-Key': apiKey
            }
        }
        const getStr = searchQuery
            ? `top-headlines?&q=${searchQuery}&pageSize=${pageSize}&page=${currentPage}`
            : `top-headlines?language=en&pageSize=${pageSize}&page=${currentPage}`
        return axios.get<ResponseWithTopNewsType>(API_BASE_URL + getStr, headers)
    },
}