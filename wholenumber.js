// Background setup
var background = function(w, h){
	return d3.select("body")
	.append("svg")
	.attr("class", "background")
	.attr("width", w)
	.attr("height", h)
}
// State Machine
var statemachine = function(bg, w, h, padding){
	var g = bg
	.append("g")
	.attr("transform", "translate(" + 2*w/3 + "," + 0 + ")")
	var machine = g
	.append("rect")
	.attr("class", "statemachine")
	.attr("width", w/10)
	.attr("height", w/10)
	.attr("x", -w/20)
	.attr("y", padding);
	//TODO Need a file server before I can get this to work. 
	d3.xml("fofx.svg", function (e, docFragment) {
		  if (e) {console.log(e); return;}
		  var fofxNode = docFragment.getElementsByTagName("svg")[0];
		  rect.appendChild(foxNode);


	})
	g
	.append("line")
	.attr("class", "stateconnectors")
	.attr("y1", padding + w/20)
	.attr("y2", padding + w/20)
	.attr("x1", -2*w/20)
	.attr("x2", -w/20)
	.attr("stroke", "#ca0020");
	g
	.append("line")
	.attr("class", "stateconnectors")
	.attr("y1", padding + w/20)
	.attr("y2", padding + w/20)
	.attr("x1", w/20)
	.attr("x2", w/10)
	.attr("stroke", "#0571b0");
}
// Draw analytical form
var analyticalform = function(bg, w, h) {
	var g = bg
	.append("g")
	.attr("transform", "translate(0," + h/3 + ")");
	g.append("text")
	.attr("class", "analytical")
	.text("f(x) = x + 1")
	.attr("x", padding)
	.attr("y", 0)
	var inp = g.append("text")
	.attr("class", "analytical")
	.text("1")
	.attr("x", padding)
	.attr("y", h/20)
	var inp = g.append("text")
	.attr("class", "analytical")
	.text("=")
	.attr("x", padding + 10)
	.attr("y", h/20)
}

var w=900, h=600; // 3:2 aspect ratio
var padding = 10;
var bg = background(w,h);
statemachine(bg, w, h, padding);
analyticalform(bg, w, h);


