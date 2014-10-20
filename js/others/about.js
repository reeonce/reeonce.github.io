var testData = [
	{label: "person a", times: [
	{"starting_time": 1355752800000, "ending_time": 1355759900000},
	{"starting_time": 1355767900000, "ending_time": 1355774400000}]},
	{label: "person b", times: [
	{"starting_time": 1355759910000, "ending_time": 1355761900000}]},
	{label: "person c", times: [
	{"starting_time": 1355761910000, "ending_time": 1355763910000}]},
];
var w = 600,
h = 500;
var svg = d3.select(".timeline svg").attr("width", w);
var chart = d3.timeline();
svg.datum(testData).call(chart);