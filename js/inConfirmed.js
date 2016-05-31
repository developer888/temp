// Confirmed
$(document).ready(function () {
    var $table = $('#table');
    $table.on('check.bs.table uncheck.bs.table', function (row, user) {
        $.ajax({
            method: 'PATCH',
            url: "temp-api/users.json/" + user.id,
            data: {isConfirmed: user.isConfirmed}
        });
    });
});


