// Sample of how the compression tree should look like.
// A0 is the father (the root of the tree)
// each level introduce a byte in the final code 
// each node could have maximum 2 children (L - left (introduce a "0") and 
// R - right (introduce a "1"))
// the node name should contain the name of previous visited nodes.
// ex.: A0LR - Level 2, code: 01

// binary tree for "WHERE GOD HAS A CHURCH THE DEVIL WILL HAVE HIS CHAPEL"
var treeData =
  {
    "name": "A0 = 52",
    "children": [
      {
        "name": "Level 1: 26",
        "children": [
          { "name": "Level 2: 13",
              "children": [
                { "name": "Level 3: 6",
                    "children": [
                      { "name": "Level 4: 3",
                          "children": [
                            { "name": "Level 5: 1",
                                "children": [
                                  { "name": "Level 6: W" },
                                  { "name": "Level 6: P" }
                                ]
                            },
                            { "name": "Level 5: 2",
                                "children": [
                                  { "name": "Level 6: G" },
                                  { "name": "Level 6: D" }
                                ]
                            }
                          ]
                      },
                      { "name": "Level 4: 3",
                          "children": [
                            { "name": "Level 5: 1",
                                "children": [
                                  { "name": "Level 6: O" },
                                  { "name": "Level 6: U" }
                                ]
                            },
                            { "name": "Level 5: 2",
                                "children": [
                                  { "name": "Level 6: S" },
                                  { "name": "Level 6: V" }
                                ]
                            }
                          ]
                      }
                    ]
                },
                { "name": "Level 3: 7",
                    "children": [
                      { "name": "Level 4: 3",
                          "children": [
                            { "name": "Level 5: 1",
                                "children": [
                                  { "name": "Level 6: C" },
                                  { "name": "Level 6: I" }
                                ]
                            },
                            { "name": "Level 5: 2",
                                "children": [
                                  { "name": "Level 6: T" },
                                  { "name": "Level 6: R" }
                                ]
                            }
                          ]
                      },
                      { "name": "Level 4: 4",
                          "children": [
                            { "name": "Level 5: L" },
                            { "name": "Level 5: A" }
                          ]
                      }
                    ]
                }
              ]
          },
          { "name": "Level 2: 13",
              "children": [
                { "name": "Level 3: 6",
                    "children": [
                      { "name": "Level 4: E" },
                      { "name": "Level 4: H" }
                    ]
                },
                { "name": "Level 3: 7", 
                    "children": [
                      { "name": "Level 4: spatiu" },
                      { "name": "Level 4: ." }
                    ]
                }
              ]
          }
        ]
      },
      { "name": "Level 1: 26",
        "children": [
          { "name": "Level 2: 13", 
              "children": [
                { "name": "Level 3: 6",
                    "children": [
                      { "name": "Level 4: 3",
                          "children": [
                            { "name": "Level 5: 1",
                                "children": [
                                  { "name": "Level 6: B" },
                                  { "name": "Level 6: F" }
                                ]
                            },
                            { "name": "Level 5: 2",
                                "children": [
                                  { "name": "Level 6: M" },
                                  { "name": "Level 6: Y" }
                                ]
                            }
                          ]
                      },
                      { "name": "Level 4: 3",
                          "children": [
                            { "name": "Level 5: 1",
                                "children": [
                                  { "name": "Level 6: J" },
                                  { "name": "Level 6: K" }
                                ]
                            },
                            { "name": "Level 5: 2",
                                "children": [
                                  { "name": "Level 6: N" },
                                  { "name": "Level 6: Z" }
                                ]
                            }
                          ]
                      }
                    ]
                },
                { "name": "Level 3: 7",
                    "children": [
                      { "name": "Level 4: 3",
                          "children": [
                            { "name": "Level 5: 1",
                                "children": [
                                  { "name": "Level 6: Q" },
                                  { "name": "Level 6: X" }
                                ]
                            },
                            { "name": "Level 5: 2", 
                                "children": [
                                  { "name": "Level 6: ," },
                                  { "name": "Level 6: -" }
                                ]
                            }
                          ]
                      },
                      { "name": "Level 4: 4", 
                          "children": [
                            { "name": "Level 5: '" },
                            { "name": "Level 5: ;" }
                          ]
                      }
                    ]
                }
              ]
          },
          { "name": "Level 2: 13",
              "children": [
                { "name": "Level 3: 6", 
                    "children": [
                      { "name": "Level 4: 3",
                          "children": [
                            { "name": "Level 5: :" },
                            { "name": "Level 5: ?" }
                          ]
                      },
                      { "name": "Level 4: 3",
                          "children": [
                            { "name": "Level 5: !" },
                            { "name": "Level 5: *" }
                          ]
                      }
                    ]
                },
                { "name": "Level 3: 7",
                    "children": [
                      { "name": "Level 4: 3", 
                          "children": [
                            { "name": "Level 5: #" },
                            { "name": "Level 5: $" }
                          ]
                      },
                      { "name": "Level 4: 4",
                          "children": [
                            { "name": "Level 5: %" },
                            { "name": "Level 5: &" }
                          ]
                      }
                    ]
                }
              ]
          }
        ]
      }
    ]
  };

