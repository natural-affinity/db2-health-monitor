/*
 * @project Web Service Consumer GUI JavaScript Parser File
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

	1) Initialization Functions
		o initComponents()	
		
	2) Update Functions
		o parseXML(xml)
		o updateStatus(is_loading)
		o updateDbBar(db)
		o updateHealthBar(state)
		o updateDashboard(root_set)
		o updateTable()
		o updateAccordion()
		o updateDialog(position)	
			
	3) Helper Functions
		o buildSet(tag_nm, root_set)
		o mapHID(hi_id)
		o getDefSetMatch(position)
		o getIcon(alert_nm, obj_nm)
		o getTableExtensionHeight()
		
	4) Destruction Functions
		o destroyComponents()
*/ 

 
/*
 * @name   initComponents
 * @desc   Initializes all Widget Objects and sets all CSS Classes for each widget for display purposes
 *         All preparation work (i.e. that only needs to be done once) for each widget is performed here
 *         The initial Asynchronous Update is performed at the end of this function
 * @scope  global
 * @return void
 */
function initComponents()
{	
	//Instantiate the Dashboard Widget
	dashboard = new Dashboard('mydash');
	
	//Set CSS Classes for display aesthetics
	dashboard.setTableClass('secondary');
	dashboard.setRowClass('ibm3');
	dashboard.setRowAltClass('ibm2');
	dashboard.setLabelClass('space2');
	dashboard.setValueClass('space10');
	
	//Set Required Dashboard Size Parameters
	dashboard.setTableWidth(800);
	dashboard.setSpaceWidth(4);
	
	//Instantiate the Sortable Table Widget
	table = new SortableTable('mycontainer','mytable');	
	
	//Set the CSS Classes for display aesthetics
	table.setContainerClass('scrolling');		
	
	table.setRowHeaderClass('head');
	table.setColHeaderClass('fixed');
	table.setRowClass('light');
	table.setRowAltClass('dark');
	table.setRowHighlightClass('highlighted');
	table.setRowSelectedClass('selected');
	table.setColClass(['col1','col2','col3','col4','col5','col6']);	
	
	//Apply the BodyClass only on non-IE browsers to fix the table size
	if(navigator.appName.indexOf('Microsoft') === -1)
	{
		table.setBodyClass('scroll');
	}

	//Add a click event to SortableTable rows for performing Accordion Updates 
	table.addRowListener('click', updateAccordion, false);
	
	//Instantiate the AJAXUpdate Widget
	updater = new AJAXUpdate();
	
	//Instantiate the TitleBar Widget for the details ContentPane
	detTitleBar = new TitleBar('detailTitle');
	
	//Set the CSS Classes for display aesthetics
	detTitleBar.setContainerClass('label4');
	detTitleBar.setRowClass('label4');
	detTitleBar.setColClass(['','lfixed']);
	
	//Set the initial content for the details TitleBar
	detTitleBar.setContent(['<img src="' + IMAGES_DIRECTORY + 'unknownDBIcon.bmp" alt="" />',' Details - ']);
	
	//Instantiate the TitleBar Widget for the history ContentPane 
	hisTitleBar = new TitleBar('historyTitle');
	
	//Set the CSS Classes for display aesthetics
	hisTitleBar.setContainerClass('label4');
	hisTitleBar.setRowClass('label4');
	hisTitleBar.setColClass(['','lfixed2']);
	
	//Set the initial content for the history TitleBar
	hisTitleBar.setContent(['<img src="' + IMAGES_DIRECTORY + 'historyIcon.bmp" alt="" />',' History - ']);
	
	//Instantiate the ContentBar Widget for the details ContentPane
	detContentBar = new ContentBar('detailContent');
	
	//Set the CSS Classes for display aesthetics
	detContentBar.setContentClass('accBody');
	
	//Instantiate the ContentBar Widget for the history ContentPane
	hisContentBar = new ContentBar('historyContent');
	
	//Set the CSS Classes for display aesthetics
	hisContentBar.setContentClass('accBody');
	
	//Instantiate the details ContentPane Widget
	detContentPane = new ContentPane('detailPane');
	
	//Bind the details TitleBar and ContentBar to the ContentPane
	detContentPane.setTitleBar(detTitleBar);
	detContentPane.setContentBar(detContentBar);

	//Instantiate the history ContentPane Widget
	hisContentPane = new ContentPane('historyPane');
	
	//Bind the history TitleBar and ContentBar to the ContentPane
	hisContentPane.setTitleBar(hisTitleBar);
	hisContentPane.setContentBar(hisContentBar);
	
	//Instantiate the Accordion Widget
	accordion = new Accordion('accordion');
	
	//Set the CSS classes for display aesthetics
	accordion.setAccordionClass('acc2');
	
	//Bind the details and history ContentPanes to the Accordion
	accordion.setContentPane([detContentPane, hisContentPane]);
	
	//Instantiate the health TitleBar Widget (shows most severe health alert)
	healthTitleBar = new TitleBar('healthTitle');
	
	//Set the CSS classes for display aesthetics
	healthTitleBar.setContainerClass('label4');
	healthTitleBar.setRowClass('label4');
	
	//Set the initial content for the TitleBar (i.e. icon and initial severity)
	healthTitleBar.setContent(['<img src="' + IMAGES_DIRECTORY + 'allAlert.bmp" alt="Alert Type Icons" />','Health Report - UNKNOWN']);
	
	//Instantiate the database TitleBar Widget (shows database from which alerts are gathered)
	dbTitleBar = new TitleBar('dbTitle');
	
	//Set the CSS classes for display aesthetics
	dbTitleBar.setContainerClass('label4');
	dbTitleBar.setRowClass('label4');
	
	//Set the initial content for the TitleBar (i.e. icon and inital connection)
	dbTitleBar.setContent(['<img src="' + IMAGES_DIRECTORY + 'databaseIcon.bmp" alt="Database Icon" />', 'Database - UNKNOWN']);
	
	//Instantiate the TitleBar for the Dialog Widget
	diaTitleBar = new TitleBar('dtitle');
	
	//Set the CSS classes for display aesthetics
	diaTitleBar.setContainerClass('label4');
	diaTitleBar.setRowClass('label4');
	
	//Set the content for the dialog TitleBar
	diaTitleBar.setContent(['DEFINITION DETAILS']);
	
	//Instantiate the ContentBar for the Dialog Widget
	diaContentBar = new ContentBar('dcontent');
	
	//Instantiate the ContentPane for the Dialog Widget
	diaContentPane = new ContentPane('dpane');
	
	//Bind the appropriate TitleBar and ContentBar to the ContentPane
	diaContentPane.setTitleBar(diaTitleBar);
	diaContentPane.setContentBar(diaContentBar);
	
	//Instantiate the Dialog Widget
	dialog = new Dialog('defdialog');
	
	//Bind the appropriate ContentPane to the Dialog
	dialog.setContentPane(diaContentPane);
	
	//Set the Dialog to destroy on close
	dialog.setHideOnClose(false);
	
	//Instantiate the ProgressBar Widget (shows memory usage)
	memProgressBar = new ProgressBar('memPercent');
	
	//Instantiate the ProgressBar Widget (shows disk usage)
	dskProgressBar = new ProgressBar('dskPercent');
	
	//Instantiate the DataSet Widget
	gblDataSet = new DataSet();
	
	//Attach the database TitleBar to its respective 'hook' on the console page
	document.getElementById('dbbar').appendChild(dbTitleBar.construct());
	
	//Attach the health TitleBar to its respective 'hook' on the console page
	document.getElementById('healthbar').appendChild(healthTitleBar.construct());
	
	//Attach the Accordion to its respective 'hook' on the console page
	document.getElementById('accordionHook').appendChild(accordion.construct());
	
	//Perform the initial Asynchronous update request
	changeRefresh();
}


