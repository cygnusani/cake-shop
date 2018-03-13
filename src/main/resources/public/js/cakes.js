$(function () {
    const newCakeForm = function () {
        return $('#new-cake-form');
    };

    const newCakeModal = function () {
        return $('#new-cake-modal');
    };

    const cakesTableBody = function () {
        return $('#available-cakes tbody');
    };

    const loadCakes = function () {
        return $.get('/cakes/all'); //available
    };

    const postCake = function (json) {
        return $.post({
            url: '/cakes/new',
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify(json)
        });
    };

    const deactivateCake = function (cakeId) {
        return $.post({
            url: '/cakes/' + cakeId + '/deactivate',
            contentType: 'application/json; charset=utf-8',
            data: '{}'
        });
    };

    const bindCakeButtonClick = function () {
        $('.deactivate-cake').on('click', function (e) {
            e.stopPropagation();
            deactivateCake($(e.currentTarget).attr('cake-id'))
                .then(refreshCakes);
        });
    };

    const showCakes = function (cakes) {
        const cakeRowTemplate = '<tr><th scope="row">#{cakeId}</th>' +
            '<td>#{cakeName}</td>' +
            '<td>#{cakePrice} €</td>' +
            '<td>#{cakeAvailability}</td>' +
            '<td>' +
            '<button type="button" class="deactivate-cake btn btn-danger" cake-id="#{id}" style="#{style}">Deaktiveeri</button>' +
            '</td></tr>';
        const cakeRows = $.map(cakes, function (cake) {
            return cakeRowTemplate
                .replace('#{cakeId}', cake.id)
                .replace('#{cakeName}', cake.name)
                .replace('#{cakePrice}', cake.price)
                .replace('#{cakeAvailability}', cake.available ? 'Jah' : 'Ei')
                .replace('#{id}', cake.id)
                .replace('#{style}', cake.available ? '' : "visibility: hidden");
        });

        cakesTableBody().html(cakeRows);
        bindCakeButtonClick();
    };

    const refreshCakes = function () {
        loadCakes().then(function (cakes) {
            showCakes(cakes);
        });
    };

    const hideNewCakeModal = function () {
        newCakeModal().modal('hide');
    };

    const clearNewCakeForm = function () {
        newCakeForm().trigger('reset');
    };

    $('#new-cake-cancel-btn').on('click', function () {
        hideNewCakeModal();
        clearNewCakeForm();
    });

    //$('#disable-cake').on('click', function (e) {
    //    e.stopPropagation();
    //    console.log("Click");
    //});

    const validateNewCakeForm = function (newCakeJson) {
        var isValid = true;
        if (newCakeJson.name.trim() == '') {
            $('input#name').addClass('is-invalid');
            isValid = false;
        } else {
            $('input#name').removeClass('is-invalid');
        }

        if (!/^\d{1,14}(\.\d{1,2})?$/.test(newCakeJson.price)) {
            $('input#price').addClass('is-invalid');
            isValid = false;
        } else {
            $('input#price').removeClass('is-invalid');
        }

        return isValid;
    };

    $('#new-cake-submit-btn').on('click', function () {
        const newCakeJson = formToJson(newCakeForm());
        const isValid = validateNewCakeForm(newCakeJson);
        if (isValid) {
            postCake(newCakeJson)
                .then(function () {
                    refreshCakes();
                    hideNewCakeModal();
                    clearNewCakeForm();
                });
        }
    });

    //when page is loaded
    refreshCakes();
});