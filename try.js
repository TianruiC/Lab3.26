var dataP=d3.json("classData.json");
dataP.then(function(data)
{
  drawButton(data)
  drawHistogram(data,10)
},
function(err)
{
  console.log(err);
})
var drawHistogram=function(data,x)
{
  var array= data.map(function(element){
    return(element.homework[x].grade)
  })
  var scren=
  {
    width:800,
    height:400
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
  var boxWidth=scren.width-margins.left-margins.right;
  var boxHeight=scren.height-margins.top-margins.bottom;

  var xScale=d3.scaleLinear()
               .domain([0, 50])
               .nice()
               .range([0,boxWidth]);

  var binMaker = d3.histogram()
              .domain(xScale.domain())
              .thresholds(xScale.ticks(10))
  var bins = binMaker(array);
            console.log('bins',bins);
  var xScale = d3.scaleLinear()
                  .domain([0,bins.length])
                  .range([0, 380])
  var yScale = d3.scaleLinear()
                  .domain([100,0])
                  .range([boxHeight,0])
  var plot = svg.append('g')
                .attr("width",380)
                .attr("height",380)
    plot.selectAll('rect')
        .data(bins)
        .enter()
        .append('rect')
        .attr('x',function(d,i){return(10*(d.x0))})
        .attr('y', function(d,i){return(200-(20*d.length))})
        .attr('height',function(d,i){return(20*(d.length))})
        .attr('width',40)
        .attr('fill','#558175')
  }
  var drawButton = function(data){
    d3.select("body").selectAll("button").data(data[0].homework).enter().append("button")
    .text(function(d){return d.day})
    .on("click",function(d,i){return  drawHistogram(data,i)})
  }
