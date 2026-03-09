<template>
    <div class="main-content">

        <!-- Page Header -->
        <div class="page-header">
            <h1 class="page-title">Portfolio</h1>
            <nav class="breadcrumb">
                <RouterLink to="/admins" class="breadcrumb-item">Accueil</RouterLink>
                <span class="breadcrumb-item active">Portfolio</span>
            </nav>
        </div>

        <div class="mb-4 text-end">
            <button class="btn btn-primary mb-3" @click="showModal">
                <i class="fa-regular fa-plus"></i> Ajouter un portfolio
            </button>
        </div>

        <div class="col-12">
            <div class="card">
                <div class="card-body">
                    <DataTable :data="portfolios" :columns="columns" />
                </div>
            </div>
        </div>

        <div class="modal modal-top fade" id="addportfolio" tabindex="-1">
            <div class="modal-dialog modal-dialog-centered modal-lg">
                <form class="modal-content"
                    @submit.prevent="!isEdite ? AddPorfolioFunction() : UpdatePortfolioFunction()">
                    <div class="modal-header">
                        <h5 class="modal-title" id="modalTopTitle">{{ modalTitle }}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="row">

                            <div class="col-lg-12">
                                <label for="nameSlideTop" class="form-label">Image URL </label>
                                <input type="text" :class="isEmpty.image_path ? 'is-invalid border border-danger' : ''"
                                    v-model="data.image_path" id="nameSlideTop" class="form-control"
                                    placeholder="Entrez le titre du portfolio" />
                                <div v-if="isEmpty.image_path" class="invalid-feedback">
                                    {{ msgInput.image_path }}
                                </div>
                            </div>

                            <div class="col-lg-6 mb-3">
                                <label for="nameSlideTop" class="form-label">Titre </label>
                                <input type="text" :class="isEmpty.title ? 'is-invalid border border-danger' : ''"
                                    v-model="data.title" id="nameSlideTop" class="form-control"
                                    placeholder="Entrez le titre du portfolio" />
                                <div v-if="isEmpty.title" class="invalid-feedback">
                                    {{ msgInput.title }}
                                </div>
                            </div>
                            <div class="col-lg-6 mb-3">
                                <label for="nameSlideTop" class="form-label">Liens </label>
                                <input type="text" :class="isEmpty.link ? 'is-invalid border border-danger' : ''"
                                    v-model="data.link" id="nameSlideTop" class="form-control"
                                    placeholder="Entrez l'URL du projet" />
                                <div v-if="isEmpty.link" class="invalid-feedback">
                                    {{ msgInput.link }}
                                </div>
                            </div>

                            <div class="col-lg-12 mb-3">
                                <label for="descriptionMission" class="form-label">Description </label>
                                <textarea :class="isEmpty.description ? 'is-invalid border border-danger' : ''"
                                    v-model="data.description" id="descriptionMission" class="form-control" rows="3"
                                    placeholder="Entrez la description du portfolio" maxlength="200"></textarea>
                                <div class="w-100 text-end">
                                    <span class=" text-muted">{{ data.description.length }}/200</span>
                                </div>
                                <div v-if="isEmpty.description" class="invalid-feedback">
                                    {{ msgInput.description }}
                                </div>
                            </div>

                            <div class="col-lg-12 mb-3">
                                <label for="blog-editor" class="form-label">Contenu </label>
                                <textarea :class="isEmpty.content ? 'is-invalid border border-danger' : ''"
                                    v-model="data.content" class="form-control" rows="3"
                                    placeholder="Entrez le contenu du portfolio" id="blog-editor"></textarea>
                                <div v-if="isEmpty.content" class="invalid-feedback">
                                    {{ msgInput.content }}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
                            Fermer
                        </button>
                        <button type="submit" class="btn btn-primary">{{ modalbutton }}</button>
                    </div>
                </form>
            </div>
        </div>

    </div>
</template>

<script setup>

