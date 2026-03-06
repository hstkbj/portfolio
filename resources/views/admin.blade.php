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

    <!-- Google Fonts - Inter -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="">
    <link href="{{asset('assets/css2-1?family=Inter:wght@300;400;500;600;700&display=swap')}}" rel="stylesheet">

    <!-- Vendor CSS Files -->
    <link href="{{asset('vendors/bootstrap/css/bootstrap.min-1.css')}}" rel="stylesheet">
    <link href="{{asset('vendors/bootstrap-icons/bootstrap-icons-1.css')}}" rel="stylesheet">
    <link href="{{asset('vendors/remixicon/remixicon.css')}}" rel="stylesheet">
    <link href="{{asset('vendors/fontawesome-free/css/all.min.css')}}" rel="stylesheet">
    <link href="{{asset('vendors/phosphor-icons/phosphor-icons.css')}}" rel="stylesheet">
    <link href="{{asset('vendors/lucide-icons/lucide.css')}}" rel="stylesheet">
    <link href="{{asset('vendors/simple-datatables/style.css')}}" rel="stylesheet">
    <link href="{{asset('vendors/quill/quill.snow.css')}}" rel="stylesheet">
    <link href="{{asset('vendors/quill/quill.bubble.css')}}" rel="stylesheet">
    <link href="{{asset('vendors/choices.js/choices.min.css')}}" rel="stylesheet">
    <link href="{{asset('vendors/flatpickr/flatpickr.min.css')}}" rel="stylesheet">

    <link
        rel="stylesheet"
        href="https://site-assets.fontawesome.com/releases/v6.7.2/css/all.css"
    >

    <link
        rel="stylesheet"
        href="https://site-assets.fontawesome.com/releases/v6.7.2/css/sharp-duotone-thin.css"
    >

    <link
        rel="stylesheet"
        href="https://site-assets.fontawesome.com/releases/v6.7.2/css/sharp-duotone-solid.css"
    >

    <link
        rel="stylesheet"
        href="https://site-assets.fontawesome.com/releases/v6.7.2/css/sharp-duotone-regular.css"
    >

    <link
        rel="stylesheet"
        href="https://site-assets.fontawesome.com/releases/v6.7.2/css/sharp-duotone-light.css"
    >

    <link
        rel="stylesheet"
        href="https://site-assets.fontawesome.com/releases/v6.7.2/css/sharp-thin.css"
    >

    <link
        rel="stylesheet"
        href="https://site-assets.fontawesome.com/releases/v6.7.2/css/sharp-solid.css"
    >

    <link
        rel="stylesheet"
        href="https://site-assets.fontawesome.com/releases/v6.7.2/css/sharp-regular.css"
    >

    <link
        rel="stylesheet"
        href="https://site-assets.fontawesome.com/releases/v6.7.2/css/sharp-light.css"
    >

    <link
        rel="stylesheet"
        href="https://site-assets.fontawesome.com/releases/v6.7.2/css/duotone-thin.css"
    >

    <link
        rel="stylesheet"
        href="https://site-assets.fontawesome.com/releases/v6.7.2/css/duotone-regular.css"
    >

    <link
        rel="stylesheet"
        href="https://site-assets.fontawesome.com/releases/v6.7.2/css/duotone-light.css"
    >

    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-sRIl4kxILFvY47J16cr9ZwB07vP4J8+LH7qKQnuqkuIAvNWLzeN8tE5YBujZqJLB" crossorigin="anonymous">

    <!-- Template Main CSS File -->
    <link href="{{asset('admin/assets/css/main.css')}}" rel="stylesheet">

    @vite(['resources/css/app.css','resources/js/app_admin.js'])

</head>
<body>

    <div id="app"></div>

    <!-- script for tinymce plugin -->
    <script src="{{asset('admin/assets/vendor/libs/tinymce/tinymce.bundle.js')}}"></script>

    <script src="{{asset('vendors/apexcharts/apexcharts.min.js')}}"></script>
    <script src="{{asset('vendors/chart.js/chart.umd.js')}}"></script>
    <script src="{{asset('vendors/echarts/echarts.min.js')}}"></script>
    <script src="{{asset('vendors/simple-datatables/simple-datatables.js')}}"></script>
    <script src="{{asset('vendors/quill/quill.js')}}"></script>
    <script src="{{asset('vendors/tinymce/tinymce.min.js')}}"></script>
    <script src="{{asset('vendors/choices.js/choices.min.js')}}"></script>
    <script src="{{asset('vendors/flatpickr/flatpickr.min.js')}}"></script>
    <script src="{{asset('vendors/php-email-form/validate-1.js')}}"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js" integrity="sha384-FKyoEForCGlyvwx9Hj09JcYn3nv7wiPVlz7YYwJrWVcXK/BmnVDxM+D2scQbITxI" crossorigin="anonymous"></script>

    

    <!-- Template Main JS Files -->
    <script src="{{asset('admin/assets/js/theme.js')}}"></script>
    <script src="{{asset('admin/assets/js/main.js')}}"></script>

</body>
</html>