$(function(){
    var
        position = new google.maps.LatLng(45.45218, 9.21534),
        map = new google.maps.Map(
            document.getElementById("map_canvas"),
            {
                center: position,
                zoom: 14,
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                streetViewControl: false,
                scaleControl: true
            }
        ),
        marker = new google.maps.Marker({ map:map, clickable:false, position:position });
        //google.maps.event.addListener(map, 'resize', function() { map.setCenter(position); });

    function refreshMap() {
        google.maps.event.trigger(map, 'resize');
        map.setCenter(position);
    }

    $("section").accordion({
        heightStyle:"fill",
        icons:false,
        header:'h1',
        activate:function(event, ui) {
            if ($("#map_canvas").closest(ui.newPanel).size())
                refreshMap();
        }
    });
    $(window).resize(function(){
        $("section").accordion("refresh");
        refreshMap();
    });


});
