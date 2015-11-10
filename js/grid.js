(function() {

    document.addEventListener('DOMContentLoaded', function() {

        var gridDiv = document.querySelector('#myGrid');

        var gridOptions = {
            columnDefs: [
                {headerName: 'Name', field: 'name'},
                {headerName: 'Email', field: 'email'},
                {headerName: 'Roles', field: 'roles'},
                {headerName: 'ID', field: 'id'}

            ],
            rowData: [
                $.getJSON('temp-api/users.json')
            ]
        };

        new ag.grid.Grid(gridDiv, gridOptions);
    });


})();