/*
 * @name   parseXML  
 * @desc   Receives the XML document from the Web Service Consumer
 *         Parses the XML document and extracts the Health Alerts, and Definitions as DOM Nodes
 *         Calls the appropriate functions to update the Widgets on the Console Page
 * @scope  global
 * @param  xml - the Health Report as an XML DOM Object
 * @return void
 */
function parseXML(xml)
{		
	//Stores the Parsed XML Document
	var doc = null;	
	
	//Stores the Root Node of the XML Document	
	var root = null;
	
	//Stores the ErrorSet Node of the XML Document
	var error = null;		
	
	//Stores a formatted string representation of the ErrorSet
	var error_str = '';	
	
	//Set the XML document to the received DOM Object
	doc = xml;
 		
 	//Obtain the XML document root node (DOM Object)
  	root = doc.documentElement;
  	
  	//Ensure the document is the health report, otherwise redirect back to the login page
 	try
 	{
 		if(root.tagName !== 'DB2Health_Report')
 		{
 			alert('Invalid Health Report Received; Please Login Again');
 			document.location = LOGIN_PAGE;
		}
	}
	catch(Throwable)
	{
		alert('Invalid Health Report Received; Please Login Again');
		document.location = LOGIN_PAGE;
	}//IE Fix - throws an exception on failure
 			
	//Extract ErrorSet Information and create a string representation
 	error = buildSet('ErrorSet', root.childNodes);
 	for(var i = 0; i < error.length; i++)
	{
		if(error[0].textContent === '0' || error[0].text === '0')
		{
			break;
		}
		
		error_str += (error[i].tagName) + ': ';
		error_str += (error[i].textContent || error[i].text)  + '\r\n';
	}
	
	//Display the error message (if any), and update status
	if(error_str !== '')
	{
		alert(error_str);
		updateStatus(false);
	}
 		
	//Extract and Store the Health Definitions as DOM Nodes (if any)
	if(hi_def_set === null)
	{
		hi_def_set = buildSet('HIDefinitionSet', root.childNodes);
	}
		
	//Extract and Store the Health Indicators/Alerts as DOM Nodes
	hi_alert_set = buildSet('AlertSet', root.childNodes); 
	
	//Update the database TitleBar, health TitleBar, SortableTable, and Dashboard Widgets
	updateDbBar(root.getAttribute('database').toUpperCase());
	
	updateHealthBar(root.getAttribute('highestAlertState').toUpperCase());	
	updateTable();
	updateDashboard(root.childNodes);
	
	//Update the Asynchronous Request Status on the Web Service Consumer GUI
	updateStatus(false);
}


