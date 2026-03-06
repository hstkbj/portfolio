<template>
    <div class="main-content">

        <!-- Page Header -->
        <div class="page-header">
            <h1 class="page-title">Contact</h1>
            <nav class="breadcrumb">
                <RouterLink to="/admins" class="breadcrumb-item">Accueil</RouterLink>
                <span class="breadcrumb-item active">Contact</span>
            </nav>
        </div>

        <div class="col-12">
            <div class="card">
                <div class="card-body">
                    <DataTable :data="allcontact" :columns="columns"  />
                </div>
            </div>
        </div>

        <div class="modal fade" id="modalcontact" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-lg">
                <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Détails Méssage</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    
                    <div class="row">
                        <div class="col-lg-6 d-flex flex-column">
                            <span class="text-muted">Nom Complet :</span>
                            <label for="">{{ getcontact.name }}</label>
                        </div>

                        <div class="col-lg-6 d-flex flex-column">
                            <span class="text-muted">Adresse email :</span>
                            <a :href="'mailto:'+getcontact.email">{{ getcontact.email }}</a>
                        </div>

                        <div class="col-lg-6 d-flex flex-column">
                            <span class="text-muted">Téléphone:</span>
                            <a :href="'tel:'+getcontact.phone">{{ getcontact.phone }}</a>
                        </div>

                        <div class="col-lg-6 d-flex flex-column">
                            <span class="text-muted">Objet :</span>
                            <label for="">{{ getcontact.subject }}</label>
                        </div>

                        <div class="col-lg-12 d-flex flex-column">
                            <span class="text-muted">Message :</span>
                            <p class=" text-justify">{{ getcontact.message }}</p>
                        </div>
                    </div>

                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fermer</button>
                </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script setup>

import { nextTick, onMounted, ref, render } from 'vue';
import DataTable from '../DataTable/Datatable.vue'
import { initTinyMCE, destroyTinyMCE } from '../../plugins/tinymce';
import Swal from 'sweetalert2';
import { AllContactMessages, DeleteContactMessage, ShowContactMessage } from '../api/contact';

const allcontact = ref([])
const getcontact = ref({})
let addmodal

async function AllContactFunction() {
   allcontact.value = await AllContactMessages()
}

const columns = [
    {
        title: '#',
        data: null,
        render: function (data, type, row, meta) {
            return meta.row + 1; // Index (1-based)
        }
    },
    { 
        title: 'Nom complet', 
        data: null,
        render: (data, type, row)=>{
            return `<span class='fw-bold'>${row.name}</span>`
        }
    },
    { 
        title: 'Email', 
        data: null,
        render: (data, type, row)=>{
            return `<a href='mailto:${row.email}' class='fw-bold'>${row.email}</a>`
        }
    },
    { 
        title: 'Téléphone', 
        data: null,
        render: (data, type, row)=>{
            return `<a href='tel:${row.phone}' class='fw-bold'>${row.phone}</a>`
        }
    },
    {
        title: 'Created At', data: 'created_at', render: (data, type, row) => {
            // Formater la date
            const date = new Date(row.created_at); // Assure-toi que `created_at` est au format ISO ou timestamp
            return new Intl.DateTimeFormat('en-EN', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
            }).format(date); // Formater la date à la française
        }
    },
    {
        title: 'Actions',
        data: null,
        render: function (data, type, row) {
            return `
                <div class="d-flex align-items-center">
                    <a onClick="GetContactFunction(${row.id})" class="btn btn-secondary text-white  me-2" data-bs-toggle="modal" data-bs-target="#addprogram">
                        <i class="fa fa-eye "></i> 
                    </a> 
                    <a onClick="DeleteContactFunction(${row.id})" class="btn btn-danger text-white me-2">
                        <i class="fa fa-trash "></i> 
                    </a> 
                </div>`;
        }
    }
]

window.GetContactFunction = async function (id) {
    getcontact.value = await ShowContactMessage(id)
    addmodal.show()
}

window.DeleteContactFunction = async function (id) {
    const result = await Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    });
    if (result.isConfirmed){
        await DeleteContactMessage(id).then(()=>{
            Swal.fire(
                'Supprimer!',
                'Contact Supprimer.',
                'success'
            );
            AllContactFunction()
        })
    }
}

onMounted(()=>{
    addmodal = new bootstrap.Modal(document.getElementById('modalcontact'))
    AllContactFunction()
})

</script>

<style>

</style>