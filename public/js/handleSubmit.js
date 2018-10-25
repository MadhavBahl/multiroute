console.log('Hello World');

$('#searchBtn').click((event) => {
    var numNodes = $('#numNodes').val();
    var mainMatrix = $('#matrix').val();
    var sendObj = { numNodes, matrix: mainMatrix };

    $('#resultRow').html('<div id="canvas"></div>');

    $.post('/solution', sendObj, (data, status) => {
        console.log(data);
        $('#mainResultRow').html(`<br /><h3>${data.mincost}</h3><h3>${data.path}</h3>`);
    });

    var matrix = $('#matrix').val();
    console.log('numNodes:', numNodes);
    // console.log(matrix);
    matrix = matrix.split('\n');
    for (var i=0; i<matrix.length; i++) {
        matrix[i] = matrix[i].split(' ');
    }
    console.log(matrix);
    event.preventDefault();


    var g = new Graph();

    for (var i=0; i<matrix.length; i++) {
        for (var j=i; j<matrix[i].length; j++) {
            if (matrix[i][j] != "0") {
                g.addEdge(i,j);
            }
        }
    }
    
    var layouter = new Graph.Layout.Spring(g);

    layouter.layout();

    /* draw the graph using the RaphaelJS draw implementation */
    var renderer = new Graph.Renderer.Raphael('canvas', g, 600, 400);
    renderer.draw();

    redraw = function() {
        layouter.layout();
        renderer.draw();
    };

});