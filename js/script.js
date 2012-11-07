$(function(){
    $("section").accordion({heightStyle:"fill", icons:false, header:'h1'});
    $(window).resize(function(){
        $("section").accordion("refresh");
    });
});
