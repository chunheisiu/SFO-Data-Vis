(function() {
  var svg = d3.select("svg#vis2"),
      margin = {top: 20, right: 150, bottom: 30, left: 50},
      width = svg.attr("width") - margin.left - margin.right,
      height = svg.attr("height") - margin.top - margin.bottom,
      g = svg.append("g").attr("class", "plot").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  var parseTime = d3.timeParse("%m/%d/%y");

  var planeSVG = "M148.2,1944.5c-7.7-5.7-13.4-24.9-13.4-38.3c0-15.3,141.7-419.3,315.9-899.9c174.3-480.6,315.9-877,315.9-880.8c0-1.9-151.3-5.7-337-5.7c-260.4,0-335.1-5.7-329.3-23C104.1,83.4,242,2.9,406.7-81.3c277.6-141.7,300.6-157,312.1-212.5c15.3-84.3,90-153.2,260.4-237.4c472.9-239.3,1648.6-499.7,2717-603.1c174.3-17.2,568.7-36.4,877-42.1l561-11.5l-36.4-40.2c-61.3-67-80.4-118.7-80.4-216.4c0-174.2,120.6-292.9,296.8-292.9c266.2,0,400.2,292.9,227.9,497.8l-49.8,57.4h70.9c51.7,0,84.3-15.3,126.4-57.4c90-90,405.9-180,844.4-243.2c314-44,379.1-47.9,471-28.7c183.8,38.3,350.4,149.4,417.4,277.6l28.7,51.7h373.4h375.3l-49.8-57.4c-172.3-206.8-38.3-497.8,229.8-497.8c281.5,0,409.8,360,189.6,532.3c-59.3,47.9-51.7,53.6,103.4,68.9c166.6,19.1,555.3,118.7,729.5,187.6c204.9,80.4,327.4,155.1,419.3,254.7c65.1,70.8,78.5,97.7,78.5,164.7c0,45.9-15.3,105.3-38.3,139.8c-111.1,180-549.5,367.6-1110.5,474.9c-218.3,42.1-233.6,42.1-3033,47.9l-2812.8,7.7L2549.3,294l-356.2,155.1l-737.2,733.3c-620.4,618.5-748.7,737.2-813.8,754.4C559.8,1959.8,169.2,1965.6,148.2,1944.5z M2442-332.1c65.1-67-5.7-197.2-80.4-149.3c-45.9,28.7-53.6,111.1-15.3,149.3c17.2,17.2,38.3,30.6,47.9,30.6S2424.8-314.9,2442-332.1z M2736.9-328.3c13.4-15.3,21.1-57.4,17.2-91.9c-5.7-55.5-11.5-63.2-63.2-63.2s-57.4,7.7-63.2,63.2c-5.7,67,21.1,118.7,63.2,118.7C2704.4-301.5,2725.4-313,2736.9-328.3z M3033.7-326.4c68.9-51.7,7.6-191.5-72.8-160.8c-38.3,15.3-44.1,158.9-5.8,172.3C2991.6-299.6,2997.3-299.6,3033.7-326.4z M3320.9-313c42.1-17.2,42.1-157,0-174.3c-80.4-30.6-141.7,109.2-72.8,160.8C3288.4-297.7,3282.6-297.7,3320.9-313z M3636.9-328.3c30.6-38.3,19.2-126.4-19.1-151.3c-51.7-32.5-93.8-1.9-93.8,68.9C3523.9-314.9,3587.1-269,3636.9-328.3z M3933.6-332.1c36.4-34.5,38.3-72.8,11.5-124.5c-38.3-68.9-134-32.6-134,51.7c0,42.1,46,103.4,76.6,103.4C3897.3-301.5,3918.3-314.9,3933.6-332.1z M4230.4-328.3c13.4-15.3,21.1-57.4,17.2-91.9c-5.7-55.5-11.5-63.2-63.2-63.2c-51.7,0-57.4,7.7-63.2,63.2c-5.7,67,21.1,118.7,63.2,118.7C4197.9-301.5,4218.9-313,4230.4-328.3z M4527.2-326.4c68.9-51.7,7.6-191.5-72.8-160.8c-38.3,15.3-44.1,158.9-5.8,172.3C4485.1-299.6,4490.8-299.6,4527.2-326.4z M4814.4-313c42.1-17.2,42.1-157,0-174.3c-80.4-30.6-141.7,109.2-72.8,160.8C4781.9-297.7,4776.1-297.7,4814.4-313z M5120.8-326.4c68.9-51.7,7.7-191.5-72.8-160.8c-38.3,15.3-44.1,158.9-5.8,172.3C5078.7-299.6,5084.4-299.6,5120.8-326.4z M5408-313c42.1-17.2,42.1-157,0-174.3c-80.4-30.6-141.7,109.2-72.8,160.8C5375.4-297.7,5369.7-297.7,5408-313z M5723.9-328.3c13.4-15.3,21.1-57.4,17.2-91.9c-5.7-55.5-11.5-63.2-63.2-63.2s-57.4,7.7-63.2,63.2c-5.7,67,21.1,118.7,63.2,118.7C5691.4-301.5,5712.4-313,5723.9-328.3z M6020.7-332.1c59.3-57.4,26.8-160.8-49.8-160.8c-34.5,0-72.8,53.6-72.8,103.4c0,30.6,49.8,88.1,76.6,88.1C5984.3-301.5,6005.4-314.9,6020.7-332.1z M6315.6-324.5c34.5-34.5,28.7-147.4-7.7-162.8c-46-17.2-93.8,19.2-99.6,78.5C6196.9-322.6,6263.9-272.8,6315.6-324.5z M6614.3-326.4c68.9-51.7,7.6-191.5-72.8-160.8c-38.3,15.3-44,158.9-5.7,172.3C6572.2-299.6,6577.9-299.6,6614.3-326.4z M6901.5-313c42.1-17.2,42.1-157,0-174.3c-80.4-30.6-141.7,109.2-72.8,160.8C6868.9-297.7,6863.2-297.7,6901.5-313z M7217.4-328.3c13.4-15.3,21.1-57.4,17.2-91.9c-5.7-55.5-11.5-63.2-63.2-63.2c-51.7,0-57.5,7.7-63.2,63.2c-5.7,67,21.1,118.7,63.2,118.7C7184.9-301.5,7205.9-313,7217.4-328.3z M7516.1-332.1c65.1-67-5.7-197.2-80.4-149.3c-45.9,28.7-53.6,111.1-15.3,149.3c17.2,17.2,38.3,30.6,47.9,30.6S7498.9-314.9,7516.1-332.1z M7811-328.3c13.4-15.3,21.1-57.4,17.2-91.9c-5.7-55.5-11.5-63.2-63.2-63.2c-51.7,0-57.4,7.7-63.2,63.2c-5.7,67,21.1,118.7,63.2,118.7C7778.5-301.5,7799.5-313,7811-328.3z M8107.8-326.4c68.9-51.7,7.7-191.5-72.8-160.8c-38.3,15.3-44,158.9-5.7,172.3C8065.7-299.6,8071.4-299.6,8107.8-326.4z M8395-313c42.1-17.2,42.1-157,0-174.3c-80.4-30.6-141.7,109.2-72.8,160.8C8362.5-297.7,8356.7-297.7,8395-313z M8695.6-320.7c74.7-42.1,30.7-185.7-53.6-168.5c-42.1,7.7-57.4,118.7-23,160.8C8645.8-295.8,8647.8-295.8,8695.6-320.7z";

  var svgDefs = svg.append("defs");

  d3.csv("data.csv", type, function(error, data) {
    if (error) throw error;

    //console.log(data);

    var geo = d3.nest()
      .key(function(d) { return d.Aircraft_Manufacturer; })
      .key(function(d) { return d.Aircraft_Model; })
      .rollup(function(v) { return {
        dom: d3.sum(v, function(c) { return c.GEO_Summary == "Domestic" ? c.count : 0; }),
        intl: d3.sum(v, function(c) { return c.GEO_Summary == "International"  ? c.count : 0; }),
        sum: d3.sum(v, function(c) { return c.count; })
        };
      })
      .entries(data);

    var boeing = geo.filter(function(d) { return d.key == "Boeing"; })
      .map(function(d) { return d.values; });

    const flatten = arr => arr.reduce(
    (acc, val) => acc.concat(
      Array.isArray(val) ? flatten(val) : val
    ),
    []
  );

    boeing = flatten(boeing).sort(function(a,b) { return a.key.localeCompare(b.key); });
    // console.log(boeing);

    // console.log(geo);

    // pat yourself in the back for sucessfully doing d3.nest

    var keys = geo.map(function(d) { return d.key; });
    var values = d3.values(geo).map(function(d) { return d.values.map(function(c) { return c.value; }); });

    var planes = g.selectAll(".planes")
      .data(boeing)
      .enter()
      .append("g")
      .attr("class", "plane")
      .attr("id", function(d) { return d.key; })
      .each(function(d, i) {
        var percentage = d.value.dom / d.value.sum;

        var grad = svgDefs.append("linearGradient");
        grad.attr("id", "boeing-grad" + i);
        grad.append("stop")
          .attr("class", "stop-left")
          .attr("offset", "0");

        grad.append("stop")
          .attr("class", "stop-left")
          .attr("offset", percentage);

        grad.append("stop")
          .attr("class", "stop-right")
          .attr("offset", percentage);

        grad.append("stop")
          .attr("class", "stop-right")
          .attr("offset", "1");
      });

    planes.append("path")
      .attr("d", planeSVG)
      .attr("transform", function(d, i) {
        var j = i > 3 ? i - 4 : i;
        return "translate(" + (-50 + j * 250) + "," + (margin.top + 50 + (Math.floor(i / 4) * 250)) + ") scale(0.02, -0.02)";
      })
      .attr("fill", function(d, i) { return "url(#boeing-grad" + i + ")"; })
      .on("mouseover", function(d, i) {
        d3.select(this).classed("plane-active", true);
        d3.select("#boeing-planeDesc" + i).style("opacity", "1");
      })
      .on("mouseout", function(d, i) {
        d3.select(this).classed("plane-active", false);
        d3.select("#boeing-planeDesc" + i).style("opacity", "0");
      });

    planes.append("text")
      .attr("font-family", "sans-serif")
      .attr("font-size", 14)
      .attr("font-weight", "bold")
      .attr("text-anchor", "middle")
      .attr("transform", function(d, i) {
        var j = i > 3 ? i - 4 : i;
        return "translate(" + (j * 250 + 50) + "," + (margin.top + (Math.floor(i / 4) * 250)) + ")";
      })
      .text(function(d) { return d.key; });

    var planeDesc = planes.append("g")
      .attr("id", function(d, i) { return "boeing-planeDesc" + i; })
      .attr("transform", function(d, i) {
        var j = i > 3 ? i - 4 : i;
        return "translate(" + (j * 250 + 50) + "," + (margin.top + (Math.floor(i / 4) * 250)) + ")";
      })
      .style("opacity", "0");

    planeDesc.append("text")
      .attr("id", function(d, i) { return "boeing-planeDesc-dom" + i; })
      .attr("class", "text-dom")
      .attr("font-family", "sans-serif")
      .attr("font-size", 12)
      .attr("text-anchor", "middle")
      .attr("transform", function(d, i) { return "translate(0, 130)"; })
      .text(function(d) { return "Domestic: " + d.value.dom.toLocaleString() + " (" + (d.value.dom / d.value.sum * 100).toFixed(2) + "%)"; });

    planeDesc.append("text")
      .attr("id", function(d, i) { return "boeing-planeDesc-intl" + i; })
      .attr("class", "text-intl")
      .attr("font-family", "sans-serif")
      .attr("font-size", 12)
      .attr("text-anchor", "middle")
      .attr("transform", function(d, i) { return "translate(0, 150)"; })
      .text(function(d) { return "International: " + d.value.intl.toLocaleString() + " (" + (d.value.intl / d.value.sum * 100).toFixed(2) + "%)"; });
  });

  function type(d, _, columns) {
    d.date = parseTime(d.Activity_Period);
    d.count = +d.Landing_Count;
    return d;
  }

})();
