/*
 * @project ContentPane JavaScript Class
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
 * @name   ContentPane
 * @desc   Construct an HTML content pane (internally stored as DOM object)
 * @param  pane_id (string) - HTML 'id' to be used for identifying the component
 * @note   Attach events in the same way as TitleBar
 */
function ContentPane(pane_id)
{
  /*
   * @name  m_id
   * @desc  The 'id' given to the top-level component of ContentPane (div tag) when rendered as HTML
   * @scope private
   */
  var m_id = pane_id;

  /*
   * @name  m_pane_class
   * @desc  The name of the CSS that will be given to the ContentPane (div tag)
   * @scope private
   */
  var m_pane_class = '';

  /*
   * @name  m_title_bar
   * @desc  The TitleBar Object that will appear at the top of the ContentPane
   * @scope private
   */
  var m_title_bar = null;

  /*
   * @name  m_content_bar
   * @desc  The ContentBar Object that will appear at the bottom of the ContentPane
   * @scope private
   */
  var m_content_bar = null;

  /*
   * @name  m_dom
   * @desc  The ContentPane as an HTML DOM structure
   * @scope private
   */
  var m_dom = null;

  /*
   * @name   purgeEvents
   * @desc   Frees all memory associated with embedded ContentPane Events
   * @scope  private
   * @return void
   */
  function purgeEvents()
  {

  }

  /*
   * @name   getId
   * @desc   Returns the 'id' given to the ContentPane container (div tag)
   * @scope  privileged
   * @return m_id (String)
   */
  this.getId = function()
  {
    return m_id;
  };

  /*
   * @name   getDOM
   * @desc   Return the DOM representation of the ContentPane
   * @scope  privileged
   * @return m_dom (DOMElement)
   */
  this.getDOM = function()
  {
    return m_dom;
  };

  /*
   * @name   getTitleBar
   * @desc   Return the TitleBar Object contained in the ContentPane
   * @scope  privileged
   * @return m_title_bar (TitleBar)
   */
  this.getTitleBar = function()
  {
    return m_title_bar;
  };

  /*
   * @name   getContentBar
   * @desc   Return the ContentBar Object contained in the ContentPane
   * @scope  privileged
   * @return m_content_bar (ContentBar)
   */
  this.getContentBar = function()
  {
    return m_content_bar;
  };

  /*
   * @name   setTitleBar
   * @desc   Sets the TitleBar object contained in the ContentPane
   * @scope  privileged
   * @param  obj (TitleBar)
   * @return void
   */
  this.setTitleBar = function(obj)
  {
    m_title_bar = obj;
  };

  /*
   * @name   setContentBar
   * @desc   Sets the ContentBar object contained in the ContentPane
   * @scope  privileged
   * @param  obj (ContentBar)
   * @return void
   */
  this.setContentBar = function(obj)
  {
    m_content_bar = obj;
  };

  /*
   * @name   setPaneClass
   * @desc   Sets the name of the CSS that will be given to the ContentPane (div tag)
   * @scope  privileged
   * @param  css_class (String)
   * @return void
   */
  this.setPaneClass = function(css_class)
  {
    m_pane_class = css_class;
  };

  /*
   * @name   construct
   * @desc   Constructs the ContentPane as DOM (according to HTML structure)
   * @scope  privileged
   * @return DOMElement
   */
  this.construct = function()
  {
    purgeEvents();
    var div = document.createElement('div');

    div.id = m_id;
    div.className = m_pane_class;
    div.appendChild(m_title_bar.construct());
    div.appendChild(m_content_bar.construct());

    m_dom = div;
    return m_dom;
  };

  /*
   * @name   destruct
   * @desc   Frees Memory associated with the ContentPane Object
   * @scope  privileged
   * @return void
   */
  this.destruct = function()
  {
    purgeEvents();

    if(m_title_bar !== null)
    {
      m_title_bar.destruct();
    }

    if(m_content_bar !== null)
    {
      m_content_bar.destruct();
    }

    m_dom = null;
  };
}