(function() {
  var svg = d3.select("svg#vis4"),
    margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = +svg.attr("width") - margin.left - margin.right,
    height = +svg.attr("height") - margin.top - margin.bottom,
    g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  var x = d3.scaleBand()
      .rangeRound([0, width])
      .paddingInner(0.05)
      .align(0.1);

  var y = d3.scaleLinear()
      .rangeRound([height, 0]);

  var z = d3.scaleOrdinal(d3.schemeCategory10);

  d3.csv("data.csv", type, function(error, data) {
    if (error) throw error;

    // console.log(data);

    var airlines = d3.nest()
      .key(function(d) { return d.Published_Airline; })
      .key(function(d) { return d.Aircraft_Manufacturer; })
      .rollup(function(v) { return d3.sum(v, function(c) { return c.count; });})
      .entries(data);

    var filteredAirlines = airlines.filter(function(d) { return d3.sum(d.values.map(function(c) { return c.value; })) > 35000; });

    filteredAirlines.sort(function(a, b) {
      return d3.sum(b.values.map(function(c) { return c.value; })) - d3.sum(a.values.map(function(c) { return c.value; }));
    });

    var keys = [];
    var stackedValues = [];

    filteredAirlines.forEach(function(d) {
      // Add airline name to keys array
      keys.push(d.values.map(function(c) { return c.key; }));

      // Add airline manufactures to stackedValues array
      var airline = {};
      airline.name = d.key;
      d.values.map(function(c) { return c; })
        .forEach(function(a) {
          airline[a.key] = a.value;
        });
      stackedValues.push(airline);
    });

    const flatten = arr => arr.reduce(
    (acc, val) => acc.concat(
      Array.isArray(val) ? flatten(val) : val
    ),
    []
  );

    keys = flatten(keys).filter((v, i, a) => a.indexOf(v) === i).sort(function(a,b) { return a.localeCompare(b); });
    var values = d3.values(filteredAirlines).map(function(d) { return d.values.map(function(c) { return c.value; }); });

    // console.log(keys);

    x.domain(filteredAirlines.map(function(d) { return d.key; }));
    y.domain([0, d3.max(values, function(array) { return d3.sum(array); })]).nice();
    z.domain(keys);

    // console.log(stackedValues);

    var stack = d3.stack()
      .keys(keys);

    var stackedAirlines = stack(stackedValues);

    // console.log(stackedAirlines);

    var stackedBarG = g.append("g")
      .selectAll("g")
      .data(stackedAirlines)
      .enter().append("g")
        .attr("fill", function(d) { return z(d.key); })
        .attr("id", function(d) { return d.key; })
        .attr("class", "stackedBar");

    stackedBarG.append("g")
      .attr("class", "stackedRect")
      .selectAll("rect")
      .data(function(d) { return d; })
      .enter().append("rect")
        .attr("x", function(d) { return x(d.data.name); })
        .attr("y", function(d) { return y(!isNaN(d[1]) ? d[1]: 0); })
        .attr("height", function(d) { return !isNaN(d[1]) ? (y(d[0]) - y(d[1])) : 0; })
        .attr("width", x.bandwidth());

    stackedBarG.append("g")
      .attr("class", "stackedText")
      .selectAll("text")
      .data(function(d) { return d; })
      .enter().append("text")
        .attr("x", function(d) { return x(d.data.name); })
        .attr("y", function(d) { return y(!isNaN(d[1]) ? d[1]: 0); })
        .attr("dx", 48)
        .attr("dy", function(d) { return !isNaN(d[1]) ? ((y(d[0]) - y(d[1])) / 2) + 5 : 0; })
        .attr("fill", "white")
        .style("stroke-width", 0.25)
        .style("stroke", "black")
        .attr("font-family", "sans-serif")
        .attr("font-size", 12)
        .attr("font-weight", "bold")
        .attr("text-anchor", "middle")
        .style("opacity", "0")
        .text(function(d) { return !isNaN(d[1]) ? (d[1] - d[0]).toLocaleString(): null; });

    g.append("g")
      .attr("class", "axis")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

    g.append("g")
      .attr("class", "axis")
      .call(d3.axisLeft(y).ticks(null, "s"))
    .append("text")
      .attr("x", 2)
      .attr("y", y(y.ticks().pop()) + 0.5)
      .attr("dy", "0.32em")
      .attr("fill", "#000")
      .attr("font-weight", "bold")
      .attr("text-anchor", "start")
      .text("Landing Count");

    // Append legends
    var legendLabel = g.append("g")
      .append("text")
      .attr("x", width - 60)
      .attr("y", -7)
      .attr("fill", "#000")
      .attr("font-family", "sans-serif")
      .attr("font-size", 10)
      .attr("font-weight", "bold")
      .attr("text-anchor", "middle")
      .text("Aircraft Manufacturers");

    var legend = g.append("g")
      .attr("font-family", "sans-serif")
      .attr("font-size", 10)
      .attr("text-anchor", "end")
      .selectAll("g")
      .data(keys)
      .enter().append("g")
      .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

    legend.append("rect")
      .attr("x", width - 30)
      .attr("width", 19)
      .attr("height", 19)
      .attr("fill", function(d) { return z(d); })
      .on('mouseover', function(d) {
        d3.selectAll("g.stackedBar")
          .filter(function(c) {
            return d3.select(this).attr("id") != d;
          })
          .transition()
            .attr("fill", "darkgray");

        d3.selectAll("g.stackedBar")
          .filter(function(c) {
            return d3.select(this).attr("id") == d;
          })
          .raise()
          .transition()
            .selectAll(".stackedText text").style("opacity", "1");
      })
      .on('mouseout', function(d) {
        d3.selectAll("g.stackedBar")
          .attr("fill", function(c) {
            return z(d3.select(this).attr("id"));
          });

        d3.selectAll("g.stackedBar")
          .selectAll(".stackedText text").style("opacity", "0");
      });

      legend.append("text")
        .attr("x", width - 40)
        .attr("y", 9.5)
        .attr("dy", "0.30em")
        .text(function(d) { return d; });

  });

  function type(d, _, columns) {
    d.count = +d.Landing_Count;
    return d;
  }
})();
