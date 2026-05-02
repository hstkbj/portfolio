<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>HolmesDev | Admin</title>

    <!-- Favicons -->
    <link href="assets/img/favicon.png" rel="icon">
    <link href="assets/img/apple-touch-icon.png" rel="apple-touch-icon">

    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="">
    <link href="{{asset('assets/css2?family=Inter:wght@300;400;500;600;700&display=swap')}}" rel="stylesheet">

    <!-- Vendor CSS Files -->
    <link href="{{asset('vendors/bootstrap/css/bootstrap.min.css')}}" rel="stylesheet">
    <link href="{{asset('vendors/bootstrap-icons/bootstrap-icons.css')}}" rel="stylesheet">
    <link href="{{asset('admin/assets/vendor/fonts/boxicons.css')}}" rel="stylesheet">
    <link href="{{asset('admin/assets/vendor/css/core.css')}}" rel="stylesheet">
    <link href="{{asset('admin/assets/vendor/css/theme-default.css')}}" rel="stylesheet">
    <link href="{{asset('admin/assets/vendor/css/pages/page-auth.css')}}" rel="stylesheet">
    <link href="{{asset('admin/assets/vendor/libs/perfect-scrollbar/perfect-scrollbar.css')}}" rel="stylesheet">
    <link href="{{asset('admin/assets/vendor/libs/apex-charts/apex-charts.css')}}" rel="stylesheet">

    <!-- Template Main CSS File -->
    <link href="{{asset('admin/assets/css/main.css')}}" rel="stylesheet">

    @vite(['resources/css/app.css','resources/js/app_admin.js'])

</head>
<body>

    <div id="app"></div>

    <!-- script for tinymce plugin -->
    <script src="{{asset('admin/assets/vendor/libs/tinymce/tinymce.bundle.js')}}"></script>

    <script src="{{asset('vendors/bootstrap/js/bootstrap.bundle.min.js')}}"></script>
    <script src="{{asset('admin/assets/vendor/js/helpers.js')}}"></script>
    <script src="{{asset('admin/assets/vendor/libs/perfect-scrollbar/perfect-scrollbar.js')}}"></script>
    <script src="{{asset('admin/assets/vendor/libs/apex-charts/apexcharts.js')}}"></script>

</body>
</html>
