var map = new google.maps.Map(d3.select("#map").node(),{
  center:new google.maps.LatLng(55.860916,-4.251433),
  zoom: 5,
  mapTypeId: google.maps.MapTypeId.HYBRID,
  backgroundColor: "white",
  mapMaker: 'True',
  // keyboardShortcuts: false,
  mapTypeControl: false,
  navigationControl: false,
  streetViewControl: false,
  zoomControl: false,
  gestureHandling: "none",
  fullscreenControl: false,
  styles: [
  {
      featureType: 'transit',
      elementType: 'labels.icon',
      stylers: [{ visibility: 'off' }]
  },
  {
      featureType: 'poi',
      stylers: [{ visibility: 'off' }]
  },
  {
      featureType: 'road',
      stylers: [{ visibility: 'off' }]
  },
  {
  featureType: "all",
  elementType: "labels",
  stylers: [
    { visibility: "off" }
  ]
}
]
});

var overlay1, layer1,projection1,marker1;

d3.json("http://34.38.72.236/Circles/Towns/50",function(data1) {

   overlay1 = new google.maps.OverlayView();

  overlay1.onAdd = function() {
       layer1 = d3.select(this.getPanes().overlayMouseTarget)
                     .append("div")
                     .attr("class", "towns");

      overlay1.draw = function() {
                projection1 = this.getProjection(),
                                 padding = 10;

               var tooltip = d3.select("body")
                               .append("div")
                               .attr("class", "tooltip")
                               .style("opacity", 0);

                marker1 = layer1.selectAll("svg")
                                   .data(data1)
                                   .each(transform)
                                   .enter().append("svg:svg")
                                   .each(transform)
                                   .attr("class", "marker1");

                   marker1.append("svg:circle")
                          .attr("r", function(d){return d.Population/16000})
                          .attr("cx", padding)
                          .attr("cy", padding)
                          .style("fill"," #FFFF00")

              .on("mouseover", function(d) {

                  tooltip.transition()
                         .delay(200)
                         .duration(200)
                         .style("opacity", .9);

                  tooltip.html("County: "+d.County+"<br>" +"Town: " + d.Town +"<br>"+ "Population: " + d.Population );

                  tooltip
                    .style("left", (d3.event.pageX + 5) + "px")
                    .style("top", (d3.event.pageY - 28) + "px");
              })

              .on("mouseout", function() {
                  tooltip.transition()
                  .duration(200)
                  .style("opacity", 0);
              });

              function transform(d) {
                pos1 = new google.maps.LatLng(d.lat, d.lng);
                pos1 = projection1.fromLatLngToDivPixel(pos1);
                return d3.select(this)
                         .style("left", (pos1.x - padding) + "px")
                         .style("top", (pos1.y - padding) + "px");
                    }
              };

  };

    overlay1.setMap(map);
});


d3.select("#ncount").on("input", function() {
callJSON(+this.value);
});

callJSON(50);
function callJSON(ncount) {

d3.select("#ncount-value").text(ncount);
d3.select("#ncount").property("value", ncount);

d3.json("http://34.38.72.236/Circles/Towns/"+ncount,function(data1) {

     overlay1 = new google.maps.OverlayView();

    overlay1.onAdd = function() {

         layer1.transition().duration(700).style("opacity",0).ease(d3.easeSinIn).remove();

         layer1 = d3.select(this.getPanes().overlayMouseTarget)
                       .append("div")
                       .attr("class", "towns");

        overlay1.draw = function() {
                  projection1 = this.getProjection(),
                                   padding = 10;

                 var tooltip = d3.select("body")
                                 .append("div")
                                 .attr("class", "tooltip")
                                 .style("opacity", 0);


                  marker1 = layer1.selectAll("svg")
                                     .data(data1)
                                     .each(transform)
                                     .enter().append("svg:svg")
                                     .each(transform)
                                     .attr("class", "marker1");

                     marker1.append("svg:circle")
                            .attr("r", function(d){return d.Population/16000})
                            .attr("cx", padding)
                            .attr("cy", padding)
                            .style("fill"," #FFFF00")

                .on("mouseover", function(d) {

                    tooltip.transition()
                           .delay(200)
                           .duration(200)
                           .style("opacity", .9);

                    tooltip.html("County: "+d.County+"<br>" +"Town: " + d.Town +"<br>"+ "Population: " + d.Population );

                    tooltip
                      .style("left", (d3.event.pageX + 5) + "px")
                      .style("top", (d3.event.pageY - 28) + "px");
                })

                .on("mouseout", function() {
                    tooltip.transition()
                    .duration(200)
                    .style("opacity", 0);
                });

                function transform(d) {
                  pos1 = new google.maps.LatLng(d.lat, d.lng);
                  pos1 = projection1.fromLatLngToDivPixel(pos1);
                  return d3.select(this)
                           .style("left", (pos1.x - padding) + "px")
                           .style("top", (pos1.y - padding) + "px");
                      }
                };

    };

      overlay1.setMap(map);
  });

  d3.select("button").on("click", function(){
  d3.json("http://34.38.72.236/Circles/Towns/"+ncount,function(data1) {

         overlay1 = new google.maps.OverlayView();

        overlay1.onAdd = function() {

             layer1.transition().duration(700).style("opacity",0).ease(d3.easeSinIn).remove();

             layer1 = d3.select(this.getPanes().overlayMouseTarget)
                           .append("div")
                           .attr("class", "towns");

            overlay1.draw = function() {
                      projection1 = this.getProjection(),
                                       padding = 10;

                     var tooltip = d3.select("body")
                                     .append("div")
                                     .attr("class", "tooltip")
                                     .style("opacity", 0);


                      marker1 = layer1.selectAll("svg")
                                         .data(data1)
                                         .each(transform)
                                         .enter().append("svg:svg")
                                         .each(transform)
                                         .attr("class", "marker1");

                         marker1.append("svg:circle")
                                .attr("r", function(d){return d.Population/16000})
                                .attr("cx", padding)
                                .attr("cy", padding)
                                .style("fill",'#'+Math.floor(Math.random()*16777215).toString(16))

                    .on("mouseover", function(d) {

                        tooltip.transition()
                               .delay(200)
                               .duration(200)
                               .style("opacity", .9);

                        tooltip.html("County: "+d.County+"<br>" +"Town: " + d.Town +"<br>"+ "Population: " + d.Population );

                        tooltip
                          .style("left", (d3.event.pageX + 5) + "px")
                          .style("top", (d3.event.pageY - 28) + "px");
                    })

                    .on("mouseout", function() {
                        tooltip.transition()
                        .duration(200)
                        .style("opacity", 0);
                    });

                    function transform(d) {
                      pos1 = new google.maps.LatLng(d.lat, d.lng);
                      pos1 = projection1.fromLatLngToDivPixel(pos1);
                      return d3.select(this)
                               .style("left", (pos1.x - padding) + "px")
                               .style("top", (pos1.y - padding) + "px");
                          }
                    };

        };
        overlay1.setMap(map);
      });
});

}
