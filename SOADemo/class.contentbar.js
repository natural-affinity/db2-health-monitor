/*
 * @project ContentBar JavaScript Class
 * @author Rizwan Tejpar <rtejpar@ca.ibm.com>
 * @version 1.0
 * @updated 07/22/07
 * @verified 07/22/07 (JSlint)
 * @browser IE 6, IE 7, Firefox 1.5, Firefox 2
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
 * @name   ContentBar
 * @desc   Construct an HTML content bar (internally stored as DOM object)
 * @param  content_id (string) - HTML 'id' to be used for identifying the component
 * @note   Attach events in the same way as TitleBar
 */
function ContentBar(content_id)
{
  /*
   * @name  m_id
   * @desc  The 'id' given to the top-level component of ContentBar (div tag) when rendered as HTML
   * @scope private
   */
  var m_id = content_id;

  /*
   * @name  m_content_class
   * @desc  The name of the CSS that will be given to the ContentBar (div tag)
   * @scope private
   */
  var m_content_class = '';

  /*
   * @name  m_html_content
   * @desc  The HTML content to place inside the ContentBar
   * @scope private
   */
  var m_html_content = '';

  /*
   * @name  m_dom
   * @desc  The ContentBar as an HTML DOM structure
   * @scope private
   */
  var m_dom = null;

  /*
   * @name   purgeEvents
   * @desc   Frees all memory associated with embedded ContentBar Events
   * @scope  private
   * @return void
   */
  function purgeEvents()
  {

  }

  /*
   * @name   getId
   * @desc   Returns the 'id' given to the ContentBar container (div tag)
   * @scope  privileged
   * @return m_id (String)
   */
  this.getId = function()
  {
    return m_id;
  };

  /*
   * @name   getDOM
   * @desc   Return the DOM representation of the ContentBar
   * @scope  privileged
   * @return m_dom (DOMElement)
   */
  this.getDOM = function()
  {
    return m_dom;
  };

  /*
   * @name   setContentClass
   * @desc   Sets the CSS Class for the ContentBar (div tag)
   * @scope  privileged
   * @param  css_class (string) - CSS Class name
   * @return void
   */
  this.setContentClass = function(css_class)
  {
    m_content_class = css_class;
  };

  /*
   * @name   setContent
   * @desc   Sets the HTML content to be displayed in the ContentBar
   * @scope  privileged
   * @param  content (String) - HTML content
   * @return void
   */
  this.setContent = function(content)
  {
    m_html_content = content;
  };

  /*
   * @name   construct
   * @desc   Constructs the ContentBar as DOM (according to HTML Structure)
   * @scope  privileged
   * @return DOMElement
   */
  this.construct = function()
  {
    purgeEvents();
    var div = document.createElement('div');

    div.id = m_id;
    div.className = m_content_class;
    div.innerHTML = m_html_content;

    m_dom = div;
    return m_dom;
  };

  /*
   * @name   destruct
   * @desc   Frees Memory associated with the ContentBar Object
   * @scope  privileged
   * @return void
   */
  this.destruct = function()
  {
    purgeEvents();
    m_dom = null;
  };
}