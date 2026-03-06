<template>
    <div class="main-content">

        <!-- Page Header -->
        <div class="page-header">
            <h1 class="page-title">Profils</h1>
            <nav class="breadcrumb">
                <RouterLink to="/admins" class="breadcrumb-item">Accueil</RouterLink>
                <span class="breadcrumb-item active">Profils</span>
            </nav>
        </div>

        <div class="col-12">
            <div class="card">
                <div class="card-body">
                    
                    <h3>Information personnels</h3>
                    <form action="" class="row mt-1">
                        <div class="col-lg-6">
                            <div class="form-group">
                                <label for="">Nom Complet :</label>
                                <input type="text" class="form-control">
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="form-group">
                                <label for="">Email :</label>
                                <input type="email" class="form-control">
                            </div>
                        </div>

                        <div class="text-end">
                            <button class="btn btn-primary">Modifié</button>
                        </div>
                    </form>

                    

                </div>
            </div>
        </div>

    </div>
</template>

<script>
export default {

}
</script>

<style>

</style>