var $ = function (selector) {
  var elements = [], i,j;
  var selectorParts = selector.match(/[#.]?[a-zA-Z0-9_-]+/g);

  var filtered = [];

  // Check the first selector part to see if it's an ID, Class or Tag.
  // This will be our initial array of elements to loop through.
  switch (selectorParts[0].charAt(0)) {
    case "#":
      // Returns a single element, so push to filtered.
      filtered.push(document.getElementById(selectorParts[0].substr(1)));
      break;
    case ".":
      // Returns node list so filtered = that list.
      filtered = findByClass(selectorParts[0].substr(1));
      // Function to check if getElementsByClassName exists (IE8 support).
      function findByClass(cls) {
        if (document.getElementsByClassName) {
          return document.getElementsByClassName(cls);
        } else {
          // IE8 alternative.
          var elements = document.getElementsByTagName("*");
          var found = [];
          for (var i=0; i<elements.length; i++) {
            if (elements[i].className.match(new RegExp("\\b"+cls+"\\b"))) {
              found.push(elements[i]);
            }
           }
           return found;
        }
      }
      break;
    default:
      // Returns node list so filtered = that list.
      filtered = document.getElementsByTagName(selectorParts[0]);
      break;
  }

  // Loop through each selector part, starting at second part.
  for (i=1; i<selectorParts.length; i++) {
    elements = [];
    // Loop through the nodes found previously, looking for the next selector part.
    for (j=0; j<filtered.length; j++) {
      // Check to see if is an ID or Class. If the current element in filtered matches the current selector part, push this to elements array.
      switch (selectorParts[i].charAt(0)) {
        case "#":
          if (filtered[j].id.match(new RegExp("\\b"+selectorParts[i].substr(1)+"\\b"))) { // Matches individual 'word'
            elements.push(filtered[j]);
          }
          break;
        case ".":
          if (filtered[j].className.match(new RegExp("\\b"+selectorParts[i].substr(1)+"\\b"))) { // Matches individual 'word'
            elements.push(filtered[j]);
          }
        break;
      }
    }
    // Update filtered array with new elements found.
    filtered = elements;
  }

  elements = filtered;
  return elements;
};