import { nextTick, onMounted, ref, render } from 'vue';
import DataTable from '../DataTable/Datatable.vue'
import { initTinyMCE, destroyTinyMCE } from '../../plugins/tinymce';
import Swal from 'sweetalert2';
import { AllPorfolio, CreatePortfolio, DeletePortfolio, SinglePortfolio, UpdatePortfolio } from '../api/portfolioapi';

let addmodal;

const portfolios = ref([])
const data = ref({
    id: '',
    title: '',
    description: '',
    content: '',
    image_path: '',
    link: '',
})

const imagePreview = ref('')
const isEmpty = ref({})
const msgInput = ref({})
const isLoader = ref(false)
const isEdite = ref(false)
const modalTitle = ref('')
const modalbutton = ref('')

function showModal() {
    addmodal.show();
    data.value = {
        id: '',
        title: '',
        description: '',
        content: '',
        image_path: '',
        link: '',
    }
    modalTitle.value = 'Ajouter un portfolio'
    modalbutton.value = 'Enrégistrer'
    isEmpty.value = {}
    msgInput.value = {}
    isEdite.value = false
}

async function AllPortFolit() {
    portfolios.value = await AllPorfolio()
}

const columns = [
    {
        title: '#',
        data: null,
        render: function (data, type, row, meta) {
            return meta.row + 1; // Index (1-based)
        }
    },
    { title: 'Titre', data: 'title' },
    {
        title: 'Lien',
        data: 'link',
        render: (data, type, row) => {
            return `<a href="${row.link}" target="_blank">${row.link}</a>`;
        }
    },
    {
        title: 'Crée le', data: 'created_at', render: (data, type, row) => {
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
                    <a onClick="GetPorfolioFunction(${row.id})" class="btn btn-secondary text-white  me-2" data-bs-toggle="modal" data-bs-target="#edit_role">
                        <i class="fa fa-edit "></i> 
                    </a> 
                    <a onClick="DeletePorfolioFunction(${row.id})" class="btn btn-danger text-white me-2">
                        <i class="fa fa-trash "></i> 
                    </a> 
                </div>`;
        }
    }
]

function handleImageUpload(event) {
    const file = event.target.files[0];
    const MAX_SIZE = 5 * 1024 * 1024; // 5 MB


    if (!file) return;

    // Vérification taille
    if (file.size > MAX_SIZE) {
        Swal.fire({
            icon: 'error',
            title: 'Image trop lourde',
            text: 'L’image ne doit pas dépasser 5MB',
        });
        event.target.value = '';
        return;
    }

    // Stocker le fichier directement
    data.value.image_path = file;
    imagePreview.value = URL.createObjectURL(file)
    console.log(imagePreview.value)

    // Reset input pour pouvoir re-sélectionner la même image
    event.target.value = '';
}

// Remove new image
function removeImage() {
    data.value.image_path = '';
    imagePreview.value = ''
}

async function AddPorfolioFunction() {

    const ignoredFields = ['id']
    for (const field in data.value) {
        if (ignoredFields.includes(field)) continue
        isEmpty.value[field] = !data.value[field]
        msgInput.value[field] = `Please enter ${field.replace('_', ' ')}`;
    }

    const allEmpty = Object.values(isEmpty.value).every(value => value === false);

    if (allEmpty) {
        isLoader.value = true;

        // 2. CRÉATION DU FORMDATA (C'est l'étape clé)
        const formData = new FormData();

        for (const key in data.value) {
            formData.append(key, data.value[key]);
        }

        await CreatePortfolio(formData).then(response => {
            Swal.fire({
                icon: 'success',
                title: 'Portfolio Added Successfully',
                showConfirmButton: false,
                timer: 1500
            });
            addmodal.hide();
            AllPortFolit();
        }).catch(error => {
            console.error('There was an error!', error);
            Swal.fire({
                icon: 'error',
                title: 'An error occurred while adding the portfolio.',
                text: error.message || 'Please try again later.'
            });
        }).finally(() => {
            isLoader.value = false;
        });
    }


}

window.GetPorfolioFunction = async function (id) {
    data.value = await SinglePortfolio(id);
    addmodal.show();
    modalTitle.value = 'Edit Portfolio'
    modalbutton.value = 'Update'
    isEdite.value = true
    imagePreview.value = data.value.image_path || ''
}

async function UpdatePortfolioFunction() {
    isLoader.value = true

    const formData = new FormData();

    // Ajouter _method pour que Laravel traite comme PUT
    formData.append('_method', 'PUT');

    for (const key in data.value) {
        formData.append(key, data.value[key]);
    }

    await UpdatePortfolio(data.value.id, formData).then(response => {
        isLoader.value = false
        isEdite.value = false
        Swal.fire({
            icon: 'success',
            title: 'Portfolio Updated Successfully',
            showConfirmButton: false,
            timer: 1500
        });
        data.value = {
            id: '',
            title: '',
            description: '',
            content: '',
            image_path: '',
            link: '',
        }
        addmodal.hide();
        AllPortFolit();
    }).catch(error => {
        console.error('There was an error!', error);
        Swal.fire({
            icon: 'error',
            title: 'An error occurred while updating the portfolio.',
            text: error.message || 'Please try again later.'
        });
    }).finally(() => {
        isLoader.value = false;
    });
}

window.DeletePorfolioFunction = function (id) {
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
        if (result.isConfirmed) {
            // Appel API pour supprimer la mission
            try {
                await DeletePortfolio(id);
                Swal.fire(
                    'Deleted!',
                    'Your portfolio has been deleted.',
                    'success'
                );
                AllPortFolit();
            } catch (error) {
                console.error('There was an error!', error);
                Swal.fire({
                    icon: 'error',
                    title: 'An error occurred while deleting the portfolio.',
                    text: error.message || 'Please try again later.'
                });
            }
        }
    });
}

onMounted(async () => {
    addmodal = new bootstrap.Modal(document.getElementById('addportfolio'));
    document.getElementById('addportfolio').addEventListener('shown.bs.modal', async () => {
        await nextTick();
        initTinyMCE('blog-editor', {
            height: 500,
            setup: (editor) => {
                editor.on('init', () => {
                    editor.setContent(data.value.content || '');
                });

                editor.on('Change KeyUp', () => {
                    data.value.content = editor.getContent();
                });
            }
        })
    })
    document.getElementById('addportfolio').addEventListener('hidden.bs.modal', () => {
        destroyTinyMCE('blog-editor');
    });
    AllPortFolit()
});

</script>

<style scoped>
.contente {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 150px;
    border: dashed 2px;
    border-radius: 10px;
    gap: 12px;
    margin-bottom: 15px;
}

.contente label {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 12px;
    cursor: pointer;
    width: 100%;
    height: 100%;
}

.contente label i {
    font-size: 32px;
}

/* Bouton upload */
.upload-box {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 12px 18px;
    border: 2px dashed #c4c4c4;
    border-radius: 8px;
    cursor: pointer;
    color: #555;
    font-weight: 500;
    transition: all 0.3s ease;
    width: fit-content;
}

.upload-box i {
    font-size: 22px;
}

.upload-box:hover {
    border-color: #8b4513;
    color: #8b4513;
    background: #fdf6f2;
}

/* Preview */
.preview-box {
    position: relative;
    width: 220px;
    height: 160px;
    border-radius: 8px;
    overflow: hidden;
    border: 1px solid #ddd;
}

.preview-box img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

/* Bouton supprimer */
.remove-btn {
    position: absolute;
    top: 6px;
    right: 6px;
    background: rgba(0, 0, 0, 0.6);
    border: none;
    color: white;
    padding: 6px;
    border-radius: 50%;
    cursor: pointer;
    transition: background 0.3s;
}

.remove-btn i {
    font-size: 16px;
}

.remove-btn:hover {
    background: rgba(220, 53, 69, 0.9);
}
</style>