$(function() {

    var names = ['cake 1', 'cake 2', 'cake 3', 'cake 4'];
    var amounts = [12, 4, 17, 19];

    const loadCakes = function () {
        $.get('/cakes/all').done(function(data) {
            return data;
        })
    };

    const refreshCakes = function () {
        loadCakes().then(function (cakes) {
            showStatistics(cakes);
        });
    };

    const showStatistics = function (cakes) {
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

    cakes = loadCakes();
    console.log(cakes);

    var ctx = document.getElementById('myChart').getContext('2d');
    var chart = new Chart(ctx, {
        // The type of chart we want to create
        type: 'bar',

        // The data for our dataset
        data: {
            labels: names,
            datasets: [{
                label: "My First dataset",
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgb(255, 99, 132)',
                data: amounts,
            }]
        },

        // Configuration options go here
        options: {
            responsive: true,
            responsiveAnimationDuration: 250,
            maintainAspectRatio: true,
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero:true
                    }
                }]
            }
        }
    });
});