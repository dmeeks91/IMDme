var util = {
    toggleClass: function(el,className,add)
    {
        const action = (add) ? "addClass" : "removeClass";
        $(el)[action](className)
    }
}