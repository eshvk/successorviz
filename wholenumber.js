var inpColor = '#ca0020',
    opColor = '#0571b0';
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
            .attr('transform', 'translate(' + 2 * w / 3 + ',' + 0 + ')')
        var machine = g
            .append('rect')
            .attr('class', 'statemachine')
            .attr('width', w / 10)
            .attr('height', w / 10)
            .attr('x', -w / 20)
            .attr('y', padding);
        // TODO Need a file server before I can get this to work. 
        d3.xml('fofx.svg', function(e, docFragment) {
            if (e) { console.log(e);
                return; }
            var fofxNode = docFragment.getElementsByTagName('svg')[0];
            rect.appendChild(foxNode);


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
            .text('1');
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
            .text('0');

    }
    // Draw analytical form
var analyticalform = function(bg, w, h) {
    var txt = bg
        .append('text')
        .attr('transform', 'translate(0,' + h / 3 + ')')
        .attr('class', 'analytical')
        .attr('x', padding)
        .attr('y', 0)
        .attr('fill', '#111111');
    txt.append('tspan')
        .text('f(x) = x + 1')
    txt
        .append('tspan')
        .text('1')
        .attr('class', 'analytical inp')
        .attr('x', padding + 10)
        .attr('dy', h / 20)
    txt.append('tspan')
        .text(' = ')
    txt.append('tspan')
        .attr('class', 'analytical op')
        .text('0')
    txt.append('tspan')
        .text(' + 1');
}

// Draw Graphical form
var graphicalform = function(bg, w, h) {
    var xScale = d3
        .scalePoint()
        .domain([0, 100])
        .range([0, 2 * w / 3 - padding]);
    var numberLineX = d3
        .axisBottom()
        .scale(xScale);
    var chart =  bg
    	.append('g')
    	.attr('transform', 'translate(' + w/3 + ',' + (2*h/3) + ')');
    chart.append('g')
    	.attr('class', 'graphical inp')
      	.call(numberLineX);

}

var w = 900,
    h = 600; // 3:2 aspect ratio
var padding = 20;
var bg = background(w, h);
statemachine(bg, w, h, padding);
analyticalform(bg, w, h);
graphicalform(bg, w, h);