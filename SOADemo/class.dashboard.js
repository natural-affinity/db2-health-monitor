/*
 * @project Dashboard JavaScript Class
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
 * @name   Dashboard
 * @desc   Construct an HTML accordion (internally stored as DOM object)
 * @param  dash_id (string) - HTML 'id' to be used for identifying the component
 * @note   This will not clean events passed through the DataSet disguised as content
 */  
function Dashboard(dash_id)
{	
	/*
	 * @name  m_id
	 * @desc  The 'id' given to the top-level component of Dashboard (div tag) when rendered as HTML
	 * @scope private
	 */		
	var m_id = dash_id;
	
	/*
	 * @name  m_container_class
	 * @desc  The name of the CSS that will be given to the Dashboard (div tag)
	 * @scope private
	 */		
	var m_container_class = '';
	
	/*
	 * @name  m_table_class
	 * @desc  The name of the CSS that will be given to the Dashboard (table tag)
	 * @scope private
	 */		
	var m_table_class = '';
	
	/*
	 * @name  m_row_class
	 * @desc  The name of the CSS that will be given to the Dashboard rows (tr tag)
	 * @scope private
	 */			
	var m_row_class = '';
	
	/*
	 * @name  m_row_alt_class
	 * @desc  The name of the CSS that will be given to the alternate Dashboard rows (tr tag)
	 * @scope private
	 */		
	var m_row_alt_class = '';

	/*
	 * @name  m_label_class
	 * @desc  The name of the CSS that will be given to the Dashboard labels (td tag)
	 * @scope private
	 */			
	var m_label_class = '';
	
	/*
	 * @name  m_value_class
	 * @desc  The name of the CSS that will be given to the Dashboard values (td tag)
	 * @scope private
	 */				
	var m_value_class = '';

	/*
	 * @name  m_table_width
	 * @desc  The overall width of the dashboard
	 * @scope private
	 */					
	var m_table_width = '';
	
	/*
	 * @name  m_space_width
	 * @desc  The width of the spacing between the two dash halves
	 * @scope private
	 */				
	var m_space_width = '';
	
	/* 
	 * @name  m_dom
	 * @desc  The Dashboard as an HTML DOM structure
	 * @scope private
	 */				
	var m_dom = null;
	
	/*
	 * @name   purgeEvents
	 * @desc   Frees all memory associated with embedded Dashboard Events
	 * @scope  private
	 * @return void
	 */	
	function purgeEvents()
	{
		
	}
	
	/*
	 * @name   getId
	 * @desc   Returns the 'id' given to the Dashboard container (div tag)
	 * @scope  privileged
	 * @return m_id (String)
	 */			
	this.getId = function()
	{
		return m_id;
	};
	
	/*
	 * @name   getDOM
	 * @desc   Return the DOM representation of the Dashboard
	 * @scope  privileged
	 * @return m_dom (DOMElement)
	 */		
	this.getDOM = function()
	{
		return m_dom;
	};
	
	/*
	 * @name   setContainerClass
	 * @desc   Sets the name of the CSS that will be given to the Dashboard (div tag)
	 * @scope  privileged
	 * @param  css_class (String)
	 * @return void
	 */		
	this.setContainerClass = function(css_class)
	{
		m_container_class = css_class;
	};
	
	/*
	 * @name   setTableClass
	 * @desc   Sets the name of the CSS that will be given to the Dashboard (table tag)
	 * @scope  privileged
	 * @param  css_class (String)
	 * @return void
	 */		
	this.setTableClass = function(css_class)
	{
		m_table_class = css_class;	
	};
	
	/*
	 * @name   setRowClass
	 * @desc   Sets the name of the CSS that will be given to the Dashboard rows (tr tag)
	 * @scope  privileged
	 * @param  css_class (String)
	 * @return void
	 */		
	this.setRowClass = function(css_class)
	{
		m_row_class = css_class;	
	};
	
	/*
	 * @name   setRowAltClass
	 * @desc   Sets the name of the CSS that will be given to the alternate Dashboard rows (tr tag)
	 * @scope  privileged
	 * @param  css_class (String)
	 * @return void
	 */		
	this.setRowAltClass = function(css_class)
	{
		m_row_alt_class = css_class;
	};
	
	/*
	 * @name   setLabelClass
	 * @desc   Sets the name of the CSS that will be given to the Dashboard labels (td tag)
	 * @scope  privileged
	 * @param  css_class (String)
	 * @return void
	 */		
	this.setLabelClass = function(css_class)
	{
		m_label_class = css_class;		
	};
	
	/*
	 * @name   setValueClass
	 * @desc   Sets the name of the CSS that will be given to the Dashboard values (td tag)
	 * @scope  privileged
	 * @param  css_class (String)
	 * @return void
	 */		
	this.setValueClass = function(css_class)
	{
		m_value_class = css_class;		
	};
	
	/*
	 * @name   setTableWidth
	 * @desc   Sets the width of the entire Dashboard (div tag)
	 * @scope  privileged
	 * @param  table_width (Integer)
	 * @return void
	 */			
	this.setTableWidth = function(table_width)
	{
		table_width = Math.abs(Math.round(table_width));
		m_table_width = (table_width % 2 === 0) ? table_width : table_width + 1;
	};
	
	/*
	 * @name   setSpaceWidth
	 * @desc   Sets the width of the space between Dashboard Halves (td tag)
	 * @scope  privileged
	 * @param  space_width (Integer)
	 * @return void
	 */			
	this.setSpaceWidth = function(space_width)
	{
		space_width = Math.abs(Math.round(space_width));
		m_space_width = (space_width % 2 === 0) ? space_width : space_width + 1;
	};
	
	/*
	 * @name   construct
	 * @desc   Constructs the Dashboard as DOM (according to HTML structure)
	 * @scope  privileged
	 * @return DOMElement
	 */		
	this.construct = function(data_set)
	{
		purgeEvents();
		var data = data_set.getData();
		var rows = data.length;
		var cols = data[0].length + 1;
		var value_width = m_table_width/4;		
		var label_width = value_width - m_space_width/2;

		var div = document.createElement('div');
		var table = document.createElement('table');
		var thead = document.createElement('thead');
		var tbody = document.createElement('tbody');
		
		div.id = m_id;
		div.className = m_container_class;
		table.className = m_table_class;
		table.cellSpacing = '0px';
		table.cellPadding = '0px';
		
		if(cols === 5)
		{	
			for(var i = 0; i < rows; i++)
			{
				var row = document.createElement('tr');
				row.className = ((i % 2 === 0) ? m_row_alt_class : m_row_class);
				
				for(var j = 0; j < cols; j++)
				{
					var col = document.createElement('td');
					col.style.verticalAlign = 'top';
							
					if(j === 0 || j === 3)
					{
						col.className = m_label_class;						
						col.style.width = label_width + 'px';
						col.innerHTML = (j === 0) ? data[i][j] : data[i][j-1];
					}
					else if(j === 1 || j === 4)
					{
						col.className = m_value_class;
						col.style.width = value_width + 'px';
						col.innerHTML = (j === 1) ? data[i][j] : data[i][j-1];
					}
					else if(j === 2)
					{
						col.style.width = m_space_width + 'px'; 
						col.style.backgroundColor = 'white';
						col.innerHTML = '';
					}
					
					row.appendChild(col);
				}
				
				tbody.appendChild(row);
			}
			
			table.appendChild(thead);
			table.appendChild(tbody);
			div.appendChild(table);
		}
	
		m_dom = div;
		return m_dom;
	};
	
	/*
	 * @name   destruct
	 * @desc   Frees Memory associated with the Dashboard Object
	 * @scope  privileged
	 * @return void
	 */	
	this.destruct = function()
	{
		purgeEvents();
		m_dom = null;	
	};
}