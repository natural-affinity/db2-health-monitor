/*
 * @project Web Service Consumer GUI JavaScript Header File
 * @author Rizwan Tejpar <rtejpar@ca.ibm.com>
 * @version 1.0
 * @updated 07/22/07
 * @verified 07/22/07 (JSlint)
 * @browser IE6, IE7, Firefox 1.5, Firefox 2
 * @disclaimer
 *          Any references or links in this document to non-IBM Web sites are provided for convenience
 *          only and do not in any manner serve as an endorsement of those non-IBM Web sites or their
 *          owners. The materials at the non-IBM Web sites are not owned or licensed by IBM and use of
 *          those non-IBM Web sites is at your own risk. IBM makes no representations, warranties, or
 *          other commitments whatsoever about any non-IBM Web sites or third-party resources that may
 *          be referenced, accessible from, or linked from this document. In addition, IBM is not a
 *          party to or responsible for any transactions you may enter into with third parties, even if
 *          you learn of such parties (or use a link to such parties) from this document. You are
 *          responsible for compliance with any license terms or other obligations for use of the
 *          non-IBM Web sites in respect of your use of those non-IBM Web sites. You acknowledge and
 *          agree that IBM is not responsible for the availability of such external sites or resources,
 *          and is not responsible or liable for any content, services, products, or other materials on
 *          or available from those sites or resources.
 * @disclaimer
 *          (c) Copyright IBM Corp. 2007 All rights reserved.
 *
 *          The following sample of source code ("Sample") is owned by International Business Machines
 *          Corporation or one of its subsidiaries ("IBM") and is copyrighted and licensed, not sold.
 *
 *          The Sample is not part of any standard IBM product. You may use, copy, modify, and distribute
 *          the Sample in any form without payment to IBM, for the purpose of assisting you in the
 *          development of your applications.
 *
 *          The Sample code is provided to you on an "AS IS" basis, without warranty of any kind.
 *
 *          IBM HEREBY EXPRESSLY DISCLAIMS ALL WARRANTIES, EITHER EXPRESS OR IMPLIED, INCLUDING, BUT NOT
 *          LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE.
 *
 *          Some jurisdictions do not allow for the exclusion or limitation of implied warranties, so the
 *          above limitations or exclusions may not apply to you. IBM shall not be liable for any damages
 *          you suffer as a result of using, copying, modifying or distributing the Sample, even if IBM
 *          has been advised of the possibility of such damages.
 */

/*
 * @name  LOGIN_PAGE
 * @desc  The Web Service Consumer GUI Login Page Name
 *        This is used to redirect the user back to the login page if the user is not logged in
 * @scope global (constant)
 */
var LOGIN_PAGE = 'index.html';

/*
 * @name  WEB_SERVICE_CONSUMER_URL
 * @desc  Relative path/url to the Web Service Consumer
 * @scope global (constant)
 */
var WEB_SERVICE_CONSUMER_URL = './consumer/db2soa.soap.client.php';

/*
 * @name  IMAGES_DIRECTORY
 * @desc  The Web Service Consumer GUI Images Directory Path (Relative)
 * @scope global (constant)
 */
var IMAGES_DIRECTORY = './images/';

/*
 * @name  list_update_id
 * @desc  The unique ID assigned by the JavaScript setInterval method for handling periodic requests
 *        This is used to perform the periodic refresh (Asynchronous Update) calls
 * @scope global
 */
var list_update_id = null;

/*
 * @name  hi_def_set
 * @desc  Stores an array of DOM Objects, each representing a single Health Definition from the
 *      Web Service Producer XML Document
 * @scope global
 */
var hi_def_set = null;

/*
 * @name  hi_alert_set
 * @desc  Stores an array of DOM Objects, each representing a single Health Alert (Indicator) from the
 *      Web Service Producer XML Document
 * @scope global
 */
var hi_alert_set = null;

/*
 * @name  dashboard
 * @desc  Stores the Dashboard Widget Object used on the Web Service Consumer GUI Console Page
 * @scope global
 */