/*
 * @name   buildSet
 * @desc   Extracts an immediate set of XML DOM child nodes from a root node and
 *         stores the nodes in an array
 * @scope  global
 * @param  tag_nm   - the name of the DOM node from which to extract child nodes
 * @param  root_set - the set of XML DOM nodes from which to search for tag_nm
 * @return Array (XML DOM Nodes)
 */
function buildSet(tag_nm, root_set)
{
	var array = [];
	
	for(var i = 0; i < root_set.length; i++)
	{
		var child = root_set[i];
		
		if(child.tagName === tag_nm)
		{
			var children = child.childNodes;
			
			for(var j = 0; j < children.length; j++)
			{
				array[array.length] = children[j];
			}//Add each new node to the end of the array
		}//If the specified element is found			
	}
	
	return array;
}

/*
 * @name   updateStatus
 * @desc   Updates the Status of the Asynchronous Request on the Web Service Consumer GUI
 * @scope  global
 * @param  is_loading (boolean) - a flag indicating how to display the status information
 * @return void
 */
function updateStatus(is_loading)
{
	var hook = document.getElementById('status');	
	hook.innerHTML = updater.getReadyState();
	
	//Switch the Display Style according to Status
	if(is_loading)
	{
		hook.style.backgroundColor = 'red';
		hook.style.color = 'white';
	}
	else
	{	
		hook.style.backgroundColor = 'white';
		hook.style.color = 'black';
	}
}

