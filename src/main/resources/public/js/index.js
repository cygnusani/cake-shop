$(function () {
    const newOrderForm = function () {
        return $('#new-order-form');
    };

    const loadCakes = function () {
        return $.get('/cakes/available');
    };

    const clearNewCakeForm = function () {
        newOrderForm().trigger('reset');
    };

    const cakeDropdown = function () {
        return $('#cake-select');
    };

    const showCakes = function (cakes) {
        const cakeRowTemplate = '<option value="#{cakeId}">#{cakeName}</option>';
        const cakeRows = $.map(cakes, function (cake) {
            return cakeRowTemplate
                .replace('#{cakeId}', cake.id)
                .replace('#{cakeName}', cake.name);
        });

        cakeDropdown().html(cakeRows);
    };

    const postOrder = function (json) {
        return $.post({
            url: '/orders/new',
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify(json)
        });
    };

    // The requirements here are that the client name is filled with any symbol except space and the amount section is always filled with a number that is integer.
    const validateNewOrderForm = function (newOrderJson) {
        var isValid = true;
        // Is empty or includes space
        // https://stackoverflow.com/questions/16048148/regex-to-check-if-whitespace-present
        if (newOrderJson.customerName.trim() == '' || !/^\S+$/.test(newOrderJson.customerName)) {
            $('input#customerName').addClass('is-invalid');
            isValid = false;
        } else {
            $('input#customerName').removeClass('is-invalid');
        }

        if (newOrderJson.amount.trim() == '' || !/^[1-9]\d*$/.test(newOrderJson.amount)) {
            $('input#amount').addClass('is-invalid');
            isValid = false;
        } else {
            $('input#amount').removeClass('is-invalid');
        }

        return isValid;
    };

    // Submit order button
    $('#new-order-btn').on('click', function (e) {
        e.preventDefault();
        const newOrderJson = formToJson(newOrderForm());
        const isValid = validateNewOrderForm(newOrderJson);
        if (isValid) {
            postOrder(newOrderJson).then(function () {
                clearNewCakeForm();
            });
        }
    });

    //when page is loaded
    loadCakes().then(function (cakes) {
        showCakes(cakes);
    });
});