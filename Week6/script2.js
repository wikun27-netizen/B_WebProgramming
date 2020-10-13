const API_KEY = '39519cbfe299de01ac3d8158fc0a739e';

var genres = {};
//retrive all movie genres
$(() => {
    $.get('https://api.themoviedb.org/3/genre/movie/list', { api_key: API_KEY })
    .done((r) => {
        r.genres.forEach((g) => {
            genres[g.id] = g.name;
            })
    })
    .fail((e) => {
        alert(e.status_message)
    });
});



//search movie when the button is clicked
$('#searchButton').click((event) => {
    //disabled search button
    $('searchButton')
     .empty()
     .attr('disabled', 'disabled')
     .append($('<span class="spinned-border spinner--border-sm" role="status" aria-hidden="true"></span>'))
     .append(' Loading...');

    //clear error message
    $('#error').text('');

    //clear previous results from the table
    $('#result').empty();

    //request parameter
    const data = {
        api_key: API_KEY,
        query: $('#title').val()
    }

    //send GET request
    $.get('https://api.themoviedb.org/3/search/movie', data)
        .done((r) => {
            r.results.forEach((movie) => {
                const movieCell = createMovieCell(movie);
                $('#result').append(movieCell);
            });
        })
        .fail((e) => {
            $('#error').text(`!!! ${e.status_message}`)
        });
});

function createMovieCell(movie) {
    var row = $('<tr></tr>');

    //row number
    const rowNo = $('#result > tr').length + 1;
    var colNo = $('<td width="10"></td>');
    colNo.append($('<h2 class="display-5"></h2>').text(`#${rowNo}`));
    row.append(colNo);

    //poster
    const posterUrl = (movie.poster_path !== null) ?
        `https://image.tmdb.org/t/p/w500${movie.poster_path}` :
        '';
    var colPoster = $('<td width="100"></td>');
    colPoster.append($(`<img src="${posterUrl}" height="200">`));
    row.append(colPoster);

    return row;
}