/*
 * @name   updateDbBar
 * @desc   Updates the database TitleBar Widget on the Console Page
 * @scope  global
 * @param  db (String) - the name of the database from which health alerts are received
 * @return void
 */
function updateDbBar(db)
{
	var old = dbTitleBar.getDOM();
	dbTitleBar.setContent(['<img src="' + IMAGES_DIRECTORY + 'databaseIcon.bmp" alt="Database Icon" />', 'Database - ' + db]);
	document.getElementById('dbbar').replaceChild(dbTitleBar.construct(), old);
}


/*
 * @name   updateHealthBar
 * @desc   Updates the health TitleBar Widget on the Console Page
 * @scope  global
 * @param  state (String) - the most severe health alert listed in the table
 * @return void
 */
function updateHealthBar(state)
{
	var old = healthTitleBar.getDOM();
	healthTitleBar.setContent(['<img src="' + IMAGES_DIRECTORY + 'allAlert.bmp" alt="Alert Type Icons" />','Health Report - ' + state]);	
	document.getElementById('healthbar').replaceChild(healthTitleBar.construct(), old);
}


/*
 * @name   updateDashboard
 * @desc   Updates the Dashboard Widget
 * @scope  global
 * @param  root_set - the set of XML DOM nodes from which to search for Dashboard information i.e. InfoSet
 * @return void
 */
function updateDashboard(root_set)
{
	//Determine the Browser in use
	var browser = navigator.appName.indexOf('Microsoft');
	
	//Obtain the Dashboard 'hook'
	var hook = document.getElementById('dashHook');
	
	//Initialize Dash Information XML DOM Node
	var info_set = null;
	
	//Obtain the InfoSet Node from which Dashboard information can be extracted
	for(var i = 0; i < root_set.length; i++)
	{
		info_set = root_set[i];
		
		if(info_set.tagName === 'InfoSet')
		{		
			break;
		}
	}
	
	//Updates the Memory Usage Progress Bar
	var mem_str = info_set.getAttribute('memory_usage') + ' MB / ' + info_set.getAttribute('total_memory') + ' MB';
	var mem_val = Math.round((info_set.getAttribute('memory_usage')/info_set.getAttribute('total_memory'))*100);
	var mem_bar = memProgressBar.construct(mem_val);
	
	//Updates the Disk Usage Progress Bar
	var dsk_str = info_set.getAttribute('database_size') + ' MB / ' + info_set.getAttribute('database_capacity') + ' MB';
	var dsk_val = Math.round((info_set.getAttribute('database_size')/info_set.getAttribute('database_capacity'))*100);
	var dsk_bar = dskProgressBar.construct(dsk_val);

	//Assemble a DataSet representing the Dashboard information
	gblDataSet.addDataRow(['System',info_set.getAttribute('host_name'),'Number of Reads',info_set.getAttribute('rows_read')]);
	gblDataSet.addDataRow(['Type','Local','Number of Writes',info_set.getAttribute('rows_written')]);
	gblDataSet.addDataRow(['Status',info_set.getAttribute('database_status'),'Disk Usage',dsk_str + '<br />' + dsk_bar.innerHTML]);
	gblDataSet.addDataRow(['Last Backup',info_set.getAttribute('last_backup'),'Memory Usage',mem_str + '<br />' + mem_bar.innerHTML]);

	//Clear the Dashboard 'hook' and attach an updated version
	hook.innerHTML = '';						
	hook.appendChild(dashboard.construct(gblDataSet));
	
	//Reset the DataSet Object for use with other Widgets
	gblDataSet.removeAll();
	
	//Update the timestamp information on the console page
	hook = document.getElementById('snapshot_timestamp');
	hook.innerHTML = info_set.getAttribute('snapshot_timestamp');
}	


