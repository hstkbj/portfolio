import { deleteData, getData, getSingleData, postData, putData } from "../../plugins/api";

export async function AllPorfolio() {
    return await getData('/portfolios').then(res => {
        return res.data.portfolios
    })
}

export async function SinglePortfolio(id) {
    return await getSingleData('/portfolio/' + id).then(res => {
        return res.data.portfolio
    })
}

export async function CreatePortfolio(data) {
    return await postData('/portfolio', data).then((res) => res.data.portfolio)
}

export async function UpdatePortfolio(id, data) {
    return await putData('/portfolio/' + id, data).then((res) => res.data.portfolio)
}

export async function DeletePortfolio(id) {
    return await deleteData('/portfolio/' + id).then(res => {
        return res.data.message
    })
}

export async function AllPorfolioUser(page){
    return await getData('/portfolios/all?page=' + page).then(res=>{
        return res.data.portfolios
    })
}

export async function LatestPortFolio() {
    return await getData('portfolios/latest').then(res=>{
        return res.data.portfolios
    })
}

export async function SinglePortfolioSlug(slug) {
    return await getData('/portfolios/' + slug).then(res=>{
        return res.data.portfolio
    })
}