// Set the dimensions and margins of the diagram
var margin = {top: 20, right: 90, bottom: 30, left: 90},
    width = 3060 - margin.left - margin.right,
    height = 1000 - margin.top - margin.bottom;

	
// append the svg object to the body of the page
// appends a 'group' element to 'svg'
// moves the 'group' element to the top left margin
var svg = d3.select("body").append("svg")
    .attr("width", width + margin.right + margin.left)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate("
          + margin.left + "," + margin.top + ")");

var i = 0,
    duration = 750,
    root;

// declares a tree layout and assigns the size
var treemap = d3.tree().size([height, width]);

// Assigns parent, children, height, depth
root = d3.hierarchy(treeData, function(d) { return d.children; });
root.x0 = height / 2;
root.y0 = 0;

// Collapse after the second level
root.children.forEach(collapse);

update(root);

// Collapse the node and all it's children
function collapse(d) {
  if(d.children) {
    d._children = d.children
    d._children.forEach(collapse)
    d.children = null
  }
}

function update(source) {

  // Assigns the x and y position for the nodes
  var treeData = treemap(root);

  // Compute the new tree layout.
  var nodes = treeData.descendants(),
      links = treeData.descendants().slice(1);

  // Normalize for fixed-depth.
  nodes.forEach(function(d){ d.y = d.depth * 180});

  // ****************** Nodes section ***************************

  // Update the nodes...
  var node = svg.selectAll('g.node')
      .data(nodes, function(d) {return d.id || (d.id = ++i); });

  // Enter any new modes at the parent's previous position.
  var nodeEnter = node.enter().append('g')
      .attr('class', 'node')
      .attr("transform", function(d) {
        return "translate(" + source.y0 + "," + source.x0 + ")";
    })
    .on('click', click);

  // Add Circle for the nodes
  nodeEnter.append('circle')
      .attr('class', 'node')
      .attr('r', 1e-6)
      .style("fill", function(d) {
          return d._children ? "lightsteelblue" : "#fff";
      });

  // Add labels for the nodes
  nodeEnter.append('text')
      .attr("dy", ".35em")
      .attr("x", function(d) {
          return d.children || d._children ? -13 : 13;
      })
      .attr("text-anchor", function(d) {
          return d.children || d._children ? "end" : "start";
      })
      .text(function(d) { return d.data.name; });

  // UPDATE
  var nodeUpdate = nodeEnter.merge(node);

  // Transition to the proper position for the node
  nodeUpdate.transition()
    .duration(duration)
    .attr("transform", function(d) { 
        return "translate(" + d.y + "," + d.x + ")";
     });

  // Update the node attributes and style
  nodeUpdate.select('circle.node')
    .attr('r', 10)
    .style("fill", function(d) {
        return d._children ? "lightsteelblue" : "#fff";
    })
    .attr('cursor', 'pointer');


  // Remove any exiting nodes
  var nodeExit = node.exit().transition()
      .duration(duration)
      .attr("transform", function(d) {
          return "translate(" + source.y + "," + source.x + ")";
      })
      .remove();

  // On exit reduce the node circles size to 0
  nodeExit.select('circle')
    .attr('r', 1e-6);

  // On exit reduce the opacity of text labels
  nodeExit.select('text')
    .style('fill-opacity', 1e-6);

  // ****************** links section ***************************

  // Update the links...
  var link = svg.selectAll('path.link')
      .data(links, function(d) { return d.id; });

  // Enter any new links at the parent's previous position.
  var linkEnter = link.enter().insert('path', "g")
      .attr("class", "link")
      .attr('d', function(d){
        var o = {x: source.x0, y: source.y0}
        return diagonal(o, o)
      });

  // UPDATE
  var linkUpdate = linkEnter.merge(link);

  // Transition back to the parent element position
  linkUpdate.transition()
      .duration(duration)
      .attr('d', function(d){ return diagonal(d, d.parent) });

  // Remove any exiting links
  var linkExit = link.exit().transition()
      .duration(duration)
      .attr('d', function(d) {
        var o = {x: source.x, y: source.y}
        return diagonal(o, o)
      })
      .remove();

  // Store the old positions for transition.
  nodes.forEach(function(d){
    d.x0 = d.x;
    d.y0 = d.y;
  });

  // Creates a curved (diagonal) path from parent to the child nodes
  function diagonal(s, d) {

    path = `M ${s.y} ${s.x}
            C ${(s.y + d.y) / 2} ${s.x},
              ${(s.y + d.y) / 2} ${d.x},
              ${d.y} ${d.x}`

    return path
  }

  // Toggle children on click.
  function click(d) {
    if (d.children) {
        d._children = d.children;
        d.children = null;
      } else {
        d.children = d._children;
        d._children = null;
      }
    update(d);
  }
}