/*
 * @name   updateTable
 * @desc   Updates the SortableTable Widget on the console page
 * @scope  global
 * @return void
 */
function updateTable()
{	
	//Initialize temporary variables
	var col1, col2, col3, col4, col5, col6, temp;
	
	//Obtain access to the table 'hook'
	var hook = document.getElementById('tableHook');
	
	//Append Column Headers to the DataSet
	gblDataSet.addDataRow(['Type', 'Object State', 'Health Indicator', 'Value', 'Warning Threshold', 'Alarm Threshold']);
	
	for(var i = 0; i < hi_alert_set.length; i++)
	{
		//Obtain a single Alert DOM Node
		var current = hi_alert_set[i];
		
		//Obtain all child nodes
		var children = current.childNodes;
		
		//Obtain the definition node associated with the alert
		var def = hi_def_set[getDefSetMatch(i)].childNodes[0];
		
		//Obtain Desired information for each column
		for(var j = 0; j < children.length; j++)
		{
			var child = children[j];
			
			if(child.tagName === 'DB2_Object')
			{
				col1 = (child.getAttribute('type')).toUpperCase();
				break;	
			}			
		}
		
		col2 = current.getAttribute('hiAlertState');
		col3 = mapHID(current.getAttribute('hiIdentifier'));
		col4 = current.getAttribute('hiValue');
		col5 = def.getAttribute('warningThreshold');
		col6 = def.getAttribute('alarmThreshold');
		
		//Add the columns to the DataSet as a single row, in the specified order
		gblDataSet.addDataRow([col1, col2, col3, col4, col5, col6]);
	}
	
	//Map the Alert DOM Nodes Array to the SortableTable rows
	table.setMap(hi_alert_set);
	
	//Update the Sortable Table Widget
	temp = table.construct(gblDataSet);
	hook.innerHTML = '';
	hook.appendChild(temp);
	
	//Reset the DataSet Object for use with other Widgets
	gblDataSet.removeAll();
	
	//Update the Height of the Table based on screen resolution
	try
	{
		//Extend the SortableTable container height
		var temp = table.getDOM();
		var ext = getTableExtensionHeight();
		temp.style.height = temp.clientHeight + ext + 'px';	
		
		//The Tbody height must also be set for Mozilla-based Browsers
		if(navigator.appName.indexOf('Microsoft') === -1)
		{
			var temp2 = temp.firstChild.lastChild;
			temp2.style.height = temp2.clientHeight + ext + 'px';
		}
	}
	catch(Throwable)
	{
	}
}


/*
 * @name   updateAccordion
 * @desc   Updates the Accordion Widget
 * @scope  global
 * @return void
 */
