// Sample of how the compression tree should look like.
// A0 is the father (the root of the tree)
// each level introduce a byte in the final code 
// each node could have maximum 2 children (L - left (introduce a "0") and 
// R - right (introduce a "1"))
// the node name should contain the name of previous visited nodes.
// ex.: A0LR - Level 2, code: 01

// binary tree for "BE STRONG, YOUNG MAN! THROUGH THIS WAY ONE GETS TO THE STARS."
// Using Shannon-Fano coding algorithm
var treeData =
  {
    "name": "A0",
    "children": [
      {
        "name": "Level 1: A0R",
        "children": [
          { "name": "Level 2: A0RR",
              "children": [
                { "name": "Level 3: A0RRR",
                    "children": [
                      { "name": "Level 4: A0RRRR",
                          "children": [
                            { "name": "Level 5: A0RRRRR = U" },
                            { "name": "Level 5: A0RRRRL = G" }
                          ]
                      },
                      { "name": "Level 4: A0RRRL",
                          "children": [
                            { "name": "Level 5: A0RRRLR = Y" },
                            { "name": "Level 5: A0RRRLL = B" }
                          ]
                      }
                    ]
                },
                { "name": "Level 3: A0RRL",
                    "children": [
                      { "name": "Level 4: A0RRLR",
                          "children": [
                            { "name": "Level 5: A0RRLRR = M" },
                            { "name": "Level 5: A0RRLRL = W" }
                          ]
                      },
                      { "name": "Level 4: A0RRLL",
                          "children": [
                            { "name": "Level 5: A0RRLLR = ," },
                            { "name": "Level 5: A0RRLLL = !" }
                          ]
                      }
                    ]
                }
              ]
          },
          { "name": "Level 2: A0RL",
              "children": [
                { "name": "Level 3: A0RLR",
                    "children": [
                      { "name": "Level 4: A0RLRR = N" },
                      { "name": "Level 4: A0RLRL = O" }
                    ]
                },
                { "name": "Level 3: A0RLL",
                    "children": [
                      { "name": "Level 4: A0RLLR = S" },
                      { "name": "Level 4: A0RLLL = R" }
                    ]
                }
              ]
          }
        ]
      },
      { "name": "Level 1: A0L",
        "children": [
          { "name": "Level 2: A0LR",
              "children": [
                { "name": "Level 3: A0LRR",
                    "children": [
                      { "name": "Level 4: A0LRRR = A" },
                      { "name": "Level 4: A0LRRL = H" }
                    ]
                },
                { "name": "Level 3: A0LRL",
                    "children": [
                      { "name": "Level 4: A0LRLR = E" },
                      { "name": "Level 4: A0LRLL = T" }
                    ]
                }
              ]
         },
          { "name": "Level 2: A0LL = spatiu" }
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

// Function to calculate Shannon-Fano codes for the string
function generateShannonFanoCodes() {
  const text = "BE STRONG, YOUNG MAN! THROUGH THIS WAY ONE GETS TO THE STARS.";
  const frequencyMap = {};
  
  // Count character frequencies
  for (let char of text) {
    if (frequencyMap[char]) {
      frequencyMap[char]++;
    } else {
      frequencyMap[char] = 1;
    }
  }
  
  // Create array of [character, frequency] pairs
  let charFreqs = [];
  for (let char in frequencyMap) {
    charFreqs.push([char, frequencyMap[char]]);
  }
  
  // Sort by frequency in descending order
  charFreqs.sort((a, b) => b[1] - a[1]);
  
  // Generate codes using Shannon-Fano algorithm
  const codes = {};
  
  // Function to recursively divide and assign codes
  function shannonFano(chars, prefix = '') {
    if (chars.length === 1) {
      codes[chars[0][0]] = prefix || '0'; // For single character case
      return;
    }
    
    // Find split point to divide the list into two parts with roughly equal frequencies
    const totalFreq = chars.reduce((sum, item) => sum + item[1], 0);
    let runningSum = 0;
    let splitIndex = 0;
    
    for (let i = 0; i < chars.length; i++) {
      runningSum += chars[i][1];
      if (runningSum >= totalFreq / 2) {
        splitIndex = i;
        break;
      }
    }
    
    // Split index should ensure both groups have at least one character
    if (splitIndex === 0) {
      splitIndex = 1;
    }
    
    // Split and recurse
    const leftGroup = chars.slice(0, splitIndex + 1);
    const rightGroup = chars.slice(splitIndex + 1);
    
    // Assign '0' to left group and '1' to right group
    if (leftGroup.length > 0) {
      shannonFano(leftGroup, prefix + '0');
    }
    
    if (rightGroup.length > 0) {
      shannonFano(rightGroup, prefix + '1');
    }
  }
  
  // Start the Shannon-Fano algorithm
  shannonFano(charFreqs);
  
  // Display character frequencies and codes
  let outputDiv = document.createElement('div');
  outputDiv.className = 'output';
  outputDiv.innerHTML = '<h3>Shannon-Fano Algorithm - Character Frequencies and Codes:</h3>';
  
  let codeTable = '<table border="1"><tr><th>Character</th><th>Frequency</th><th>Code</th></tr>';
  
  // Sort by frequency for display
  charFreqs.sort((a, b) => b[1] - a[1]);
  
  for (let [char, freq] of charFreqs) {
    codeTable += `<tr><td>${char === ' ' ? 'SPACE' : char}</td><td>${freq}</td><td>${codes[char]}</td></tr>`;
  }
  
  codeTable += '</table>';
  outputDiv.innerHTML += codeTable;
  
  // Calculate compression statistics
  const originalBits = text.length * 8; // Assuming 8 bits per character in original text
  
  let compressedBits = 0;
  for (let char of text) {
    compressedBits += codes[char].length;
  }
  
  const compressionRatio = ((originalBits - compressedBits) / originalBits * 100).toFixed(2);
  
  outputDiv.innerHTML += `<p>Original text length: ${text.length} characters (${originalBits} bits)</p>`;
  outputDiv.innerHTML += `<p>Compressed text length: ${compressedBits} bits</p>`;
  outputDiv.innerHTML += `<p>Compression ratio: ${compressionRatio}%</p>`;
  
  // Display the encoded text
  let encodedText = '';
  for (let char of text) {
    encodedText += codes[char] + ' ';
  }
  
  outputDiv.innerHTML += `<h4>Encoded text:</h4>`;
  outputDiv.innerHTML += `<div class="DivWithScroll">${encodedText}</div>`;
  
  document.body.appendChild(outputDiv);
}

// Add a button to generate the codes
window.onload = function() {
  // Update page title
  document.title = "Shannon-Fano Compression";
  
  // Add heading and explanation
  let heading = document.createElement('h1');
  heading.textContent = "Shannon-Fano Compression Algorithm";
  document.body.insertBefore(heading, document.body.firstChild);
  
  let subheading = document.createElement('p');
  subheading.innerHTML = 'For the expression: <strong>"BE STRONG, YOUNG MAN! THROUGH THIS WAY ONE GETS TO THE STARS."</strong>';
  document.body.insertBefore(subheading, heading.nextSibling);
  
  // Set the input field value
  document.querySelector('.message').value = "BE STRONG, YOUNG MAN! THROUGH THIS WAY ONE GETS TO THE STARS.";
  
  // Create and add the button
  let button = document.createElement('button');
  button.className = 'process-button';

  button.onclick = generateShannonFanoCodes;
  document.body.insertBefore(button, document.querySelector('svg').nextSibling);
  
  // Add algorithm explanation
  let explanation = document.createElement('div');
  explanation.className = 'output-empty';
  explanation.innerHTML = '<h3>Shannon-Fano Algorithm Steps:</h3>' + 
                         '<ol>' +
                         '<li>Count frequency of each character in the text</li>' +
                         '<li>Sort characters by frequency in descending order</li>' +
                         '<li>Recursively divide the list into two parts with roughly equal total frequencies</li>' +
                         '<li>Assign "0" to characters in the first part and "1" to characters in the second part</li>' +
                         '<li>Repeat the division process until each subset contains only one character</li>' +
                         '</ol>';
  document.body.insertBefore(explanation, document.querySelector('.output-empty').nextSibling);
};