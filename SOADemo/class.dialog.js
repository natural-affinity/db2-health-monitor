/*
 * @project Dialog JavaScript Class
 * @author Rizwan Tejpar <rtejpar@ca.ibm.com>
 * @version 1.0
 * @updated 07/22/07
 * @verified 07/22/07 (JSlint) [Cannot be fully verfied - purgeEvents + destroyDialog]
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
 * @name   Dialog
 * @desc   Construct an HTML Dialog (internally stored as DOM object)
 * @param  dialog_id (string) - HTML 'id' to be used for identifying the component
 * @note   hideDialog actually acts as the destructor in this case
 * @note   showDialog must be used after construct() to make the dialog visible
 */  
function Dialog(dialog_id)
{
	/*
	 * @name  m_id
	 * @desc  The 'id' given to the top-level component of Dialog (div tag) when rendered as HTML
	 * @scope private
	 */
	var m_id = dialog_id;
	
	/*
	 * @name  m_container_class
	 * @desc  The name of the CSS class that will be given to the Dialog container (div tag)
	 * @scope private
	 */
	var m_container_class = '';
	
	/*
	 * @name  m_underlay_class
	 * @desc  The name of the CSS class that will be given to the Dialog underlay (iframe tag)
	 * @scope private
	 */
	var m_underlay_class = '';
	
	/*
	 * @name  m_content_pane
	 * @desc  The ContentPane object that will appear within the Dialog window
	 * @scope private
	 */	
	var m_content_pane = null;
	
	/*
	 * @name  m_vscroll_width;
	 * @desc  Stores the Width of the Browser's Vertical Scrollbar
	 * @scope private
	 */
	var m_vscroll_width = 0;
	
	/*
	 * @name  m_hscroll_width;
	 * @desc  Stores the Width of the Browser's Horizontal Scrollbar
	 * @scope private
	 */
	var m_hscroll_width = 0;
	
	/*
	 * @name  m_ie_fix
	 * @desc  An Internal Counter used to handle the IE double resize(), and Bad Scroll event requests
	 * @scope private
	 */
	var m_ie_fix = 0;
	
	/*
	 * @name  m_hide_on_close
	 * @desc  A Boolean Flag that hides the dialog when closed on true; destroys it on false
	 * @scope private
	 */
	 var m_hide_on_close = true;
	
	/*
	 * @name  m_closer
	 * @desc  The Dialog Close Button as an HTML DOM Structure
	 * @scope private
	 */
	var m_closer = null;
	
	/* 
	 * @name  m_dom
	 * @desc  The Dialog as an HTML DOM structure
	 * @scope private
	 */	
	var m_dom = null;
		
	/*
	 * @name   toNum
	 * @desc   Extracts the Numerical Portion of a String
	 * @scope  private
	 * @param  val - The String value on which to perform the extraction
	 * @return String (numerical)
	 */
	function toNum(val)
	{
		return (val + '').match(/[0-9]+/);	
	}
	
	/*
	 * @name   fixDialog
	 * @desc   Resizes the Dialog window and Dialog underlay on window resize/scroll
	 * @scope  private
	 * @param  Implicity takes the Event Object should event detection be required
	 * @return void
	 */
	function fixDialog(evt)
	{
		if(m_dom !== null)
		{	
			var underlay = m_dom.firstChild;
			var dialog = m_dom.lastChild;
			
			var dw = toNum(m_content_pane.getTitleBar().getDOM().style.width);
			var dh = toNum(m_content_pane.getDOM().offsetHeight);
			var soff = toNum(window.pageXOffset || ((document.body.scrollLeft > document.documentElement.scrollLeft) ? document.body.scrollLeft : document.documentElement.scrollLeft));
			var yoff = toNum(window.pageYOffset || ((document.body.scrollTop > document.documentElement.scrollTop) ? document.body.scrollTop : document.documentElement.scrollTop));
			var view = toNum(window.innerWidth || ((document.body.clientWidth > document.documentElement.clientWidth) ? document.body.clientWidth : document.documentElement.clientWidth));
			var viewy = toNum(window.innerHeight || ((document.body.clientHeight > document.documentElement.clientHeight) ? document.body.clientHeight : document.documentElement.clientHeight));
			var w = ((view - dw)/2 < 0) ? 0 : (view-dw)/2;
			var h = ((viewy - dh)/2 < 0) ? 0 : (viewy-dh)/2;
			dialog.style.left = w + 'px';
			dialog.style.top = h + 'px';
			dialog.style.width = dw + 'px';

			try
			{
				if(m_ie_fix === 2)
				{
					m_ie_fix = 0;		
				}
				
				if(evt.type.match('resize'))
				{
					underlay.style.width = view + 'px';
					underlay.style.height = viewy + 'px';

					if(window.pageXOffset === undefined)
					{
						m_ie_fix++;
					}
				}	
				else
				{
					if(window.pageXOffset === undefined)
					{
						m_ie_fix = 2;
					}					
				}
			}
			catch(Throwable)
			{

			}
			
			if(soff > 0)
			{
				m_ie_fix = 2;
			}//IE6,IE7 Fix - if horizontal scroll does not start at extreme left
			
			var x_overflow = toNum(window.scrollMaxX);
			var y_overflow = toNum(window.scrollMaxY);
			var w2 = 0;
			var h2 = 0;
			
			if(x_overflow === null && m_ie_fix === 2)
			{
				w2 = toNum(((document.body.scrollWidth > document.documentElement.scrollWidth) ? document.body.scrollWidth : document.documentElement.scrollWidth));	
				h2 = toNum(((document.body.scrollHeight > document.documentElement.scrollHeight) ? document.body.scrollHeight : document.documentElement.scrollHeight));	
			}
			else 
			{
				w2 = (1*view + 1*x_overflow);
				h2 = (1*viewy + 1*y_overflow);			
			}
			
			underlay.style.width = ((window.scrollMaxY > 0) ? (w2 - 19) : w2) + 'px';
			underlay.style.height = ((window.scrollMaxX > 0) ? (h2 - 19) : h2) + 'px';
		}
	}

	/*
	 * @name   hideDialog
	 * @desc   Hides the Dialog Box
	 * @scope  private
     * @param  Implicity takes the Event Object should event detection be required	 
	 * @return void
	 */
	function hideDialog(evt)
	{
		if(m_dom !== null)
		{
			m_dom.style.display = 'none';	
		}	
	}
	
	/*
	 * @name   purgeEvents
	 * @desc   Frees all memory associated with embedded Dialog Events
	 * @scope  private
	 * @return void
	 */
	function purgeEvents()
	{
		if(m_closer !== null)
		{
			try
			{
				window.removeEventListener('resize', fixDialog, false);
				window.removeEventListener('scroll', fixDialog, false);	
				m_closer.removeEventListener('click', hideDialog, false);
				m_closer.removeEventListener('click', destroyDialog, false);			
			}
			catch(Throwable)
			{
				window.detachEvent('onresize', fixDialog);
				window.detachEvent('onscroll', fixDialog);
				m_closer.detachEvent('onclick', hideDialog);
				m_closer.detachEvent('onclick', destroyDialog);			
			}			
		}		
	}			
			
	/*
	 * @name   hideDialog
	 * @desc   Hides and Destroys the dialog, Detach External Window Events
	 * @scope  private
	 * @param  Implicity takes the Event Object to determine which part of the Dialog was clicked
	 * @return void
	 */
	function destroyDialog(evt)
	{
		hideDialog(null);
		purgeEvents();
		if(m_content_pane !== null)
		{
			m_content_pane.destruct();	
		}			
		m_dom = null;
	}	
	
	/*
	 * @name   getId
	 * @desc   Returns the 'id' given to the Dialog container (div tag)
	 * @scope  privileged
	 * @return m_id (String)
	 */
	this.getId = function()
	{
		return m_id;
	};
	
	/*
	 * @name   getDOM
	 * @desc   Return the DOM representation of the Dialog
	 * @scope  privileged
	 * @return m_dom (DOMElement)
	 */	
	this.getDOM = function()
	{
		return m_dom;	
	};
	
	/*
	 * @name   setContentPane
	 * @desc   Sets the ContentPane object contained in the Dialog
	 * @scope  privileged
	 * @param  obj (ContentPane)
	 * @return void
	 */		
	this.setContentPane = function(obj)
	{
		m_content_pane = obj;
	};
	
	/*
	 * @name   setContainerClass
	 * @desc   Sets the name of the CSS that will be given to the Dialog container (div tag)
	 * @scope  privileged
	 * @param  css_class (String)
	 * @return void
	 */		
	this.setContainerClass = function(css_class)
	{
		m_container_class = css_class;	
	};
	
	/*
	 * @name   setUnderlayClass
	 * @desc   Sets the name of the CSS that will be given to the Dialog underlay (div tag)
	 * @scope  privileged
	 * @param  css_class (String)
	 * @return void
	 */			
	this.setUnderlayClass = function(css_class)
	{
		m_underlay_class = css_class;
	};
	
	/*
	 * @name   setHideOnClose
	 * @desc   Set the hide_on_close parameter for the dialog to determine 'on close' functionality
	 * @scope  privileged
	 * @param  flag (boolean); true for hide, false for destroy
	 * @return void
	 */
	this.setHideOnClose = function(flag)
	{
		m_hide_on_close = flag ? true : false;	
	};
	
	/*
	 * @name   showDialog
	 * @desc   Shows the Dialog Box in the center of the screen
	 * @scope  privileged
	 * @return void
	 */
	this.showDialog = function()
	{
		if(m_dom !== null)
		{
			m_dom.style.display = '';	
			fixDialog(null);
		}	
	};	
	 
	/*
	 * @name   construct
	 * @desc   Constructs the Dialog as DOM (according to HTML Structure)
	 * @scope  privileged
	 * @return DOMElement
	 */		
	this.construct = function()
	{
		purgeEvents();
		var container = document.createElement('div');
		var underlay = document.createElement('iframe');
		var row = document.createElement('tr');
		var col = document.createElement('td');
		var pane = m_content_pane.construct();		
		m_closer = document.createElement('input');		
		m_closer.type = 'button';
		m_closer.value = 'OK';
		
		try
		{
			m_closer.addEventListener('click', m_hide_on_close ? hideDialog : destroyDialog, false);
			window.addEventListener('resize', fixDialog, false);
			window.addEventListener('scroll', fixDialog, false); 
		}
		catch(Throwable)
		{
			m_closer.attachEvent('onclick', m_hide_on_close ? hideDialog : destroyDialog);
			window.attachEvent('onresize', fixDialog);
			window.attachEvent('onscroll', fixDialog);
		}
			
		container.id = m_id;
		container.className = m_container_class;
		container.style.display = 'none';
		
		underlay.className = m_underlay_class;
		underlay.src = './blank.html';
		underlay.style.opacity = 0.5;					//necessary	- should be dynamic	
		underlay.style.filter = 'alpha(opacity=50)';	//Ie6 opacity fix;
		underlay.style.position = 'absolute';			//necessary
		underlay.style.margin = '0px';
		underlay.style.padding = '0px';
		underlay.style.left = '0px';					//necessary
		underlay.style.top = '0px';						//necessary
		underlay.style.zIndex = 1000;					//necessary
		underlay.style.border = '0px';

		pane.style.position = 'absolute';				//necessary
		pane.style.backgroundColor = '#EBEBEB';			//optional
		pane.style.border = '4px solid ThreeDShadow';	//optional
		
		pane.style.zIndex = 1001;						//necessary
		pane.style.margin = 0;							//necessary
		pane.style.overflow = 'hidden';					//necessary
		m_content_pane.getContentBar().getDOM().firstChild.style.paddingRight = '10px';
		m_content_pane.getTitleBar().getDOM().style.width = '614px';
		col.appendChild(m_closer);
		row.appendChild(col);
		
		col.style.textAlign = 'center';
		col.colSpan = 2;
		m_content_pane.getContentBar().getDOM().firstChild.firstChild.appendChild(row);

		container.appendChild(underlay);
		container.appendChild(pane);
				
		m_dom = container;
		return m_dom;
	};

	/*
	 * @name   destruct
	 * @desc   Frees Memory associated with the Dialog Object
	 * @scope  privileged
	 * @return void
	 */	
	this.destruct = function()
	{
		destroyDialog(null);
	};
}