function updateAccordion()
{
	//Determine the row in the SortableTable for which to display information
	var position = table.getLastRow().rowIndex - 1;
	
	if(position !== -1)
	{
		//Obtain access to the Accordion 'hook'
		var hook = document.getElementById('accordionHook');	
		
		//Obtain the corresponding DOM Alert
		var alrt = hi_alert_set[position];							
		
		//Obtain alert child nodes	  
		var alrt_chldrn = hi_alert_set[position].childNodes;				  
		
		//Obtain the history root node
		var his_node = alrt_chldrn[3];					
		
		//Obtain history information nodes					  
		var his_chldrn = his_node.childNodes;
		
		//Obtain Indicator state information
		var alert_nm = alrt.getAttribute('hiAlertState');		
		
		//Obtain the object name	  
		var obj_nm = (alrt_chldrn[0].getAttribute('type')).toUpperCase();
		
		//Obtain the HI ID
		var hi_name = mapHID(alrt.getAttribute('hiIdentifier')).toUpperCase();

		//Build HTML History ContentBar Information
		var his_html = '<table id="row_hist" style="text-align:center" cellspacing="0px" cellpadding="0px" border="0px">';
		his_html += '<tr>';
		his_html += '<td class="detailLabel" style="text-align:center;padding-right:0px;width:250px">Timestamp</td>';
		his_html += '<td class="detailLabel" style="text-align:center;padding-right:0px">State</td>';
		his_html += '<td class="detailLabel" style="text-align:center;padding-right:0px;width:200px">Formula</td>';
		his_html += '<td class="detailLabel" style="text-align:center;padding-right:0px">Value</td>';
		his_html += '</tr>';
		
		//Process each history information node
		for(var i = 0; i < his_chldrn.length; i++)
		{
			var child = his_chldrn[i];
			var timestamp = child.getAttribute('hiTimestamp');
			var state = child.getAttribute('hiAlertState');
			var formula = child.getAttribute('hiFormulaValue');
			var val = child.getAttribute('hiValue');
			
			his_html += '<tr>';
			his_html += '<td class="detail" style="text-align:center">' + timestamp + '</td>';
			his_html += '<td class="detail" style="text-align:center">' + state + '</td>';
			his_html += '<td class="detail" style="text-align:center">' + formula + '</td>';
			his_html += '<td class="detail" style="text-align:center">' + val + '</td>';
			his_html += '</tr>';
		}

		his_html += '</table>';

		//Build HTML Details ContentBar Information
		var det_html = '<table cellspacing="0px" cellpadding="0px" border="0px">';	
		
		//Object Name
		det_html += '<tr>';
		det_html += '<td class="detailLabel">Object Name: </td>';
		det_html += '<td class="detail"> ' + alrt_chldrn[0].getAttribute('name') + '</td>';
		det_html += '</tr>';	
		
		//Timestamp
		det_html += '<tr>';
		det_html += '<td class="detailLabel">Timestamp: </td>';
		det_html += '<td class="detail"> ' + alrt.getAttribute('hiTimestamp') + '</td>';
		det_html += '</tr>';	
		
		//Formula
		det_html += '<tr>';
		det_html += '<td class="detailLabel">Formula Value: </td>';
		det_html += '<td class="detail">' + (alrt_chldrn[2].textContent || alrt_chldrn[2].text) + '</td>';
		det_html += '</tr>';
		
		//Additional Info
		det_html += '<tr>';
		det_html += '<td valign="top" class="detailLabel">Additional Info: </td>';
		det_html += '<td class="detail">' + (alrt_chldrn[1].textContent || alrt_chldrn[1].text) + '</td>';
		det_html += '</tr>';
		
		//Create an embedded button to launch the Dialog Widget
		det_html += '<tr>';
		det_html += '<td valign="top" class="detailLabel">HI Definition Details: </td>';
		det_html += '<td class="detail"><input style="width:30px;height:22px" type="button" value="..." onclick="updateDialog(' + getDefSetMatch(position) + ')"/></td>';
		det_html += '</tr>';		
		det_html += '</table>';
			
		//Set the new history and details content and title information		
		hisTitleBar.setContent(['<img src="' + IMAGES_DIRECTORY + 'historyIcon.bmp" alt="" />', ' History - ' + hi_name]);		
		detTitleBar.setContent([getIcon(alert_nm, obj_nm), ' Details - ' + hi_name]);			
		hisContentBar.setContent(his_html);	
		detContentBar.setContent(det_html);
		
		//Update the Accordion Widget
		hook.innerHTML = '';
		hook.appendChild(accordion.construct());						
	}
}

/*
 * @name   updateDialog
 * @desc   Updates and Displays the Dialog Widget
 * @scope  global
 * @return void
 */
