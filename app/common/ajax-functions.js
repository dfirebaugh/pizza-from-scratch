'use strict'; // What does this mean, and how does it work?

const appUrl = window.location.origin;
const ajaxFunctions = { // What are ajax functions, again?
   ready: function ready (fn) {
      if (typeof fn !== 'function') {
         return; // What is returned when nothing is specified?
      }

      if (document.readyState === 'complete') {
         return fn(); // Which function? What does fn() do?
      }

      document.addEventListener('DOMContentLoaded', fn, false); // Document Object Model?
   },
   ajaxRequest: ajaxRequest = (method, url, callback) => {
      const xmlhttp = new XMLHttpRequest(); // What is "xmlhttp"?

      xmlhttp.onreadystatechange = function () {
         if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
            callback(xmlhttp.response);
         }
      };

      xmlhttp.open(method, url, true);
      xmlhttp.send();
   }
};