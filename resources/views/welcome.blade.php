<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>HolmesDev</title>

        <!-- Favicons -->
        <link href="{{asset('assets/img/favicon.png')}}" rel="icon">
        <link href="{{asset('assets/img/apple-touch-icon.png')}}" rel="apple-touch-icon">

        <!-- Fonts -->
        <link href="https://fonts.googleapis.com" rel="preconnect">
        <link href="https://fonts.gstatic.com" rel="preconnect" crossorigin="">
        <link href="{{asset('assets/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Raleway:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap')}}" rel="stylesheet">

        <!-- Vendor CSS Files -->
        <link href="{{asset('vendors/bootstrap/css/bootstrap.min.css')}}" rel="stylesheet">
        <link href="{{asset('vendors/bootstrap-icons/bootstrap-icons.css')}}" rel="stylesheet">
        <link href="{{asset('vendors/aos/aos.css')}}" rel="stylesheet">
        <link href="{{asset('vendors/swiper/swiper-bundle.min.css')}}" rel="stylesheet">
        <link href="{{asset('vendors/glightbox/css/glightbox.min.css')}}" rel="stylesheet">
        <!-- Main CSS File -->
        <link href="{{asset('assets/css/main.css')}}" rel="stylesheet">

        @vite(['resources/css/app.css', 'resources/js/app.js'])
    </head>
    <body class="index-page">

        <div id="app"></div>

        <!-- Scroll Top -->
        <a href="#" id="scroll-top" class="scroll-top d-flex align-items-center justify-content-center"><i class="bi bi-arrow-up-short"></i></a>

        <!-- Preloader -->
        <div id="preloader"></div>

        <!-- Vendor JS Files -->
        <script src="{{asset('vendors/bootstrap/js/bootstrap.bundle.min.js')}}"></script>
        <script src="{{asset('vendors/php-email-form/validate.js')}}"></script>
        <script src="{{asset('vendors/aos/aos.js')}}"></script>
        <script src="{{asset('vendors/typed.js/typed.umd.js')}}"></script>
        <script src="{{asset('vendors/waypoints/noframework.waypoints.js')}}"></script>
        <script src="{{asset('vendors/purecounter/purecounter_vanilla.js')}}"></script>
        <script src="{{asset('vendors/swiper/swiper-bundle.min.js')}}"></script>
        <script src="{{asset('vendors/imagesloaded/imagesloaded.pkgd.min.js')}}"></script>
        <script src="{{asset('vendors/isotope-layout/isotope.pkgd.min.js')}}"></script>
        <script src="{{asset('vendors/glightbox/js/glightbox.min.js')}}"></script>

        <script defer="" src="{{asset('beacon.min.js/vcd15cbe7772f49c399c6a5babf22c1241717689176015')}}" integrity="sha512-ZpsOmlRQV6y907TI0dKBHq9Md29nnaEIPlkf84rnaERnq6zvWvPUqr2ft8M1aS28oN72PdrCzSjY4U6VaAw1EQ==" data-cf-beacon='{"version":"2024.11.0","token":"68c5ca450bae485a842ff76066d69420","server_timing":{"name":{"cfCacheStatus":true,"cfEdge":true,"cfExtPri":true,"cfL4":true,"cfOrigin":true,"cfSpeedBrain":true},"location_startswith":null}}' crossorigin="anonymous"></script>
    </body>
</html>