// Function to calculate character frequency and generate codes
function generateHuffmanCodes() {
  const text = "WHERE GOD HAS A CHURCH THE DEVIL WILL HAVE HIS CHAPEL";
  const frequencyMap = {};
  
  // Count character frequencies
  for (let char of text) {
    if (frequencyMap[char]) {
      frequencyMap[char]++;
    } else {
      frequencyMap[char] = 1;
    }
  }
  
  // Display character frequencies and codes
  let outputDiv = document.createElement('div');
  outputDiv.className = 'output';
  outputDiv.innerHTML = '<h3>Character Frequencies:</h3>';
  
  let codeTable = '<table border="1"><tr><th>Character</th><th>Frequency</th><th>Code</th></tr>';
  
  // These codes would normally be generated from the Huffman tree
  // For demonstration, we're providing sample codes
  const codes = {
    'W': '00000',
    'H': '0101',
    'E': '100',
    'R': '0111',
    ' ': '101',
    'G': '00010',
    'O': '00100',
    'D': '00011',
    'A': '0110',
    'C': '00110',
    'U': '00101',
    'T': '01110',
    'V': '00111',
    'I': '00111',
    'L': '0110',
    'P': '00001',
    'S': '00110'
  };
  
  for (let char in frequencyMap) {
    codeTable += `<tr><td>${char === ' ' ? 'SPACE' : char}</td><td>${frequencyMap[char]}</td><td>${codes[char] || '---'}</td></tr>`;
  }
  
  codeTable += '</table>';
  outputDiv.innerHTML += codeTable;
  
  document.body.appendChild(outputDiv);
}

// Add a button to generate the codes
window.onload = function() {
  let button = document.createElement('button');
  button.className = 'process-button';
  button.innerHTML = 'Generate Huffman Codes';
  button.onclick = generateHuffmanCodes;
  document.body.insertBefore(button, document.querySelector('svg').nextSibling);
  
  // Add the expression to the input
  document.querySelector('.message').value = "WHERE GOD HAS A CHURCH THE DEVIL WILL HAVE HIS CHAPEL";
};