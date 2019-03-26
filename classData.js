var dataP=d3.json("classData.json");
dataP.then(function(data)
{
  console.log("data",data)
},
function(err)
{
  console.log(err);
})

var drawHistogram=function(data)
{
  var scren=
  {
    width=800,
    height=600
  };
  var svg=d3.select("svg")
            .attr("width",scren.width)
            .attr("height",scren.height)
  var margins=
  {
    top:20,
    bottom:30,
    left:35,
    right:70
  }
  var width=scren.width-margins.left-margins.right;
  var height=scren.height-margins.top-margins.bottom;

  var xScale=d3.scaleLinear()
               .domain([d3.extend(data)])
               .nice()
               .range([0,width]);
  var colors=d3.scaleOrdinal(d3.schemeAccent);
  var plotLand =svg.append("g")
                  .classed("plot",true)
                  .attr("transform","translate("+margins.left+","+margins.top+")");

  var penguin=plotLand.selectAll("rect")
                       .data(data)
                       .enter()
                       .append("rect")
                       .attr("fill",function(d){ return colors(d.name);})
                       .attr("x",function(d,i){return xScale(i);})
                       .attr("y",function(d,i){return yScale(d.grade);})


}
