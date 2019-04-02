d3.json("classData.json").then(function(data){drawHistogram(data)},function(err){console.log(err);})

var getHW=function(d,date){return d.map(function(element){return(element.homework[date].grade)})}

var drawHistogram=function(data){
  //initialize variable
  var screen={width:800,height:400}
  var margins = {top: 20, right: 10, bottom: 40, left: 70}
  var height=screen.height-margins.top-margins.bottom
  var width=screen.width-margins.right-margins.left
  var date=0
  var hwData=getHW(data,date)
  console.log(hwData)
  var xScale=d3.scaleLinear()
     .domain([0,51])
     .nice()
     .range([0,width])
  var binMaker=d3.histogram()
              .domain(xScale.domain())
              .thresholds(xScale.ticks(10))
  var bins=binMaker(hwData)
  console.log(bins)
  var yScale = d3.scaleLinear()
                  .domain([0,d3.max(bins,function(d){return d.length})])
                  .nice()
                  .range([height,margins.top])
  var color=d3.scaleOrdinal(d3.schemeSet3)
  //drawButton
  var timeLine=d3.select("body").append("div")
  timeLine.selectAll("button")
          .data(data[0].homework)
          .enter()
          .append("button")
          .attr("id",function(d,i){return i})
          .text(function(d){return "Day "+d.day})
          .on("click",function(){
            var date=d3.select(this).attr("id")
            var hwData=getHW(data,date)
            var bins=binMaker(hwData)
            //console.log(bins)
            var yScale = d3.scaleLinear()
                            .domain([0,d3.max(bins,function(d){return d.length})])
                            .nice()
                            .range([height,margins.top])
            //change rects
            d3.select("#graph")
              .selectAll('rect')
              .data(bins)
              .transition()
              .duration(200)
              .attr('y', function(d){return yScale(d.length)})
              .attr('height',function(d){return height-yScale(d.length)})
              .attr('fill', function(d,i){return color(i)})
            //change yAxis
            var yAxis=d3.axisLeft(yScale)
                        .ticks(d3.max(bins,function(d){return d.length}))
            svg.select("#yAxis").transition().duration(500).call(yAxis)
            //change label
            svg.select("#scoretext")
            .selectAll("text")
            .data(bins)
            .transition()
            .duration(200)
            .attr('y', function(d){return yScale(d.length)+5})
            .text(function(d){if (d.length>0){return d.length}})
          })

  //draw rect
  var svg=d3.select("body").append("svg")
            .attr("id","graph")
            .attr("width",screen.width)
            .attr("height",screen.height)
  var plot = svg.append('g')
                .attr('transform', 'translate(' + margins.left + ',' + margins.top+ ')')
  plot.selectAll('rect')
      .data(bins)
      .enter()
      .append('rect')
      .attr('x',function(d){return xScale(d.x0)})
      .attr('y', function(d){return yScale(d.length)})
      .attr('height',function(d){return height-yScale(d.length)})
      .attr('width',function(d){return xScale(d.x1-0.1)-xScale(d.x0)})
      .attr('fill', function(d,i){return color(i)})
  //axis
  var xAxis=d3.axisBottom(xScale)
  var yAxis=d3.axisLeft(yScale)
              .ticks(d3.max(bins,function(d){return d.length}))
  svg.append("g")
     .attr("id","xAxis")
     .call(xAxis)
     .attr('transform', 'translate(' + (margins.left)+ ',' + (height+margins.top) + ')')
  svg.append("g")
     .attr("id","yAxis")
     .call(yAxis)
     .attr('transform', 'translate(' + 65 + ',' + margins.top + ')')
  // svg.append("g").append("line")
  //     .attr('x1',65 )
  //     .attr('y1', height+margins.top+0.5)
  //     .attr('x2', 100)
  //     .attr('y2', height+margins.top+0.5)
  //     .style('stroke', 'black');
  //labels
  svg.append("g")
  .attr('id', 'scoretext')
  .selectAll("text")
  .data(bins)
  .enter()
  .append("text")
  .attr('x', function(d){return xScale(d.x1+(d.x1-d.x0)/2)})
  .attr('y', function(d){return yScale(d.length)+5})
  .text(function(d){if (d.length>0){return d.length}})


}
