    $(document).ready(function(){

        var gridDiv = document.querySelector('#myGrid');

        var gridOptions = {
            columnDefs: [
                {headerName: 'Name', field: 'name'},
                {headerName: 'Email', field: 'email'},
                {headerName: 'Roles', field: 'roles'},
                {headerName: 'Id', field: 'id'}
            ]

        };


        $.getJSON('temp-api/users.json', function (data) {
            gridOptions.api.setRowData(data.records);
            console.log(gridOptions);
        });

        new ag.grid.Grid(gridDiv, gridOptions);


//         $.ajax('temp-api/users.json', {
//         contentType: 'application/json',
//         dataType: 'json',
//         success: function(result) {
//             var data = $(gridOptions);
//             data.find('#myGrid').html(result.name);
//         // console.log(result);
//         }
//         });


    });