function updateDialog(position)
{
	//Obtain the Dialog Widget 'hook'
	var hook = document.getElementById('diaHook');
	
	//Obtain the definition node corresponding to health indicator/alert
	var definition = hi_def_set[position];
	
	//Build the content for the Dialog ContentBar
	var html = '<table style="width:600px" cellspacing="0px" cellpadding="0px">';
		
	//HI_SHORT
	html += '<tr>';
	html += '<td class="detailLabel">Name: </td>';
	html += '<td class="detail">' + definition.getAttribute('hiShortDesc') + ' (' + definition.getAttribute('hiName') + ')</td>';
	html += '</tr>';
		
	//HI_ID
	html += '<tr>';
	html += '<td class="detailLabel">ID: </td>';
	html += '<td class="detail">' + definition.getAttribute('hiIdentifier') + '</td>';
	html += '</tr>';	
		
	//HI_LONG
	html += '<tr>';
	html += '<td valign="top" class="detailLabel">Description: </td>';
	html += '<td class="detail">' + definition.getAttribute('hiLongDesc') + '</td>';
	html += '</tr>';
		
	//HI_TYPE
	html += '<tr>';
	html += '<td class="detailLabel">Type: </td>';
	html += '<td class="detail">' + definition.getAttribute('hiType') + '</td>';
	html += '</tr>';
		
	//HI_FORMULA
	html += '<tr>';
	html += '<td class="detailLabel">Formula: </td>';
	html += '<td class="detail">' + definition.getAttribute('hiFormula') + '</td>';
	html += '</tr>';
		
	//HI_UNIT
	html += '<tr>';
	html += '<td class="detailLabel">Unit: </td>';
	html += '<td class="detail">' + definition.getAttribute('hiUnit') + '</td>';
	html += '</tr>';		
	
	//Set the new content for the Dialog Widget; build it, and display it
	diaContentBar.setContent(html);
	hook.innerHTML = '';
	hook.appendChild(dialog.construct());
	dialog.showDialog();
}


/*
 * @name   mapHID
 * @desc   Maps the Health Indicator/Alert to the corresponding definition description
 * @scope  global
 * @param  hi_id - an integer value linking the health indicator to a particular health definition
 * @return String
 */
function mapHID(hi_id)
{
	try
	{
		//Return the matching short description if available
		for(var i = 0; i < hi_def_set.length; i++)
		{
			if(hi_def_set[i].getAttribute('hiIdentifier') === hi_id)
			{
				return hi_def_set[i].getAttribute('hiShortDesc');
			}	
		}
	}
	catch(Throwable)
	{

	}
	
	return 'undefined';
}


/*
 * @name   getDefSetMatch
 * @desc   Finds the matching definition for a particular health indicator/alert based on row position
 * @scope  global
 * @param  position - an integer indicating which row in the SortableTable to obtain information for
 */
function getDefSetMatch(position)
{
	var alert_id = hi_alert_set[position].getAttribute('hiIdentifier');
	for(var i = 0; i < hi_def_set.length; i++)
	{
		if(alert_id === hi_def_set[i].getAttribute('hiIdentifier'))
		{
			return i;
		}
	}	
	return -1;	
}

/*
 * @name   getIcon
 * @desc   Obtains the HTML necessary to display the appropriate Health Indicator/Alert Icon
 * @scope  global
 * @param  alert_nm - a string representing the name of the Health Indicator/Alert
 * @param  obj_nm   - a string representing the type of object to which the health indicator/alert applies
 */
function getIcon(alert_nm, obj_nm)
{
	//All of these images end with this string and extension
	var extension = 'Icon2.bmp';
	
	//An Array holding possible alert states
	var states = ['Normal','Attention','Alarm','Warning'];		
	
	//An Array storing possible object types
	var types = ['DATABASE', 'INSTANCE', 'CONTAINER', 'TABLESPACE'];
	
	//An Array holding abbreviated object types
	var abbr = ['DBM','DB','TSC','TS'];
		
	//Concatenate HTML, the state, and the type/abbr to obtain the correct HTML image code
	for(var i = 0; i < states.length; i++)
	{
		for(var j = 0; j < types.length; j++)
		{
			if(alert_nm.match(states[i]) && (obj_nm.match(types[j]) || obj_nm === abbr[j]))
			{
				return ('<img src="' + IMAGES_DIRECTORY + states[i].toLowerCase() + abbr[j] + extension + '" alt="" />');
			}
		}	
	}
	
	//Show the Unknown '?' Icon if the correct image cannot be found
	return '<img src="' + IMAGES_DIRECTORY + 'unknownIcon.bmp" alt="" />';
}

