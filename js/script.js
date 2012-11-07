$(function(){

    function Map(elementId, lat, lng) {
        this.position = new google.maps.LatLng(lat, lng);
        this.$element = $('#'+elementId);
        this.$element.data('map', this);
        this.status = 'windowed';
        this.map = new google.maps.Map(
            document.getElementById(elementId),
            {
                center: this.position,
                zoom: 14,
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                streetViewControl: false,
                scaleControl: true
            }
        );
        this.marker = new google.maps.Marker({ map:this.map, clickable:false, position:this.position });
        this.refresh = function() {
            if (this.status == 'fullscreen')
                this.$element.css({
                    height:$(window).height(),
                    width:$(window).width()
                });
            google.maps.event.trigger(this.map, 'resize');
            this.map.setCenter(this.position);
        };
        this.fullscreen = function() {
            this.$element.appendTo('body').css({
                height:$(window).height(),
                width:$(window).width(),
                position:'absolute',
                top:0,
                left:0
            });
            $('<button class="windowed">Chiudi</button>').button().appendTo(this.$element).click(function(){ $(this).closest('#'+elementId).data('map').windowed(); });
            this.refresh();
            this.status = 'fullscreen';
        };
        this.windowed = function() {
            this.$element.appendTo('.map_container').css({
                position:'relative',
                width:'100%',
                height:'100%'
            });
            this.$element.find('button.windowed').remove();
            this.refresh();
            this.status = 'windowed';
        }
    }

    var map = new Map("map_canvas", 45.45218, 9.21534);

    $("section").accordion({
        heightStyle:"fill",
        icons:false,
        header:'h1',
        activate:function(event, ui) {
            if ($("#map_canvas").closest(ui.newPanel).size())
                map.refresh();
        }
    });
    $(window).resize(function(){
        $("section").accordion("refresh");
        map.refresh();
    });

    $('button.accept').button({icons: {primary: "ui-icon-check"}});
    $('button.reject').button({icons: {primary: "ui-icon-closethick"}});
    $('button.fullscreenmap')
        .button({icons: {primary: "ui-icon-arrow-4-diag"}})
        .click(function(){
            map.fullscreen();
        });

    $(document).keydown(function(e) {
        // ESCAPE key pressed
        if (e.keyCode == 27) {
            if (map.status == 'fullscreen')
                map.windowed();
        }
    });
});
