var Dk = {};

(function() {
    Dk.painter = {
        paint: function(container, width, height, margin, config) {
            container
                .style("height", height + "px");
            container
                .append('div')
                .attr('id', 'container')
                .style('width', (width - 50) + "px")
                .style('height', (height - 50) + "px");
            var yValues = [], xValues = [], colors = [], dash = [];
            config.data.forEach(function(lineConfig, index) {
                if (lineConfig.lineType == 'dotted') {
                    dash.push("-");
                } else {
                    dash.push("");
                }
                colors.push(lineConfig.color);
                yValues[index] = lineConfig.y;
                xValues[index] = lineConfig.x;
            });

            var r = Raphael("container");
            var chart = r.g.linechart(
                0, 0,      // top left anchor
                width-50, height-50,    // bottom right anchor
                xValues,
                yValues,
                {
                    nostroke: false,   // lines between points are drawn
                    axis: "0 0 1 1",   // draw axes on the left and bottom
                    axisxstep: 2,
                    dash: dash,         // draw the lines dashed
                    colors: colors
                });
        }
    }
})(Raphael);