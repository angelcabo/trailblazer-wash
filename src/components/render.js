//helpers
var d3 = require('d3');
require('d3-tip');
var tooltipView = require('./tooltip-view');
var _ = require('lodash');

//environment settings
var ENV = chrome.windows ? "extension" : "public";
var nodeGroup = (ENV === "extension") ? 'g' : 'a';

//variables
var nodeHaloD = "M18.9063355 0.1 L33.942812 9 C34.6940305 9.5 35.3 10.5 35.3 11.4 L35.3030134 29.2 C35.3030134 30.1 34.7 31.2 33.9 31.6 L18.9063355 40.5 C18.1551171 40.9 16.9 40.9 16.2 40.5 L1.14945629 31.6 C0.39823781 31.2 -0.2 30.1 -0.2 29.2 L-0.21074509 11.4 C-0.21074509 10.5 0.4 9.5 1.1 9 L16.1859328 0.1 C16.9371513 -0.3 18.2 -0.3 18.9 0.1 Z",
  nodeCoreD = "M18.2007195 11.2 L24.9141649 15.1 C25.2495669 15.3 25.5 15.8 25.5 16.2 L25.5214639 24.2 C25.5214639 24.5 25.2 25 24.9 25.2 L18.2007195 29.2 C17.8653175 29.4 17.3 29.4 17 29.2 L10.272676 25.2 C9.93727401 25 9.7 24.5 9.7 24.2 L9.66537697 16.2 C9.66537697 15.8 9.9 15.3 10.3 15.1 L16.9861214 11.2 C17.3215234 11 17.9 11 18.2 11.2 Z",
  //hack to account for offset [0,0] coordinates of generated inline svg
  offsetX = 18,
  offsetY = 21,
  favIconSize = 10,
  favIconOffsetX = offsetX - (favIconSize/2)-0.5,
  favIconOffsetY = offsetY - (favIconSize/2)-0.5;

// Rendering function - takes the format returned by d3ify(), i.e.
// render("selector", {nodes: nodes[], links: links[] })
module.exports = function(data, options, component) {
  console.log('render fired')
  var options = options || {},
      width = options.width || 960,
      height  = options.height || 500,
      selector = options.selector || "#map";

  //internal functions
  var force = d3.layout.force()
    .linkDistance(40)
    .linkStrength(1)
    .charge(-700)
    .gravity(0.18)
    .size([width, height]);

  var zoom = function () {
    map.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
  };

  var tip = d3.tip()
    .direction("s")
    .offset([0, 0])
    .attr("class", "tooltip")
    .html(tooltipView);

  force.nodes(data.nodes).links(data.links).start();
  //inject force API into parent component
  component.setState({force: force});

  //generate svg elements with d3
  var svg = d3.select(selector);
  var inner = svg.select('#zoom');
  var map = svg.select('#mapG');

  inner.call(d3.behavior.zoom().scaleExtent([.5, 4]).on("zoom", zoom));

  var links = map.selectAll(".link")
        .data(data.links)
        .enter()
          .append("line")
            .attr("class", "link");

  var gnodes = map.selectAll(".node")
        .data(data.nodes, function(d) { return d.localId })
        .enter()
        .append(nodeGroup)
        .classed('node', true)
        .classed('open', function(d) { return d.tabId })
        .classed('root', function(d) { return (d.parentId || d.localParentId) ? false : true })
        .classed('hub',  function(d) { return d.childCount >= 3 ? true : false })
        .classed('waypoint', function(d) { return d.rank === 1 ? true : false })
        .attr('xlink:href', function(d) { return (ENV === 'public') ? d.url : false })
        .attr('target', function(d) { return (ENV === 'public') ? '_blank' : false });

  var nodeHalos = gnodes.append('path')
                    .attr('d', nodeHaloD)
                    .attr("class", "node-halo");

  var nodes = gnodes
                    .append('path')
                    .attr('d', nodeCoreD)
                    .attr("class", "node-core");

  var favicons = gnodes.append('image')
                    .attr('xlink:href', function(d) { return (d.favicon_url) ? d.favicon_url : "chrome://favicon/" + d.url })
                    .attr('x', favIconOffsetX)
                    .attr('y', favIconOffsetY)
                    .attr('height', favIconSize)
                    .attr('width', favIconSize);

  var hoverOvers = gnodes.append('path')
                    .attr('d', nodeCoreD)
                    .classed('core-overlay', true)
                    .attr('opacity', 0);


  var persistLayout = _.debounce(function() {
    if (component.props.actions) try {
      var o = {};
      _.each(data.nodes, function(n) {
        o[n.localId] = { x: n.x, y: n.y };
      });

      component.props.actions.saveMapLayout(component.props.data.assignment.localId, o);
    } catch (e) { console.log(e); }
  }, 1500, { leading: true });;

  //register listeners
  force.on("tick", function() {
    links.attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; });

    gnodes.attr("transform", function(d) { return "translate(" +(d.x-offsetX)+ "," +(d.y-offsetY)+ ")"; })

    if (force.alpha() <= 0.018) persistLayout();
  });

  force.on("end", persistLayout);

  map.call(tip);
  map.selectAll(".core-overlay")
    .on('mouseover', tip.show)
    .on('mouseout', tip.hide);

  // Register the click handler for the nodes
  if (ENV === "extension") {
    var nodeClick = require('./ext-node-click');

    map.selectAll(".node")
      .on('click', function(d) {
        force.stop();
        nodeClick(d);
      });
  }
};