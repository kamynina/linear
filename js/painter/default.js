var Dk = {};

(function(d3) {
    Dk.painter = {
        paint: function(container, width, height, margin, config) {
            var x = d3.scale.linear()
                .range([0, width]);

            var y = d3.scale.linear()
                .range([height, 0]);

            var xAxisGenerationFn = d3.svg.axis()
                .scale(x)
                .orient("bottom");

            var yAxisGenerationFn = d3.svg.axis()
                .scale(y)
                .orient("left");

            var line = d3.svg.line()
                .x(function(d) { return x(d.x); })
                .y(function(d) { return y(d.y); });

            var decorateAxis = function(axis, config, textAttrs) {
                axis.selectAll('line, path').attr('stroke', config.color ? config.color : DEFAULT_AXIS_COLOR);
                if (config.title) {
                    axis
                        .append("text")
                        .attr(textAttrs)
                        .style("text-anchor", "end")
                        .text(config.title);
                }
            };
            var svg = container.append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

            var lines = config.data.map(function(lineConfig) {
                return {
                    dotted: lineConfig.lineType == "dotted",
                    color: lineConfig.color,
                    points: lineConfig.x.map(function(xValue, index) {
                        return {x: xValue, y: lineConfig.y[index] ? lineConfig.y[index] : 0 };
                    })
                };
            });

            var d = x.domain([
                d3.min(lines, function(c) { return d3.min(c.points, function(v) { return v.x; }); }),
                d3.max(lines, function(c) { return d3.max(c.points, function(v) { return v.x; }); })
            ]);

            y.domain([
                d3.min(lines, function(c) { return d3.min(c.points, function(v) { return v.y; }); }),
                d3.max(lines, function(c) { return d3.max(c.points, function(v) { return v.y; }); })
            ]);

            var xAxis = svg.append("g")
                .attr("class", "x axis")
                .attr("transform", "translate(0," + height + ")")
                .call(xAxisGenerationFn);

            if (config.axisX) {
                decorateAxis(
                    xAxis,
                    config.axisX,
                    {
                        x: width
                    }
                );
            }

            var yAxis = svg.append("g")
                .attr("class", "y axis")
                .call(yAxisGenerationFn);

            if (config.axisY) {
                decorateAxis(
                    yAxis,
                    config.axisY,
                    {
                        y: -50,
                        dy: ".71em",
                        "transform": "rotate(-90)"
                    }
                );
            }

            var plots = svg.selectAll(".plot")
                .data(lines)
                .enter().append("g")
                .attr("class", "plot");

            plots.append("path")
                .attr("class", "line")
                .attr("d", function(d) { return line(d.points); })
                .attr("stroke", function(d) { return d.color; });
            plots.map(function(plot) {
                if (plot[0].__data__.dotted === true) {
                    d3.select(plot[0]).select("path").style("stroke-dasharray", "10, 5");
                }
            });
        }
    };
})(d3);