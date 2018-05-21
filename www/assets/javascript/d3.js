var loadD3 = function() {
    //create somewhere to put the force directed graph
    var svg = d3.select("svg"),
        width = $( window ).width();
        height = $( window ).height();
        $("svg").attr("width", width);
        $("svg").attr("height", height);
        
    var color = d3.scaleOrdinal(d3.schemeCategory10);

    var nodes_data = gOAuth.userProfile.nodes;

    //set up the simulation 
    //nodes only for now 
    var simulation = d3.forceSimulation()
                        //add nodes
                        .nodes(nodes_data);	
                        
    //add forces
    //we're going to add a charge to each node 
    //also going to add a centering force
    simulation
        .force("link", d3.forceLink().id(function(d) { return d.id; }))
        .force("charge_force", d3.forceManyBody())
        .force("center_force", d3.forceCenter(width / 2, height / 2));

    //Time for the links 

    //Create links data 
    var links_data = gOAuth.userProfile.links;

    //Create the link force 
    //We need the id accessor to use named sources and targets 

    var link_force =  d3.forceLink(links_data)
                        .id(function(d) { return d.id; })

    //Add a links force to the simulation
    //Specify links  in d3.forceLink argument   

    simulation.force("links", link_force)

    //draw lines for the links 
    var link = svg.append("g")
                .attr("class", "links")
                .selectAll("line")
                .data(links_data)
                .enter().append("line")
                .attr("stroke-width", function(d) { return Math.sqrt(d.value); });       
                    
    //draw circles for the nodes 
    var node = svg.append("g")
            .attr("class", "nodes")
            .selectAll("circle")
            .data(nodes_data)
            .enter()
            .append("circle")
            .attr("r", 5)
            .attr("fill", function(d) { return color(d.group); }) ; 

        node.append("title")
            .text(function(d) { return d.id; });

    var legend = svg.selectAll(".legend")
        .data(color.domain())
        .enter().append("g")
        .attr("class", "legend")
        .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

    legend.append("rect")
        .attr("x", width*0.82)
        .attr("width", 18)
        .attr("height", 18)
        .style("fill", color);

    legend.append("text")
        .attr("x", width*0.8)
        .attr("y", 9)
        .attr("dy", ".35em")
        .style("text-anchor", "end")
        .text(function(d) { return d; });
        
    //add tick instructions: 
    simulation.on("tick", tickActions );

    function tickActions() {
        //update circle positions each tick of the simulation 
        node
            .attr("cx", function(d) { return d.x; })
            .attr("cy", function(d) { return d.y; });
            
        //update link positions 
        //simply tells one end of the line to follow one node around
        //and the other end of the line to follow the other node around
        link
            .attr("x1", function(d) { return d.source.x; })
            .attr("y1", function(d) { return d.source.y; })
            .attr("x2", function(d) { return d.target.x; })
            .attr("y2", function(d) { return d.target.y; });
    }                    

    var drag_handler = d3.drag()
        .on("start", drag_start)
        .on("drag", drag_drag)
        .on("end", drag_end);

    function drag_start(d) {
        if (!d3.event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
    }
        
    function drag_drag(d) {
        d.fx = d3.event.x;
        d.fy = d3.event.y;
    }
        
    function drag_end(d) {
        if (!d3.event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
    }

    drag_handler(node);
};