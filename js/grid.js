$(document).ready(function () {
    var $table = $('#table');
    $table.on('post-body.bs.table', function () {
        history();
        multiselectRoles();
        isOnline();
        kostilShapka();
    });
});
function kostilShapka() {
    $(window).on('resize', function () {
        var shapka = $('.fixed-table-header th');
        shapka.closest('table').css({'width': '95%'});
        var shapka2 = $('#table th');
        for (var i = 0; i < shapka.length; i++) {
            var style = {'width': ($(shapka2[i]).outerWidth() - 1) + 'px'};
            $(shapka[i]).find('div').css(style);
            console.log(style);
        }
    });
}
function history() {
    var tdsAction = $('#table > tbody > tr > td:nth-child(7)');
    for (var j = 0; j < tdsAction.length; j++) {
        var tdAction = $(tdsAction[j]);
        var buttonHistory = $('<button type="button" class="btn glyphicon glyphicon-th-list"></button>');
        buttonHistory.on('click', function () {
            var userId = $(this).parent().parent().find('td:nth-child(4)').text();
            var tableHtml = '<table id="history-table">' +
                '<thead>' +
                '<tr>' +
                '<th data-field="timestamp" data-sortable="true">Timestamp</th>' +
                '<th data-field="url" data-sortable="true">Url</th>' +
                '<th data-field="roleFilters" data-sortable="true">RoleFilters</th>' +
                '<th data-field="webFilters" data-sortable="true">WebFilters</th>' +
                '<th data-field="roles" data-sortable="true">Roles</th>' +
                '</tr>' +
                '</thead>' +
                '</table>';
            $.ajax('temp-api/history.json?userId=' + userId, {
                contentType: 'application/json',
                success: function (data) {
                    var historyTable = $(tableHtml);
                    $('#history-container').html(['<h2>History</h2>', historyTable]);
                    historyTable.bootstrapTable({data: data.rows});
                }
            });
        });
        tdAction.html(buttonHistory);
    }
}
function multiselectRoles() {
    var cells = $('#table > tbody > tr > td:nth-child(3)');
    for (var i = 0; i < cells.length; i++) {
        var td = $(cells[i]);
        var selectedRolls = td.text().split(", ");
        var select = $('<select multiple="multiple">');
        var roles = ['Doctor', 'super-admin', 'Nurce', 'Administrator', 'SuperUser', 'Oleg-role'];
        for (var n = 0; n < roles.length; n++) {
            var role = roles[n];
            var notSelectedOption = $('<option value="' + role + '"> ' + role + '</option>');
            var selectedOption = $('<option value="' + role + ' "selected="selected"> ' + role + '</option>');
            if (selectedRolls.indexOf(role) >= 0) {
                select.append(selectedOption);
            } else {
                select.append(notSelectedOption);
            }
        }
        select.change(function () {
            var selector = $(this);
            var selectedRolls = selector.val();
            var tdId = selector.parent().next();
            $.ajax({
                method: 'PATCH',
                contentType: "application/json;charset=UTF-8",
                url: "temp-api/users.json/" + tdId.text(),
                data: JSON.stringify({"roles": selectedRolls})
            });
        });
        td.html(select);
        td.find('select').multiselect();
        $(".caret").attr('class', 'glyphicon glyphicon-chevron-down');
    }
}
function isOnline() {
    var isOnline = $('#table > tbody > tr > td:nth-child(6)');
    for (var t = 0; t < isOnline.length; t++) {
        var tdOn = $(isOnline[t]);
        var buttonOnline = $('<span class="glyphicon glyphicon-ok"></span>');
        var buttonOfline = $('<span class="glyphicon glyphicon-remove"></span>');

        if (tdOn.text() == 'true') {
            tdOn.html(buttonOnline);
        } else {
            tdOn.html(buttonOfline);
        }
    }
}
function ajaxRequest(grid) {
    $.ajax('temp-api/users.json', {
        contentType: 'application/json',
        success: function (data) {
            var rows = data.rows.map(function(row){
                row.roles = row.roles.join(', ');
                return row;
            });
            grid.success(rows);
            grid.complete();
        }
    });
}