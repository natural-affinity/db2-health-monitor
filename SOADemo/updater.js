/*
 * @project Web Service Consumer GUI JavaScript Updater File
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
    Function Summary:

    1) Update Functions
    o asyncUpdate()
    o changeRefresh()
*/


/*
 * @name   asyncUpdate
 * @desc   Uses the AJAXUpdate Widget to send an Asynchronous request to the Web Service Consumer
 * @scope  global
 * @return void
 */
function asyncUpdate()
{
  //The URL of the Web Service Consumer
  var url = WEB_SERVICE_CONSUMER_URL + '?';

  //Append the Definition Request Flag - reduces load if definitions have already been received
  if (hi_def_set === null)
  {
    url += true;
  }
  else
  {
    url += false;
  }

  //Set the logout request to false
  url += '&' + false;

  //Perform the Update Request
  updater.request(url, parseXML, true);

  //Update the Request Status on the GUI
  updateStatus(true);
}


/*
 * @name   changeRefresh
 * @desc   Switches the periodic refresh interval for Asynchronous updates
 *       based on the user's drop-down selection
 * @scope  global
 * @return void
 */
function changeRefresh()
{
  //Obtain the refresh interval selected in the drop-down on the Web Service Consumer GUI
  var update_time = document.getElementById('cmbListRefresh').value;

  //Clear the old Refresh Interval (if necessary)
  if(list_update_id != null)
  {
    clearInterval(list_update_id);
  }

  //Perform one immediate Asynchronous Update each time the interval is changed
  asyncUpdate();

  //Set a new refresh interval and bind it to the Asynchronous Update Function
  if(update_time != -1)
  {
    list_update_id = setInterval("asyncUpdate()", update_time, "JavaScript");
  }
}