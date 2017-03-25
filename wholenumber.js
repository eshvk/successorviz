var inpColor = '#ca0020',
    opColor = '#0571b0';
function range(start, end) {
  return Array(end - start + 1).fill().map((_, idx) => start + idx)
}
// Background setup
var background = function(w, h) {
        return d3.select('body')
            .append('svg')
            .attr('class', 'background')
            .attr('width', w)
            .attr('height', h)
    }
    // State Machine
var statemachine = function(bg, w, h, padding) {
        var g = bg
            .append('g')
            .attr('transform', 'translate(' + (2 * w / 3 + 3*padding)   + ',' + h/12 + ')')
        var machine = g
            .append('rect')
            .attr('class', 'statemachine')
            .attr('width', w / 10)
            .attr('height', w / 10)
            .attr('x', -w / 20)
            .attr('y', padding);
        d3.xml('fofx.svg', function(e, docFragment) {
            // Based on https://bl.ocks.org/mbostock/1014829
            if (e) { console.log(e);
                return; }
            g.node().appendChild(docFragment.documentElement);
            g
            .select('#fofx')
            .attr('x', 0 - padding)
            .attr('y', padding + w/30)
        })
        g
            .append('line')
            .attr('class', 'stateconnectors')
            .attr('y1', padding + w / 20)
            .attr('y2', padding + w / 20)
            .attr('x1', -2 * w / 20)
            .attr('x2', -w / 20)
            .attr('stroke', inpColor);
        g
            .append('text')
            .attr('class', 'analytical inp')
            .attr('y', padding + 0.9 * w / 20)
            .attr('x', -1.5 * w / 20)
            .text('0');
        g
            .append('line')
            .attr('class', 'stateconnectors')
            .attr('y1', padding + w / 20)
            .attr('y2', padding + w / 20)
            .attr('x1', w / 20)
            .attr('x2', w / 10)
            .attr('stroke', opColor);
        g
            .append('text')
            .attr('class', 'analytical op')
            .attr('y', padding + 0.9 * w / 20)
            .attr('x', 1.5 * w / 20)
            .text('1');

    }
    // Draw analytical form
var analyticalform = function(bg, w, h, dragScale) {
    var txt = bg
        .append('text')
        .attr('transform', 'translate(' + w/9 + ',' + (h/2 - 3*padding)   + ')')
        .attr('class', 'analytical')
        .attr('x', padding)
        .attr('y', 0)
        .attr('fill', '#111111');
    txt.append('tspan')
        .text('f(x) = x + 1')
    txt
        .append('tspan')
        .text('1')
        .attr('class', 'analytical op life-overlay')
        .attr('x', padding + 10)
        .attr('dy', h / 20)
    txt.append('tspan')
        .text(' = ')
    txt.append('tspan')
        .attr('class', 'analytical inp life-overlay')
        .text('0')
        .call(d3.drag()
            .on("start.interrupt", function(){console.log('blubb')})
            .on("start drag", function(){
                console.log(d3.event.y, dragScale(d3.event.y));
            })
            )
    txt.append('tspan')
        .text(' + 1');
}

// Draw Graphical form
var graphicalform = function(bg, w, h) {
    var xScale = d3
        .scalePoint()
        .domain(range(0, 100))
        .range([0, 2*h/5]);
    var yScale = d3
        .scalePoint()
        .domain(range(0, 100))
        .range([0, -2*h/5]);
    var numberLineX = d3
        .axisBottom()
        .scale(xScale)
        .tickValues([0, 25, 50, 75, 100]);
    var numberLineY = d3
        .axisLeft()
        .scale(yScale)
        .tickValues([0, 25, 50, 75, 100]);
    var chart =  bg
    	.append('g')
    	.attr('transform', 'translate(' + w/3 + ',' + (2*h/3) + ')');
    chart.append('g')
    	.attr('class', 'graphical inp')
      	.call(numberLineX);
    chart.append('g')
        .attr('class', 'graphical op')
        .call(numberLineY);
}

var w = 900,
    h = 600; // 3:2 aspect ratio
var padding = 20;
var bg = background(w, h);
statemachine(bg, w, h, padding);
graphicalform(bg, w, h);
var dragScale =  d3
        .scaleLinear()
        .domain(range(0, 100))
        .range([h, 0]);
console.log(dragScale(5));
analyticalform(bg, w, h, dragScale);
