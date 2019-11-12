window.percentageChart = id => {
  const duration    = 1500;
  const transition  = 200;
  const width       = 170;
  const height      = 170;
  const percentage  = $(id).attr("data-percentage");
  const dataset     = { lower: calcPercent(0),
                        upper: calcPercent(percentage) 
                      };

  const radius      = Math.min(width, height) / 3;
  let pie           = d3.pie().sort(null);
  let format        = d3.format(".0%"); 
  const color       = d3.scaleOrdinal(["#00539C", "#EEEEEE"])
  const arc         = d3.arc()
                        .innerRadius(radius * .95)
                        .outerRadius(radius);
  let svg           = d3.select(id).append("svg")
                        .attr("width", width)
                        .attr("height", height)
                        .append("g")
                        .attr("transform", "translate(" + width/2 + "," + height/2 + ")");
  let path          = svg.selectAll("path")
                         .data(pie(dataset.lower))
                         .enter().append("path")
                         .attr("fill", (d, i) => { return color(i); })
                         .attr("d", arc)
                         .each((d) => {
                           this._current = d;
                         });
  let text          = svg.append("text")
                         .attr("text-anchor", "middle")
                         .attr("dy", ".3em");
                
  let progress = 0;
  setTimeout(() => {
    path = path.data(pie(dataset.upper));
    path.transition().duration(duration).attrTween("d", (d) => {
      const dp = d3.interpolate(this._current, d)
      const p = d3.interpolate(progress, percentage);
      
      return function(t) {
        text.text(format(p(t) / 100));
        return arc(dp(t));
      }
    });
  }, transition);


  function calcPercent(percentage) {
    return [parseInt(percentage), 100 - parseInt(percentage)]
  }
}