$(document).ready(function () {
    
    $.easing.def = 'easeInOutBack';
    $('#navTree').BootSideMenu({ side: "left", autoClose: false });
    require(["js/appLoader.js", "dojo/domReady"]);
})