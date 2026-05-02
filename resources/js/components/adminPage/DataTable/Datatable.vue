<template>
  <DataTable
    :data="data"
    :columns="columns"
    :options="mergedOptions"
    class="table table-hover align-middle w-100"
  />
</template>

<script setup>
import { computed } from 'vue';
import DataTable from 'datatables.net-vue3';
import DataTableLib from 'datatables.net-bs5';
import 'datatables.net-bs5/css/dataTables.bootstrap5.css';
import 'datatables.net-responsive-bs5';
import 'datatables.net-responsive-bs5/css/responsive.bootstrap5.css';

DataTable.use(DataTableLib);

const props = defineProps({
  data: {
    type: Array,
    default: () => [],
  },
  columns: {
    type: Array,
    default: () => [],
  },
  options: {
    type: Object,
    default: () => ({}),
  },
});

const mergedOptions = computed(() => ({
  responsive: true,
  autoWidth: false,
  searching: false,
  language: {
    emptyTable: 'Aucune donnee disponible',
    zeroRecords: 'Aucun resultat trouve',
    info: '_START_ a _END_ sur _TOTAL_ elements',
    infoEmpty: '0 element',
    paginate: {
      previous: 'Precedent',
      next: 'Suivant',
    },
  },
  ...props.options,
}));
</script>
