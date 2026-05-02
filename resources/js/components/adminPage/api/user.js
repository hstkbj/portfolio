import { getData, putData } from "../../plugins/api";

export async function CurrentUser() {
    return await getData('/user').then((res) => res.data.user);
}

export async function UpdateUser(id, data) {
    return await putData(`/user/${id}`, data).then((res) => res.data.user);
}
