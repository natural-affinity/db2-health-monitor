/*
 * @project AJAXUpdate JavaScript Class
 * @author Rizwan Tejpar <rtejpar@ca.ibm.com>
 * @version 1.0
 * @updated 07/22/07
 * @verified 07/22/07 (JSLint)
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
 * @name   AJAXUpdate
 * @desc   Perform Asynchronous Updates using the XMLHTTP Object (AJAX principle)
 * @note   Ensure that the data URL passed in already has query parameters appended if required
 * @note   Ensure that a Function pointer/reference is passed in; the data will be passed to this
 * @note   If the XML Only option is enabled, and the data is invalid an empty string is passed to the Function
 */
function AJAXUpdate()
{
	/* 
	 * @name   m_xhr_object
	 * @desc   Holds the XMLHttpRequest Object
	 * @scope  private
	 */
	var m_xhr_object = null;
	
	/*
	 * @name   m_receive_action
	 * @desc   Reference to function to execute upon receipt of data
	 * @scope  private
	 */
	var m_receive_action = null;
	
	/*
	 * @name   m_ready_state
	 * @desc   Holds a string describing current state of the data request
	 * @scope  private
	 */
	var m_ready_state = null;
	
	/*
	 * @name   m_xml_only
	 * @desc   Determines if data other than Content-Type: text/xml should be accepted
	 * @scope  private
	 */
	 var m_xml_only = false;
	
	/*
	 * @name   purgeEvents
	 * @desc   Frees all memory associated with embedded AJAXUpdate Events
	 * @scope  private
	 * @return void
	 */		
	function purgeEvents()
	{
		m_receive_action = null;
		
		if(m_xhr_object !== null)
		{
			try
			{
				m_xhr_object.onreadystatechange = null;		
			}
			catch(Throwable)
			{
				
			}
		}	
	}
	
	/*
	 * @name   getXHR
	 * @desc   Obtains a new XMLHTTPRequest Object for data transfer
	 * @scope  private
	 * @return XMLHTTPRequest Object if succeeded, null if failed
 	 */
	function getXHR()
	{		
		var xhr_obj = null;
		
		try
		{
			if(window.XMLHttpRequest)
			{
				xhr_obj = new XMLHttpRequest();		
			}
			else if(window.ActiveXObject)
			{
				xhr_obj = new ActiveXObject("Msxml2.XMLHTTP");
			
				if(xhr_obj === null)
				{
					xhr_obj = new ActiveXObject("Microsoft.XMLHTTP");
				}
			}
		}
		catch(Throwable)
		{

		}
		
		return xhr_obj;
	}
		
	/*
	 * @name   receive
	 * @desc   Receives the data from the Asynchronous XMLHttpRequest
	 * @scope  private
	 * @return void
	 */	
	function receive()
	{
		var function_reference = null;
		
		try
		{
			if(m_xhr_object.readyState === 4)
			{
				m_ready_state = 'Update Received';	
				function_reference = m_receive_action;
				
				if(m_xhr_object.getResponseHeader('Content-Type') === 'text/xml')
				{				
					function_reference(m_xhr_object.responseXML);
				}//XML DataType	
				else
				{	
					if(m_xml_only === false)
					{
						function_reference(m_xhr_object.responseText);
					}//Accept
					else
					{
						function_reference('');
					}//Reject
				}//Other DataType
				
				function_reference = null;		
			}		
			else
			{
				m_ready_state = 'Loading...';	
			}
		}
		catch(Throwable)
		{

		}
	}
	
	/*
	 * @name   getReadyState
	 * @desc   Returns the state of the data request
	 * @scope  Privileged
	 * @return m_ready_state (String)
	 */
	this.getReadyState = function()
	{
		return m_ready_state;	
	};
	 
	/*
	 * @name   request
	 * @desc   Issues an asynchronous XMLHttpRequest to the specified URL and returns data as requested
	 * @scope  privileged
	 * @param  data_url        - a URL which returns the desired data; ensure all query parameters are already attached
	 * @param  action_function - a reference to an external function into which the data will be passed when received 
	 * @param  xml_only        - boolean flag that instructs the AJAXUpdater to only pass data of Content-Type: text/xml
	 *                           or pass any datatype to the action_function
	 * @return boolean         - true if the request was issued, false otherwise
	 */
	this.request = function(data_url, action_function, xml_only)
	{
		var state = (m_xhr_object === null) ? null : m_xhr_object.readyState;	
		
		if(state === 0 || state === 4)
		{	
			purgeEvents();
			m_receive_action = action_function;	
			m_xml_only = (xml_only) ? true : false;		
		
			try
			{	 
				m_xhr_object.open('GET', data_url, true);
				m_xhr_object.onreadystatechange = receive;		
				m_xhr_object.send(null);
			}
			catch(Throwable)
			{
				return false;
			}
		}
		else
		{
			return false;	
		}
		
		return true;
	};

	/*
	 * @name   destruct
	 * @desc   Frees Memory associated with the AJAXUpdate Object
	 * @scope  privileged
	 * @return void
	 */		
	this.destruct = function()
	{
		purgeEvents();
	};
	
	m_xhr_object = getXHR();
}