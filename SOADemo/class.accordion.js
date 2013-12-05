/*
 * @project Accordion JavaScript Class
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
 * @name   Accordion
 * @desc   Construct an HTML accordion (internally stored as DOM object)
 * @param  accordion_id (string) - HTML 'id' to be used for identifying the component
 * @note   Icon related methods are experimental
 * @note   Attach events in the same way as TitleBar
 */   
function Accordion(accordion_id)
{
	/*
	 * @name  m_id
	 * @desc  The 'id' given to the top-level component of the Accordion (div tag) when rendered as HTML
	 * @scope private
	 */		
	var m_id = accordion_id;
	
	/*
	 * @name  m_acc_class
	 * @desc  The name of the CSS that will be given to the Accordion (div tag)
	 * @scope private
	 */		
	var m_acc_class = '';
	
	/*
	 * @name  m_active_pane
	 * @desc  The index of the ContentPane that is currently 'active' (i.e. visible content)
	 * @scope private
	 */
	var m_active_pane = 0;
	
	/*
	 * @name  m_min_icon_src
	 * @desc  The URL to the icon used to show that a content pane is 'minimized' (content not shown)
	 * @scope private
	 */
	var m_min_icon_src = '';
	
	/*
	 * @name  m_max_icon_src
	 * @desc  The URL to the icon used to show that a ContentPane is 'maximized' (content shown - active)
	 * @scope private
	 */
	var m_max_icon_src = '';
	
	/*
	 * @name  m_icon_class
	 * @desc  The CSS Class(es) for the columns that hold the min/max icons applies to the titlebars
	 * @scope private
	 */
	var m_icon_class = [];
	
	/*
	 * @name  m_panes
	 * @desc  An Array of ContentPanes which comprise the Accordion
	 * @scope private
	 */
	var m_panes = [];
	
	/* 
	 * @name  m_dom
	 * @desc  The Accordion as an HTML DOM structure
	 * @scope private
	 */	
	var m_dom = null;
	
	/*
	 * @name   setIcon
	 * @desc   Appends the minimize/maximize icon to end of the specified title bar
	 * @param  title_bar_dom (TitleBar DOM representation)
	 * @param  bool (Boolean) - true if 'maximized', false otherwise
	 * @return void
	 */
	function setIcon(title_bar_dom, bool)
	{
		//var img = title_bar_dom.firstChild.lastChild.firstChild.lastChild;
		//img.src = (!bool) ? max_icon_src : min_icon_src;	
	}	
	
	/*
	 * @name   swapPanes
	 * @desc   Performs the accordion 'action'; minimizes and maximizes ContentPanes accordingly
	 * @scope  private
	 * @param  Implicity takes the Event Object to determine which TitleBar was clicked
	 * @return void
	 */
	function swapPanes(evt)
	{
		var title_id = null;
		
		try
		{
			title_id = evt.target.getAttribute('id');
		}
		catch(Throwable)
		{
			title_id = evt.srcElement.getAttribute('id');	
		}
		
		var i = 0;
		for(i = 0; i < m_panes.length; i++)
		{
			if(m_panes[i].getTitleBar().getId() === title_id)
			{
				break;
			}
		}//clicked
		
		if(m_active_pane !== i)
		{
			for(var j = 0; j < m_panes.length; j++)
			{
				var content = m_panes[j].getContentBar().getDOM();
				
				if(j === i)
				{	
					m_active_pane = j;
					setIcon(m_panes[j].getTitleBar().getDOM(), true);
					content.style.display = '';	
				}
				else
				{
					setIcon(m_panes[j].getTitleBar().getDOM(), false);
					content.style.display = 'none';	
				}
			}
		}
	}		
	
	/*
	 * @name   purgeEvents
	 * @desc   Frees all memory associated with embedded Accordion Events
	 * @scope  private
	 * @return void
	 */
	function purgeEvents()
	{
		if(m_dom !== null)
		{
			for(var i = 0; i < m_panes.length; i++)
			{
				try
				{
					m_panes[i].getTitleBar().getDOM().removeEventListener('click', swapPanes, false);
				}
				catch(Throwable)
				{
					m_panes[i].getTitleBar().getDOM().detachEvent('onclick', swapPanes);	
				}
			}
		}				
	}		
	
	/*
	 * @name   applyToAll
	 * @desc   Applies the value 'tid' to the 'id' attribute all dom nodes of the specified dom_tree
	 * @param  dom_tree (DOMElement) - root node to which to begin applying changes
	 * @param  tid (String) - the new 'id' to assign all nodes
	 * @return void
	 */
	function applyToAll(dom_tree, tid)
	{
		try
		{
			dom_tree.id = tid;
		}
		catch(Throwable)
		{
			
		}
		
		for(var j = 0; j < dom_tree.childNodes.length; j++)
		{
			if(dom_tree.childNodes[j] !== null)
			{
				applyToAll(dom_tree.childNodes[j],tid);	
			}
		}		
	}		
	
	/*
	 * @name   getId
	 * @desc   Returns the 'id' given to the Accordion container (div tag)
	 * @scope  privileged
	 * @return m_id (String)
	 */		
	this.getId = function()
	{
		return m_id;
	};
	
	/*
	 * @name   getDOM
	 * @desc   Return the DOM representation of the Accordion
	 * @scope  privileged
	 * @return m_dom (DOMElement)
	 */		
	this.getDOM = function()
	{
		return m_dom;
	};

	/*
	 * @name   setIconClass
	 * @desc   Sets the CSS Class(es) for the min/max icons to appear on all TitleBars
	 * @scope  privileged
	 * @param  css_class (array) - CSS Class names for TitleBars (in order)
	 * @return void
	 */		
	this.setIconClass = function(css_class)
	{
		for(var i = 0; i < css_class.length; i++)
		{
			m_icon_class[i] = css_class[i];	
		}
	};
	
	/*
	 * @name  setMinIcon
	 * @desc  Sets the 'minimize' icon to appear on all TitleBars in the accordion (inactive)
	 * @scope privileged
	 * @param url (string) - url to the image to use
	 * @return void
	 */
	this.setMinIcon = function(url)
	{
		m_min_icon_src = url;
	};

	/*
	 * @name  setMaxIcon
	 * @desc  Sets the 'maximize' icon to appear on all TitleBars in the accordion (inactive)
	 * @scope privileged
	 * @param url (string) - url to the image to use
	 * @return void
	 */		
	this.setMaxIcon = function(url)
	{
		m_max_icon_src = url;	
	};
	
	/*
	 * @name   setAccordionClass
	 * @desc   Sets the name of the CSS that will be given to the Accordion (div tag)
	 * @scope  privileged
	 * @param  css_class (String)
	 * @return void
	 */		
	this.setAccordionClass = function(css_class)
	{
		m_acc_class = css_class;
	};
	
	/*
	 * @name  setContentPane
	 * @desc  Sets the ContentPanes to be used in the Accordion
	 * @scope privileged
	 * @param panes_arr (Array) - ContentPane
	 * @return void
	 */	
	this.setContentPane = function(panes_arr)
	{
		m_panes = [];
		for(var i = 0; i < panes_arr.length; i++)
		{
			m_panes[i] = panes_arr[i];	
		}
	};

	/*
	 * @name   construct
	 * @desc   Constructs the Accordion as DOM (according to HTML Structure)
	 * @scope  privileged
	 * @return DOMElement on success; null otherwise
	 */		
	this.construct = function()
	{
		purgeEvents();
		var div = document.createElement('div');
		div.id = m_id;
		div.className = m_acc_class;

		for(var i = 0; i < m_panes.length; i++)
		{
			div.appendChild(m_panes[i].construct());	
			var tbar = m_panes[i].getTitleBar();
			
			try
			{
				tbar.getDOM().addEventListener('click', swapPanes, false);//add titlebar listeners
			}
			catch(Throwable)
			{
				tbar.getDOM().attachEvent('onclick', swapPanes);//add titlebar listeners	
				
				if(div.style.width === '' || div.style.width === null)
				{
					div.style.width = '100%';	
				}
				
				tbar.getDOM().style.width = div.style.width;			
			}
			
			var root = m_panes[i].getTitleBar().getDOM();
			var col = document.createElement('td');
			var img = document.createElement('img');
			col.className = m_icon_class[i];
			
			if(m_min_icon_src !== '' && m_max_icon_src !== '') 
			{
				col.appendChild(img);
			}
			
			img.src = (i === 0) ? m_max_icon_src : m_min_icon_src;
			root.firstChild.lastChild.firstChild.appendChild(col);	
			
			applyToAll(tbar.getDOM(), tbar.getId());
			
			if(i !== m_active_pane)
			{
				m_panes[i].getContentBar().getDOM().style.display = 'none';	//set inactive panes
			}
		}

		m_dom = div;
		return m_dom;
	};
	
	/*
	 * @name   destruct
	 * @desc   Frees Memory associated with the Accordion Object
	 * @scope  privileged
	 * @return void
	 */
	this.destruct = function()
	{
		purgeEvents();
		if(m_panes !== null)
		{
			for(var i = 0; i < m_panes.length; i++)	
			{
				m_panes[i].destruct();	
			}	
		}
		m_dom = null;
	};
}