/*
 * @name   getTableExtensionHeight
 * @desc   Returns the amount the SortableTable height can be extended by based on Screen Resolution
 * @scope  global
 * @return integer
 */
function getTableExtensionHeight()
{
	//Store the Number of Pixels by which the table should be extended
	var extension_height = 0;
	
	//Store the Height of the Banner at the top of the page (fixed)
	var banner_height = 65;
	
	//Store the Height of the Refresh/Update Section of the page (fixed)
	var refresh_height = 23;
	
	//Store the Height of the Dashboard Section of the page (fixed)
	var dash_height = 76;
	
	//Marks the amount of space needed to prevent scrollbars from being added
	var buffer_height = 40;
	
	//Marks the height of the table (content)
	var table_height = 0;
	
	try
	{	
		//Store the SortableTable DOM for calculations (temporarily)
		var temp = table.getDOM();
		
		//Obtain the amount of space available to the console GUI
		extension_height = window.innerHeight || ((document.body.clientHeight > document.documentElement.clientHeight) ? document.body.clientHeight : document.documentElement.clientHeight);	
		
		//Ensure only the numerical value is obtained
		extension_height = (extension_height + '').match(/[0-9]+/);	
		extension_height -= table.getDOM().clientHeight;	  	      
		
		//Calculate the Extra Space Available
		extension_height -= accordion.getDOM().clientHeight;       
		extension_height -= healthTitleBar.getDOM().clientHeight;  
		extension_height -= dbTitleBar.getDOM().clientHeight;	  
		extension_height -= refresh_height + dash_height + banner_height + buffer_height;
		
		//Calculate the Height of the Table Content
		table_height = (temp.firstChild.firstChild.firstChild.clientHeight)*(hi_alert_set.length + 1);
		
		//Compare the Height of the SortableTable Content Versus Actual Height of the SortableTable
		table_height = (table_height <= temp.clientHeight) ? 0 : (table_height - temp.clientHeight);
		
		//Take the Smallest Possible Extension Height
		if(table_height < extension_height)
		{
			extension_height = table_height;	
		}
		
		//Ensure the minimum extension height is 0 pixels
		if(extension_height < 0)
		{
			return 	0;
		}
	}
	catch(Throwable)
	{
		return 0;
	}
	
	return extension_height;
}

/*
 * @name   destroyComponents
 * @desc   Free Memory associated with all widgets and clean all HTML Widget 'hooks'
 * @scope  global
 * @return void
 */
function destroyComponents()
{
	//Call all Widget Destructors to free memory associated with embedded events
	updater.destruct();
	table.destruct();
	accordion.destruct();
	healthTitleBar.destruct();
	dbTitleBar.destruct();
	dialog.destruct();	
	memProgressBar.destruct();
	dskProgressBar.destruct();
	dashboard.destruct();
	
	//Remove all Widgets from their respective hooks
	document.getElementById('tableHook').innerHTML = '';
	document.getElementById('accordionHook').innerHTML = '';
	document.getElementById('healthbar').innerHTML = '';
	document.getElementById('dbbar').innerHTML = '';
	document.getElementById('diaHook').innerHTML = '';
	document.getElementById('dashHook').innerHTML = '';
	
	//Call the Web Service Consumer to logout the user
	window.location = WEB_SERVICE_CONSUMER_URL + '?' + false + '&' + true;
			
	if(navigator.appName.indexOf('Microsoft') !== -1)
	{
		window.location = WEB_SERVICE_CONSUMER_URL + '?' + false + '&' + true;
	}//IE6,7 Fix - Requires Second Immediate call to perform logout
}