import './library/jquery.js';
import './library/jquery-1.11.0.min.js';
import './library/jquery.lazyload.js';

$(function () {
    $("img.lazy").lazyload({ effect: "fadeIn" });
});