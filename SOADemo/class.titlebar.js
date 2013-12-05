/*
 * @project TitleBar JavaScript Class
 * @author Rizwan Tejpar <rtejpar@ca.ibm.com>
 * @version 1.0
 * @updated 07/22/07
 * @verified 07/22/07 (JSlint)
 * @browser IE 6, IE 7, Firefox 1.5, Firefox 2.0
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
 * @name   TitleBar
 * @desc   Construct an HTML TitleBar (internally stored as DOM object)
 * @param  title_id (string) - HTML 'id' to be used for identifying the subcomponent for processing events
 * @note   Since a DOM object is stored, events are added externally like in Java:
 *         ex - (title_bar_dom).addEventListener(eventType, function reference, flag);
 *            - see Browser documentation for exact method name and parameters
 *        	  - Be sure to add the listener to whatever component you desire: i.e. div, table, tr tags, etc.
 *            - external events are not removed by the TitleBar object; this must be done manually
 * @note   Ensure CSS with the appropriate classes is included in the HTML page used
 */
function TitleBar(title_id)
{
	/*
	 * @name  m_id
	 * @desc  The 'id' given to the top-level component of TitleBar (div tag) when rendered as HTML
	 * @scope private
	 */
	var m_id = title_id;
	
	/*
	 * @name  m_container_class
	 * @desc  The name of the CSS class that will be given to the TitleBar container (div tag)
	 * @scope private
	 */
	var m_container_class = '';	
	
	/*
	 * @name  m_table_class
	 * @desc  The name of the CSS class that will be given to the TitleBar (table tag)
	 * @scope private
	 */	
	var m_table_class = '';			
	
	/*
	 * @name  m_row_class
	 * @desc  The name of the CSS class that will be given to the TitleBar (tr tag)
	 * @scope private
	 */
	var m_row_class = '';
	
	/*
	 * @name  m_col_class
	 * @desc  An Array of names for the CSS classes to apply to each column of the TitleBar
	 * @scope private
	 */
	var m_col_class = [];
	
	/*
	 * @name  m_html_content
	 * @desc  An Array of the HTML content to split across the TitleBar as columns
	 * @scope private
	 */
	var m_html_content = [];
	
	/* 
	 * @name  m_dom
	 * @desc  The TitleBar as an HTML DOM structure
	 * @scope private
	 */
	var m_dom = null;
	
	/*
	 * @name   purgeEvents
	 * @desc   Frees all memory associated with embedded TitleBar Events
	 * @scope  private
	 * @return void
	 */
	function purgeEvents()
	{
		
	}
	
	/*
	 * @name   getId
	 * @desc   Returns the 'id' given to the TitleBar container (div tag)
	 * @scope  privileged
	 * @return m_id (String)
	 */
	this.getId = function()
	{
		return m_id;
	};
	
	/*
	 * @name   getDOM
	 * @desc   Return the DOM representation of the TitleBar
	 * @scope  privileged
	 * @return m_dom (DOMElement)
	 */
	this.getDOM = function()
	{
		return m_dom;	
	};
	
	/*
	 * @name   setContainerClass
	 * @desc   Sets the CSS Class for the TitleBar container (div tag)
	 * @scope  privileged
	 * @param  css_class (string) - CSS Class name
	 * @return void
	 */
	this.setContainerClass = function(css_class)
	{
		m_container_class = css_class;
	};
	
	/*
	 * @name   setTableClass
	 * @desc   Sets the CSS Class for the TitleBar (table tag)
	 * @scope  privileged
	 * @param  css_class (string) - CSS Class name
	 * @return void
	 */
	this.setTableClass = function(css_class)
	{
		m_table_class = css_class;
	};
	
	/*
	 * @name   setRowClass
	 * @desc   Sets the CSS Class for the TitleBar (tr tag)
	 * @scope  privileged
	 * @param  css_class (string) - CSS Class name
	 * @return void
	 */
	this.setRowClass = function(css_class)
	{
		m_row_class = css_class;
	};
	
	/*
	 * @name   setColClass
	 * @desc   Sets the CSS Class(es) for the TitleBar column content (td tags)
	 * @scope  privileged
	 * @param  css_class (string array) - CSS Class names for columns (in order)
	 * @return void
	 */
	this.setColClass = function(css_class)
	{
		try
		{
			m_col_class = [];
	
			for(var i = 0; i < css_class.length; i++)
			{
				m_col_class[i] = css_class[i];		
			}	
		}
		catch(Throwable)
		{
			
		}			
	};
	
	/*
	 * @name   setColClass
	 * @desc   Sets the HTML/text content to make up the TitleBar columns (td tags)
	 * @scope  privileged
	 * @param  content (Array) - HTML content for TitleBar columns (in order)
	 * @return void
	 */
	this.setContent = function(content)
	{
		try
		{
			m_html_content = [];
			
			for(var i = 0; i < content.length; i++)
			{
				m_html_content[i] = content[i];		
			}	
		}
		catch(Throwable)
		{
			
		}
	};
	
	/*
	 * @name   construct
	 * @desc   Constructs the TitleBar as DOM (according to HTML structure)
	 * @scope  privileged
	 * @return DOMElement
	 */
	this.construct = function()
	{
		purgeEvents();
		var div = document.createElement('div');
		var table = document.createElement('table');	
		var thead = document.createElement('thead');
		var tbody = document.createElement('tbody');	
		var row = document.createElement('tr');
		
		div.appendChild(table);
		table.appendChild(thead);
		table.appendChild(tbody);					
			
		div.id = m_id;
		div.className = m_container_class;
		
		table.className = m_table_class;
		table.cellSpacing = 0;
		table.cellPadding = 0;
		row.className = m_row_class;

		for(var i = 0; i < m_html_content.length; i++)
		{
			var col = document.createElement('td');
			col.className = (i < m_col_class.length) ? m_col_class[i] : '';
			col.innerHTML = m_html_content[i];
			row.appendChild(col);
		}
		tbody.appendChild(row);

		m_dom = div;
		return m_dom;
	};
	
	/*
	 * @name   destruct
	 * @desc   Frees Memory associated with the TitleBar Object
	 * @scope  privileged
	 * @return void
	 */
	this.destruct = function()
	{
		purgeEvents();
		m_dom = null;
	};
}