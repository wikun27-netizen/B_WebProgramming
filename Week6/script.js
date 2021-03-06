const API_KEY = '39519cbfe299de01ac3d8158fc0a739e';

var genres = {};
//retrive all movie genres
$(() => {
    $.get('https://api.themoviedb.org/3/genre/movie/list', { api_key: API_KEY })
    .done((r) => {
        console.log(r);
        r.genres.forEach((g) => {
            genres[g.id] = g.name;
            })
    })
    .fail((e) => {
        alert(e.status_message)
    });
    $('#searchButton').click();
    $('#title').val('')
});

//search movie when the button is clicked
$('#searchButton').click((event) => {
    //disabled search button
    $('#searchButton')
     .empty()
     .attr('disabled', 'disabled')
     .append($('<span class="spinned-border spinner-border-sm" role="status" aria-hidden="true"></span>'))
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
            })
        })
        .fail((e) => {
            $('#error').text(`!!! ${e.status_message}`)
        })
        .always(() => {
            //enable search button
            $('#searchButton')
             .empty()
             .removeAttr('disabled')
             .append('Search');
        })
});

$('#title').on('keypress',function(e) {
    if (e.keyCode == 13) {
        e.preventDefault();
        $('#searchButton').click();
    }
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

    const td = $('<td></td>');
    row.append(td);

    //title
    const title = $('<h2 class="display-5><h2>').text(movie.title);
    td.append(title);

    //overview
    const overview = $('<p></p>').text(movie.overview);
    td.append(overview);
    
    //rating
    const rating = $('<span class="badge badge-success p-2"></span>').text(`Rating: ${movie.vote_average}`)
    td.append(rating);
    
    //genres
    movie.genre_ids.forEach((id) => {
        const genreName = genres[id];
        const genre = $('<span class="badge badge-warning ml-2 p-2"></span>').text(genreName);
        td.append(genre);
    });

    return row
}