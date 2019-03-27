var dataP=d3.json("classData.json");
dataP.then(function(data)
{

  array= data.map(function(element){
    return(element.homework[0].grade)
  })
  drawHistogram(array)
},
function(err)
{
  console.log(err);
})

var drawHistogram=function(data)
{
  var scren=
  {
    width:800,
    height:600
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
               .domain(d3.extent(data))
               .nice()
               .range([0,width]);

  var binMaker = d3.histogram()
              .domain(xScale.domain())
              .thresholds(xScale.ticks(10))
  var bins = binMaker(data);
            console.log('bins',bins);
  var xScale = d3.scaleLinear()
                  .domain([0,bins.length])
                  .range([0, 380])
  var yScale = d3.scaleLinear()
                  .domain([0,100])
                  .range([height,0])
  var plot = svg.append('g')
                .attr("width",380)
                .attr("height",380)
    plot.selectAll('rect')
        .data(bins)
        .enter()
        .append('rect')
        .attr('x',function(d,i){return(xScale(i))})
        .attr('y', 100)

//   var percentage = function(d)
//   {
//     return d.length/dist.length
//   }
//
//   var yScale = d3.scaleLinear()
//                   .domain([0,d3.max(bins),function(d){return percentage(d);}])
//                   .range([height,0])
//                   .nice();
//
//   var colors=d3.scaleOrdinal(d3.schemeAccent);
//   var plotLand =svg.append("g")
//                   .classed("plot",true)
//                   .attr("transform","translate("+margins.left+","+margins.top+")");
// svg.selectAll('rect')
//     .data(bins)
//     .enter()
//     .append('rect')
//     .attr('x',function(d){return xScale(d.quiz);})
//     .attr('width',function(d) {return xScale(d.quizes-.1) - xScale(d.quizes);})




}
