$(document).ready(function () {
    $('#nights').on('keyup', function () {
        var nights = +$(this).val();
        var dailyPrice = +$(this).closest(".tour").data("daily-price");
        $('#total').text(nights * dailyPrice);
        $('#nights-count').text($(this).val());
    });

    $('#nights').focus(function () {
        $('input').val('7');
        var nights = +$(this).val();
        var dailyPrice = +$(this).closest(".tour").data("daily-price");
        $('#total').text(nights * dailyPrice);
        $('#nights-count').text($(this).val());
    });
});
