(function(Dk, d3) {
    var container = d3.select('.container');

    var Paint = function(config) {
        var margin = {top: 20, right: 80, bottom: 30, left: 50},
            width = container[0][0].offsetWidth - margin.left - margin.right,
            height = Math.floor(container[0][0].offsetWidth / 2 ) - margin.top - margin.bottom;
        if (config.title) {
            container.append('h1').text(config.title);
        }
        Dk.painter.paint(container, width, height, margin, config);
    };

    var config = {
        data: [
            {
                x: [1, 3, 4, 5, 6, 7, 9, 10],
                y: [100, 300, 400, 200, 300, 400, 200, 300, 100, 300],
                lineType: "dotted", //solid
                color: "blue"
            },
            {
                x: [1, 3, 4, 5, 6, 7, 9, 10],
                y: [200, 250, 300, 250, 400, 200, 250, 300, 250, 400],
                lineType: "solid", //solid
                color: "green"
            }

        ],
        title: "График №1",
        axisX: {
            title: "День",
            color: "green"
        },
        axisY: {
            title: "Сумма, тыс.руб.",
            color: "red"
        }
    };
    Paint(config);

})(Dk || {}, d3);