DB2 Health Monitor Sample Application
=====================================
This is a custom-built AJAX health monitoring web-console that I developed while
working at IBM in 2007 which was bundled with the publicly released DB2 Starter
Toolkit for PHP.  This sample application also includes the
[rojo-ajax-toolkit](https://github.com/natural-affinity/rojo-ajax-toolkit) which
was one of the very first AJAX toolkits that was developed and released at a
time when almost no commerical frameworks were available, or were still in their
infancy (e.g. dojo).  

The db2-health-monitor sample applicaton was considered cutting-edge for its time.  
To provide some historical context, it was released just as native XML databases
were being introduced, single-page AJAX web-applications were just becoming popular,
and just when the IT movement towards web services and SOA was really starting
to take off (e.g. PHP 5 did not have a native SOAP extension when this project
initially began).  

DeveloperWorks Articles
-----------------------
Several articles were released as complementary material to this sample application:
* [One Paradigm. Infinite Possibilities](http://www.ibm.com/developerworks/data/library/techarticle/dm-0712tejpar)
* [pureXML or DOM? You Decide.](http://www.ibm.com/developerworks/data/library/techarticle/dm-0801tejpar)


Disclaimer
----------
Since this toolkit was released in 2007, although it is cross-browser,
it has not been tested with mobile browsers.  However, the techniques as far as 
object-oriented design, memory management, event bubbling are concerned still 
stand the test of time.  Other practices such as JS object creation within the 
global space, asset minimization techniques, media queries for modern mobile 
pages need to be updated for production usage.  

Furthermore, since the DB2 Starter Toolkit for PHP has been removed from IBM
AlphaWorks, I have extracted this framework so that others may benefit from
its distribution.


Documentation
-------------
* Please see the extensive set of documentation in the Documentation directory
* Documentation template designs have been provided by IBM.


License
-------
Released under an IBM License.  See the LICENSE file for further details.
