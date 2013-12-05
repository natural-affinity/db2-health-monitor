/*
 * @project ProgressBar JavaScript Class
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
 * @name  ProgressBar
 * @desc  Construct an HTML ProgressBar Widget (internally stored as DOM object)
 * @param progress_id (string) - HTML 'id' to be used for identifying the component
 */   
function ProgressBar(progress_id)
{
	/*
	 * @name  m_id
	 * @desc  The 'id' given to he ProgressBar (Outer Container - div tag) when rendered as HTML
	 * @scope private
	 */		
	var m_id = progress_id;
	
	/*
	 * @name  m_container_color
	 * @desc  Controls the background color of the ProgressBar (Inner Container - div tag)
	 * @scope private
	 */			
	var m_container_color = null;
	
	/*
	 * @name  m_container_width
	 * @desc  Controls the width of the ProgressBar (Inner Container - div tag)
	 * @scope private
	 */
	var m_container_width = null;

	/*
	 * @name  m_container_height
	 * @desc  Controls the height of the ProgressBar (Inner Container/Color Bar - div/span tag)
	 * @scope private
	 */		
	var m_container_height = null;
	
	/*
	 * @name  m_border_color
	 * @desc  Controls the border color of the ProgressBar (Inner Container - div tag)
	 * @scope private
	 */		
	var m_border_color = null;
	
	/*
	 * @name  m_border_width
	 * @desc  Controls the border width of the ProgressBar (Inner Container - div tag)
	 * @scope private
	 */		
	var m_border_width = null;
	
	/*
	 * @name  m_bar_color
	 * @desc  Controls the color of the ProgressBar (Color Bar - span tag)
	 * @scope private
	 */		
	var m_bar_color = null;
	
	/* 
	 * @name  m_dom
	 * @desc  The ProgressBar as an HTML DOM structure
	 * @scope private
	 */		
	var m_dom = null;
	
	/*
	 * @name   purgeEvents
	 * @desc   Frees all memory associated with embedded ProgressBar Events
	 * @scope  private
	 * @return void
	 */
	function purgeEvents()
	{
		
	}	
	
	/*
	 * @name   checkValue
	 * @desc   Checks values against a regular expression to ensure that they are valid
	 * @scope  private
	 * @param  my_value - any type of value to be checked
	 * @param  my_type  - the pattern to match against [color,size,percentage]
	 * @return my_value (as is); otherwise null;
	 */
	function checkValue(my_value, my_type)
	{
		var regex = null;
		
		if(my_type === 'color')
		{
			regex = /^((rgb|RGB)\(([0-9]+\,){2}[0-9]+)\)|(\#(([0-9]|[A-F]|[a-f]){3})|([0-9]|[A-F]|[a-f]){6})$/;
		}//Only Accepts RGB or HEX
		else if(my_type === 'size')
		{
			regex = /^[0-9]+(px||[%])?$/;
		}
		else if(my_type === 'percentage')
		{
			regex = /^[0-9]+$/;
		}
		
		return (regex.test(my_value) === true) ? my_value : null;
	}
	
	/*
	 * @name   getId
	 * @desc   Returns the 'id' given to the ProgressBar container (Outer Container - div tag)
	 * @scope  privileged
	 * @return m_id (String)
	 */		
	this.getId = function()
	{
		return m_id;
	};
	
	/*
	 * @name   getDOM
	 * @desc   Return the DOM representation of the ProgressBar
	 * @scope  privileged
	 * @return m_dom (DOMElement)
	 */		
	this.getDOM = function()
	{
		return m_dom;	
	};
	
	/*
	 * @name   setContainerColor
	 * @desc   Sets the background color for the ProgressBar (Inner Container - div tag)
	 * @scope  privileged
	 * @param  cont_color - background color
	 * @return void
	 */
	this.setContainerColor = function(cont_color)
	{
		m_container_color = checkValue(cont_color, 'color');	
	};
	
	/*
	 * @name   setContainerWidth
	 * @desc   Sets the width for the ProgressBar (Inner Container - div tag)
	 * @scope  privileged
	 * @param  cont_width - container width
	 * @return void
	 */	
	this.setContainerWidth = function(cont_width)
	{
		m_container_width = checkValue(cont_width, 'size');	
	};
	
	/*
	 * @name   setContainerHeight
	 * @desc   Sets the height for the ProgressBar (Inner Container/Color Bar - div/span tag)
	 * @scope  privileged
	 * @param  cont_height - container height
	 * @return void
	 */	
	this.setContainerHeight = function(cont_height)
	{
		m_container_height = checkValue(cont_height, 'size');
	};
	
	/*
	 * @name   setBorderColor
	 * @desc   Sets the border color for the ProgressBar (Inner Container - div tag)
	 * @scope  privileged
	 * @param  bord_color - border color
	 * @return void
	 */		
	this.setBorderColor = function(bord_color)
	{
		m_border_color = checkValue(bord_color, 'color');
	};

	/*
	 * @name   setBorderWidth
	 * @desc   Sets the border width for the ProgressBar (Inner Container - div tag)
	 * @scope  privileged
	 * @param  bord_width - border width
	 * @return void
	 */			
	this.setBorderWidth = function(bord_width)
	{
		m_border_width = checkValue(bord_width, 'size');
	};
	
	/*
	 * @name   setBarColor
	 * @desc   Sets the bar color for the ProgressBar (Color Bar - span tag)
	 * @scope  privileged
	 * @param  b_color - bar color
	 * @return void
	 */		
	this.setBarColor = function(b_color)
	{
		m_bar_color = checkValue(b_color, 'color');	
	};
	
	/*
	 * @name   construct
	 * @desc   Constructs the ProgressBar as DOM (according to HTML Structure)
	 * @scope  privileged
	 * @return DOMElement on success
	 */		
	this.construct = function(percentage)
	{
		purgeEvents();
		var result = checkValue(percentage, 'percentage');
		result = (result === null) ? '0' : result;
		
		var outer = document.createElement('div');
		var table = document.createElement('table');
		var thead = document.createElement('thead');
		var tbody = document.createElement('tbody');
		var row = document.createElement('tr');
		var c1 = document.createElement('td');
		var c2 = document.createElement('td');
		var div = document.createElement('div');
		var span = document.createElement('span');
		
		outer.id = m_id;
		div.style.visibility = 'visible';
		div.style.position = 'relative';
		div.style.overflow = 'hidden';
		div.style.backgroundColor = (m_container_color !== null) ? m_container_color: 'white';
		div.style.borderColor = (m_border_color !== null) ? m_border_color : 'black';
		div.style.borderWidth = (m_border_width !== null) ? m_border_width : '2px';
		div.style.borderStyle = 'solid';
		div.style.width = (m_container_width !== null) ? m_container_width : '100px';
		div.style.height = (m_container_height !== null) ? m_container_height : '10px';

		span.style.left = '0';
		span.style.position = 'absolute';
		span.style.width = result + '%';
		span.style.height = div.style.height;
		span.style.backgroundColor = (m_bar_color !== null) ? m_bar_color : 'blue';
		
		c2.style.fontFamily = 'helvetica,arial,sans-serif';
		c2.style.fontWeight = 'bold';
		c2.style.fontSize = '11px';
		c2.innerHTML = result + '%';
				
		div.appendChild(span);
		c1.appendChild(div);
		row.appendChild(c1);
		row.appendChild(c2);
		tbody.appendChild(row);
		table.appendChild(thead);
		table.appendChild(tbody);
		outer.appendChild(table);
		
		m_dom = outer;
		return m_dom;
	};
	
	/*
	 * @name   destruct
	 * @desc   Frees Memory associated with the ProgressBar Object
	 * @scope  privileged
	 * @return void
	 */
	this.destruct = function()
	{
		purgeEvents();
		m_dom = null;
	};	
}