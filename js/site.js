"use strict";
require(function($, _, Backbone) {

var $window = $(window);
var firedFromInterval = false;
var intervalId = setInterval(function() {
    // if ($window.width() <= 480) {
    //     return;
    // }
    
    var n = -1;
    $("#icons li").each(function(i, li) {
        if ($(li).hasClass("active")) {
            n = i;
            return;
        }
    });
    
    if (n < 0)
        return;
    
    n += 1;
    if (n == $("#icons li").length)
        n = 0;
    
    firedFromInterval = true;
    $("#icons li").slice(n, n+1).click();
    firedFromInterval = false;
}, 7500);

$("#icons").click(function(e) {
    if ($(e.target).closest("li").hasClass("active"))
    // if ($window.width() <= 480 || $(e.target).closest("li").hasClass("active"))
        return false;
    
    if (!firedFromInterval)
        clearInterval(intervalId);
    
    var clickedLi = $(e.target).closest("li")[0];
    var n = -1;
    $("#icons li").each(function(i, li) {
        if (clickedLi == li) {
            n = i;
            return false;
        }
    });
    
    if (n < 0)
        return false;
    
    $("#icons li").removeClass("active").slice(n, n+1).addClass("active");
    if ($.support.transition) {
        $(".tab-pane.in").removeClass("in").one($.support.transition.end, function(e) {
            $(this).removeClass("active");
            // Order is important.  Needs to have "active" for offsetWidth
            // reflow trick to work, but reflow must be applied before
            // "in" is added.
            $(".tab-pane").slice(n, n+1).addClass("active");
            // Touching offsetWidth forces a reflow, which causes
            // the transition to occur when we apply "in".
            $(".tab-pane").slice(n, n+1)[0].offsetWidth;
            $(".tab-pane").slice(n, n+1).addClass("in");
        });
    } else {
        $(".tab-pane.in").removeClass("active in");
        $(".tab-pane").slice(n, n+1).addClass("active in");
    }
    
    return false;
});
