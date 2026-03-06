import { deleteData, getData, getSingleData, postData, putData } from "../../plugins/api";

export async function AllContactMessages() {
    return await getData('/contacts').then(res=>{
        return res.data.contacts
    })
}

export async function AddContactMessage(data) {
    return await postData('/contact', data).then(res=>{
        return res.data
    })
}

export async function ShowContactMessage(id) {
    return await getSingleData(`/contact/${id}`).then(res=>{
        return res.data.contact
    })
}

export async function DeleteContactMessage(id) {
    return await deleteData(`/contact/${id}`).then(res=>{
        return res.data
    })
}

export async function UpdateContactMessage(id, data) {
    return await putData(`/contact/${id}`, data).then(res=>{
        return res.data
    })
}