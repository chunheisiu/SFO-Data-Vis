(function() {
  var svg = d3.select("svg#vis4");
  var width = +svg.attr("width");
  var height = +svg.attr("height");

  var projection = d3.geoEquirectangular();
  var path = d3.geoPath().projection(projection);

  var z = d3.scaleOrdinal(d3.schemeCategory10);

  var q = d3.queue()
    .defer(d3.json, "resources/110m.json")
    .defer(d3.tsv, "resources/world-country-names.tsv")
    .await(drawMap);

  function drawMap(error, world, names) {
    if (error) throw error;

    var countries = topojson.feature(world, world.objects.countries).features,
        neighbors = topojson.neighbors(world.objects.countries.geometries);

    countries.forEach(function(d) {
      names.forEach(function(c) {
        if (+d.id == +c.id) {
          d.name = c.name;
        }
      });
    });

    // countries = countries.filter(function(d) {
    //     return names.some(function(n) {
    //       if (d.id == n.id) return d.name = n.name;
    //     });})
    //     .sort(function(a, b) { return a.name.localeCompare(b.name); });

    console.log(countries);

    svg.selectAll(".country")
      .data(countries)
      .enter().insert("path", ".graticule")
      .attr("class", "country")
      .attr("id", function(d) { return d.id; })
      .attr("d", path)
      .style("fill", function(d, i) { return z(i); })
      .on("mouseover", function(d, i) {
        d3.select(this).classed("map-active", true);
      })
      .on("mouseout", function(d, i) {
        d3.select(this).classed("map-active", false);
      });

      svg.insert("path", ".graticule")
        .datum(topojson.mesh(world, world.objects.countries, function(a, b) { return a !== b; }))
        .attr("class", "boundary")
        .attr("d", path);
  }
})();
