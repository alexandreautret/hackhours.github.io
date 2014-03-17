/*
 Animating a path on a Google Map by Christian Heilmann
 Homepage: http://isithackday.com/spirit-of-indiana/map.html
 Copyright (c)2010 Christian Heilmann
 Code licensed under the BSD License:
 http://wait-till-i.com/license.txt
 */
var spirit = {};
spirit.initializeSF = function(){

    /* Define start and end points */

    var start = [49.434370,1.090643],
        end = [37.786597, -122.387143],
        startpos = new google.maps.LatLng(start[0],start[1]),
        endpos = new google.maps.LatLng(end[0],end[1]),
        mapelm = document.getElementById('mapcanvas');

    /* Draw map */
    var map = new google.maps.Map(
        mapelm,
        {
            disableDefaultUI:true,
            zoom: 4,
            center: new google.maps.LatLng(start[0],start[1]),
            mapTypeId: google.maps.MapTypeId.TERRAIN
        });
    map.setCenter(new google.maps.LatLng(end[0],end[1]));
    //map.setCenter(new google.maps.LatLng(start[0],start[1]));
    var markerrouen = new google.maps.Marker({
        position: startpos,
        map:map,
        title:'Rouen'
    });
    var markerSF = new google.maps.Marker({
        position:endpos,
        map:map,
        color:'#77488A',
        title:'San Francisco'
    });


    /* Assume 30 animation frames and calculate the necessary increase */
    var animationstart = 0,
        animationend = 300,
        now = animationstart,
        amount = animationend - animationstart,
pos=[],
        addx = (end[0] - start[0]) / amount,
        addy = (end[1] - start[1]) / amount,
        i,full,path;

    /* Calculate the points and seed the array */
    for(i=animationstart;i<animationend;i++){
        pos[i] = new google.maps.LatLng(start[0] += addx,start[1] += addy);
    }

    /* Once all tiles have loaded, start the animation */
    google.maps.event.addListener(map,'tilesloaded',function(){
        spirit.draw();
    },false);

    var contentString = '<div id="content">'+
        '<div id="siteNotice">'+
        '</div>'+
        '<h1 id="firstHeading" class="firstHeading">Voyage à San Francisco</h1>'+
        '<div id="bodyContent">'+
        '<p><b>SF</b>, pour <b> deux</b>, personnes ! </br>' +
        '<img src="img/DowntownSF.jpg" style="max-width: 100%; max-height: 270px; border-radius:10px;" />'+
        '</div>'+
        '</div>';

    var infowindow = new google.maps.InfoWindow({
        content: contentString
    });



    /* Recursive method to draw the line and move the map*/
    spirit.draw = function(){




        var path = new google.maps.Polyline({
            path: [startpos,pos[now]],
            strokeColor:'#1ABC9C',
            strokeOpacity:0.7,
            strokeWeight:10
        });

        path.setMap(map);
        map.panTo(pos[now]);
        now = now + 1;

        if(now < animationend-8){
            setTimeout(spirit.draw,20);
        }

        infowindow.open(map,markerSF);
    };

};



$( document ).ready(function() {
    //spirit.initializeSF();
});
$('a[href="#tirage-au-sort"]').on('shown.bs.tab', function (e) {
    spirit.initializeSF();

    //spirit.draw();



})