var dashboard = null;

/*
 * @name  table
 * @desc  Stores the SortableTable Widget Object used on the Web Service Consumer GUI Console Page
 * @scope global
 */
var table = null;

/*
 * @name  updater
 * @desc  Stores the AJAXUpdate Widget Object used by the Web Service Consumer GUI to communicate
 *        asynchronously with the Web Service Consumer
 * @scope global
 */
var updater = null;

/*
 * @name  accordion
 * @desc  Stores the Accordion Widget Object used by the Web Service Consumer GUI Console Page
 * @scope global
 */
var accordion = null;

/*
 * @name  healthTitleBar
 * @desc  Stores the TitleBar Widget Object used by the Web Service Consumer GUI Console Page
 *        to display the most severe health alert information
 * @scope global
 */
var healthTitleBar = null;

/*
 * @name  dbTitleBar
 * @desc  Stores the TitleBar Widget Object used by the Web Service Consumer GUI Console Page
 *        to display the database name to which the Web Service Producer DB is connected
 * @scope global
 */
var dbTitleBar = null;

/*
 * @name  detTitleBar
 * @desc  Stores the TitleBar Widget Object used by the Details ContentPane in the Accordion Widget
 *        on the Web Service Consumer GUI Console Page
 * @scope global
 */
var detTitleBar = null;

/*
 * @name  hisTitleBar
 * @desc  Stores the TitleBar Widget Object used by the History ContentPane in the Accordion Widget
 *        on the Web Service Consumer GUI Console Page
 * @scope global
 */
var hisTitleBar = null;

/*
 * @name  diaTitleBar
 * @desc  Stores the TitleBar Widget Object used by the Dialog Widget on the Web Service Consumer GUI
 *      Console Page
 * @scope global
 */
var diaTitleBar = null;

/*
 * @name  detContentBar
 * @desc  Stores the ContentBar Widget Object used by the Details ContentPane in the Accordion Widget
 *        on the Web Service Consumer GUI Console Page
 * @scope global
 */
var detContentBar = null;

/*
 * @name  hisContentBar
 * @desc  Stores the ContentBar Widget Object used by the History ContentPane in the Accordion Widget
 *        on the Web Service Consumer GUI Console Page
 * @scope global
 */
var hisContentBar = null;

/*
 * @name  diaContentBar
 * @desc  Stores the ContentBar Widget Object used by the Dialog Widget on the Web Service Consumer GUI
 *        Console Page
 * @scope global
 */
var diaContentBar = null;

/*
 * @name  hisContentPane
 * @desc  Stores the history ContentPane Widget Object used by the Accordion Widget on the Web Service
 *        Consumer GUI Console Page
 * @scope global
 */
var hisContentPane = null;

/*
 * @name  detContentPane
 * @desc  Stores the details ContentPane Widget Object used by the Accordion Widget on the Web Service
 *        Consumer GUI Console Page
 * @scope global
 */
var detContentPane = null;

/*
 * @name  diaContentPane
 * @desc  Stores the ContentPane Widget Object used by the Dialog Widget on the Web Service Consumer GUI
 *        Console Page
 * @scope global
 */
var diaContentPane = null;

/*
 * @name  dialog
 * @desc  Stores the Dialog Widget Object used by the Web Service Consumer GUI Console Page
 * @scope global
 */
var dialog = null;

/*
 * @name  memProgressBar
 * @desc  Stores the ProgressBar Widget Object used by the Web Service Consumer GUI Console Page
 *        to display DB2 memory consumption information
 * @scope global
 */
var memProgressBar = null;

/*
 * @name  dskProgressBar
 * @desc  Stores the ProgressBar Widget Object used by the Web Service Consumer GUI Console Page
 *        to display DB2 memory consumption information
 * @scope global
 */
var dskProgressBar = null;

/*
 * @name  gblDataSet
 * @desc  Stores the DataSet Widget Object used by the Web Service Consumer GUI Console Page
 *        to build the SortableTable and Dashboard Widgets
 * @scope global
 */
var gblDataSet = null;