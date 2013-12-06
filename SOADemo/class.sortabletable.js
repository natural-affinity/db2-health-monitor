//BUG #1: HTML Content - if can gain focus; cell border disappears; sorting may not function accurately for #s (if within html)
//BUG #2: IE 7 Refresh Bug: Scrollbars only appear on table hover

/*
 * @project SortableTable JavaScript Class
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
 * @name  SortableTable
 * @desc  Construct a set of arrays to represent tablular data by appending rows of data to the set
 * @param cont_id - the 'id' of the table container that will be specified when the HTML is rendered
 * @param tbl_id  - the 'id' of the table that will be specified when the HTML page is rendered
 * @note  Be sure that the first row of the DataSet is the column names
 * @note  All events externally attached to the Widget must be removed externally (not removed on destruct)
 * @note  on construct() the order of application is: column order, then column visibility
 */
function SortableTable(cont_id, tbl_id)
{
  /*
   * @name  m_container_id
   * @desc  The 'id' of the table container when it is written to HTML (div tag)
   * @scope private
   */
  var m_container_id = cont_id;

  /*
   * @name  m_table_id
   * @desc  The 'id' of the SortableTable when it is written to HTML (table tag)
   * @scope private
   */
  var m_table_id = tbl_id;

  /*
   * @name  m_container_class
   * @desc  The name of the CSS class that will be given to the SortableTable container (div tag)
   * @scope private
   */
  var m_container_class = '';

  /*
   * @name  m_table_class
   * @desc  The name of the CSS class that will be given to the SortableTable (table tag)
   * @scope private
   */
  var m_table_class = '';

  /*
   * @name  m_body_class
   * @desc  The name of the CSS class that will be given to the SortableTable (tbody tag)
   * @scope private
   */
  var m_body_class = '';

  /*
   * @name  m_row_header_class
   * @desc  The name of the CSS class that will be given to the SortableTable row header (tr tag)
   * @scope private
   */
  var m_row_header_class = '';

  /*
   * @name  m_row_class
   * @desc  The name of the CSS class that will be given to the SortableTable rows (tr tag)
   * @scope private
   */
  var m_row_class = '';

  /*
   * @name  m_row_alt_class
   * @desc  The name of the CSS class that will be given to the SortableTable alertnating rows (tr tag)
   * @scope private
   */
  var m_row_alt_class = '';

  /*
   * @name  m_row_highlight_class
   * @desc  The name of the CSS class that will be given to the SortableTable highlighted rows (tr tag)
   * @scope private
   */
  var m_row_highlight_class = '';

  /*
   * @name  m_row_selected_class
   * @desc  The name of the CSS class that will be given to the SortableTable selected rows (tr tag)
   * @scope private
   */
  var m_row_selected_class = '';

  /*
   * @name  m_col_header_class
   * @desc  The name of the CSS class that will be given to the SortableTable column headers (th tag)
   * @scope private
   */
  var m_col_header_class = '';

  /*
   * @name  m_col_class
   * @desc  The name of the CSS class(es) that will be given to the SortableTable columns (td tag)
   * @scope private
   */
  var m_col_class = [];

  /*
   * @name  m_last_row
   * @desc  The last table row (dom_node) that was selected
   * @scope private
   */
  var m_last_row = null;

  /*
     * @name  m_sort_style
     * @desc  The last type of sort that was used on any table column (ex - ascending (asc))
     * @scope private
     */
  var m_sort_style = null;

  /*
   * @name  m_last_sort_col_nm
   * @desc  The index of the last column that was sorted in the table
   * @scope private
   */
  var m_last_sort_col_num = null;

  /*
   * @name  m_row_events
   * @desc  Stores Row Events added with the addRowListener method (ensures event is always added during construction)
   * @scope private
   */
  var m_row_events = [];

  /*
   * @name  m_event_types
   * @desc  Stores the Types of Events that all table rows have attached to them
   * @scope private
   */
  var m_event_types = [];

  /*
   * @name  m_col_display
   * @desc  Stores the display status of SortableTable columns
   * @scope private
   */
  var m_col_display = [];

  /*
   * @name  m_col_order
   * @desc  Stores the order of SortableTable columns
   * @scope private
   */
   var m_col_order = [];

  /*
   * @name  m_map
   * @desc  An array that represents a 1:1 mapping between data rows of the table (tbody) and its indicies
   *        This array is sorted in the same order as the data rows of the table
   * @scope private
   */
  var m_map = null;

  /*
   * @name  m_dom
   * @desc  The SortableTable as an HTML DOM structure
   * @scope private
   */
  var m_dom = null;

  /*
   * @name   sortNum
   * @desc   Allows the sorting of numerical values
   * @scope  private
   * @param  a       - the first number to use in the sort
   * @param  b       - the second number to use in the sort
   * @return integer - the difference between the numbers
   */
  function sortNum(a, b)
  {
    return (a-b);
  }

  /*
   * @name   getColType
   * @desc   Determines the type of column that was selected to sort
   * @scope  private
   * @param  colNum - (integer) the index of the column that has been selected
   * @return string - the type of column that has been selected: string or number
   */
  function getColType(colNum)
  {
    try
    {
      var node = m_dom.firstChild.lastChild.childNodes[0].childNodes[colNum];

      if(!isNaN(node.textContent) || !isNaN(node.innerText))
      {
        return 'number';
      }
      else
      {
        return 'string';
      }
    }
    catch(Throwable)
    {
      return 'string';
    }
  }

  /*
   * @name   sortCol
   * @desc   Sorts the specified column in either ascending or descending format
   * @scope  private
   * @param  Implicity takes the Event Object to determine which DOM column header was clicked
   * @return void
   */
  function sortCol(evt)
  {
    var colNum = null;

    try
    {
      colNum = evt.target.cellIndex;
    }
    catch(Throwable)
    {
      colNum = evt.srcElement.cellIndex;
    }

    var colType = getColType(colNum);
    var tbody = m_dom.firstChild.lastChild;
    var rows = tbody.childNodes.length;
    var reversed = false;

    var dom_refs = [];
    var original = [];
    var sorted = [];
    var sequence = [];
    var used = [];
    var old_data = [];

    for(var i = 0; i < rows; i++)
    {
      used[i] = false;
      original[i] =  tbody.childNodes[0].childNodes[colNum].textContent || tbody.childNodes[0].childNodes[colNum].innerText;
      sorted[i] =  tbody.childNodes[0].childNodes[colNum].textContent || tbody.childNodes[0].childNodes[colNum].innerText;
      dom_refs[i] = tbody.removeChild(tbody.childNodes[0]);

      if(m_map !== null)
      {
        old_data[i] = m_map[i];
      }
    }//For each row - get particular col data and append to array

    if(m_sort_style === null || m_last_sort_col_num !== colNum)
    {
      m_sort_style = 'asc';

      if(colType === 'number')
      {
        sorted.sort(sortNum);
      }
      else
      {
        sorted.sort();
      }
    }
    else if(m_last_sort_col_num === colNum)
    {
      reversed = true;

      if(m_sort_style === 'asc')
      {
        m_sort_style = 'desc';
      }
      else
      {
        m_sort_style = 'asc';
      }
    }

    if(!reversed)
    {
      for(i = 0; i < rows; i++)
      {
        for(var j = 0; j < rows; j++)
        {
          if((original[i] === sorted[j]) && (used[j] === false))
          {
            used[j] = true;
            sequence[j] = i;
            break;
          }//Found original data in sorted - record new position
        }
      }//For all pieces of data
    }//Only needed if we are actually sorting the data (full sort)

    for(i = 0; i < rows; i++)
    {
      var pos = (reversed) ? (rows - i - 1) : sequence[i];

      if(m_map !== null)
      {
        m_map[i] = old_data[pos];
      }

      tbody.appendChild(dom_refs[pos]);

      if(dom_refs[pos] !== m_last_row)
      {
        tbody.childNodes[i].className = ((tbody.childNodes[i].rowIndex) % 2 === 0) ? m_row_alt_class : m_row_class;
      }
    }

    m_last_sort_col_num = colNum;
  }

  /*
   * @name   selectRow
   * @desc   An event handler that colours the row that was selected by the user in the table
   * @scope  private
   * @param  Implicity takes the Event Object to determine which DOM row was clicked
   * @return void
   */
  function selectRow(evt)
  {
    var dom_row = null;

    try
    {
      dom_row = evt.target.parentNode;
    }
    catch(Throwable)
    {
      dom_row = evt.srcElement.parentNode;
    }

    if(m_last_row !== null)
    {
      m_last_row.className = (m_last_row.rowIndex % 2 === 0) ? m_row_alt_class : m_row_class;
    }

    dom_row.className = m_row_selected_class;
    m_last_row = dom_row;
  }

  /*
   * @name   highlightRow
   * @desc   An event handler that colours the row that the user has hovered over in the table
   * @scope  private
   * @param  Implicity takes the Event Object to determine which DOM row was hovered over
   * @return void
   */
  function highlightRow(evt)
  {
    var dom_row = null;

    try
    {
      dom_row = evt.target.parentNode;
    }
    catch(Throwable)
    {
      dom_row = evt.srcElement.parentNode;
    }

    if(m_last_row !== dom_row)
    {
      dom_row.className = m_row_highlight_class;
    }
  }

  /*
   * @name   restoreRow
   * @desc   An event handler that restored the row's original color after the user has hovered outside the last_row in the table
   * @scope  private
   * @param  Implicity takes the Event Object to determine which DOM row lost focus
   * @return void
   */
  function restoreRow(evt)
  {
    var dom_row = null;

    try
    {
      dom_row = evt.target.parentNode;
    }
    catch(Throwable)
    {
      dom_row = evt.srcElement.parentNode;
    }

    if(m_last_row !== dom_row)
    {
      dom_row.className = (dom_row.rowIndex % 2 === 0) ? m_row_alt_class : m_row_class;
    }
  }

  /*
   * @name  scrollFix
   * @desc  Fix the Column Headers while Table Scrolling Occurs (IE Fix)
   * @scope private
   * @param Implicity takes the Event Object to gain access to the Table Column Headers
   * @return void
   */
  function scrollFix(evt)
  {
    try
    {
      var h = evt.srcElement.firstChild.firstChild.firstChild;
      for(var i = 0; i < h.childNodes.length;i++)
      {
        if(evt.srcElement.scrollTop === 0)
        {
          h.childNodes[i].style.setExpression('top',"document.getElementById('" + m_container_id + "').scrollTop");
        }
        else
        {
          h.childNodes[i].style.setExpression('top',"document.getElementById('" + m_container_id + "').scrollTop-2");
        }
        h.childNodes[i].className = h.childNodes[i].className;//IE7 horizontal scroll refresh fix
      }
    }
    catch(Throwable)
    {

    }
  }

  /*
   * @name   eventQueue
   * @desc   Simulates an Event Queue for a Particular type of event (executes all events of a specific type)
   * @scope  private
   * @param  Implicity takes the Event Object to determine the types of events to execute
   * @return void
   */
  function eventQueue(evt)
  {
    for(var i = 0; i < m_row_events.length; i++)
    {
      try
      {
        var is_event = /^(click|load|unload|dblclick|mousemove|mouseover|mouseout){1}$/.test(evt.type);
        var evt_nm = (is_event) ? evt.type : evt.type.substring(2);

        if(m_row_events[i][0] === evt_nm)
        {
          m_row_events[i][1](evt);
        }
      }
      catch(Throwable)
      {

      }
    }
  }

  /*
   * @name   purgeEvents
   * @desc   Frees all memory associated with embedded SortableTable Events
   * @scope  private
   * @return void
   */
  function purgeEvents()
  {
    if(m_dom !== null)
    {
      try
      {
        m_dom.detachEvent('onscroll', scrollFix);
      }//Remove IE scrollFix event
      catch(Throwable)
      {

      }

      var rows = m_dom.getElementsByTagName('tr');
      var header_cols = rows[0].childNodes;

      for(var i = 0; i < header_cols.length; i++)
      {
        try
        {
          header_cols[i].detachEvent('onclick', sortCol);
        }
        catch(Throwable)
        {
          header_cols[i].removeEventListener('click', sortCol, false);
        }
      }//Purge Column Header Events

      for(var j = 1; j < rows.length; j++)
      {
        for(var k = 0; k < m_event_types.length; k++)
        {
          try
          {
            rows[j].detachEvent('on' + m_event_types[k], eventQueue);
          }
          catch(Throwable)
          {
            rows[j].removeEventListener(m_event_types[k], eventQueue, false);
          }
        }
      }//Purge Row Events
    }
  }

  /*
   * @name   getContainerId
   * @desc   Returns the 'id' given to the SortableTable container (div tag)
   * @scope  privileged
   * @return m_container_id (String)
   */
  this.getContainerId = function()
  {
    return m_container_id;
  };

  /*
   * @name   getTableId
   * @desc   Returns the 'id' given to the SortableTable (table tag)
   * @scope  privileged
   * @return m_table_id (String)
   */
  this.getTableId = function()
  {
    return m_table_id;
  };

  /*
   * @name   getDOM
   * @desc   Return the DOM representation of the SortableTable
   * @scope  privileged
   * @return m_dom (DOMElement)
   */
  this.getDOM = function()
  {
    return m_dom;
  };

  /*
   * @name   getLastRow
   * @desc   Returns the DOM representation of the last row that was clicked (tr element)
   * @scope  privileged
   * @return m_last_row (DOMElement)
   */
  this.getLastRow = function()
  {
    return m_last_row;
  };

  /*
   * @name   addRowListener
   * @desc   Adds an event listener to all rows of table (tbody rows) each time the SortableTable is constructed
   * @scope  privileged
   * @param  evt    - The name of the event to apply to the DOM row (tr tag) i.e. 'click', 'mouseover', etc.
   * @param  fn_ref - A reference to the function to call when the event is triggered
   * @param  flag   - boolean value (see Mozilla addActionListener documentation); usually false
   * @return boolean
   */
  this.addRowListener = function(evt, fn_ref, flag)
  {
    var is_event = /^(click|dblclick|mousemove|mouseover|mouseout){1}$/.test(evt);

    if(is_event)
    {
      var new_evt = [evt, fn_ref, flag];

      for(var i = 0; i < m_row_events.length; i++)
      {
        if(m_row_events[i][0] === evt && m_row_events[i][1] === fn_ref)
        {
          return false;
        }
      }

      m_row_events.push([evt, fn_ref, flag]);
      return true;
    }
    else
    {
      return false;
    }
  };

  /*
   * @name   setMap
   * @desc   Binds the map array (1:1) to the data rows of the table with regards to sorting
   * @scope  privileged
   * @param  map_array - an array that represents a 1:1 mapping between array indicies and table data rows
   * @return void
   */
  this.setMap = function(map_array)
  {
    m_map = map_array;
  };

  /*
   * @name   setContainerClass
   * @desc   Sets the name of the CSS class that will be given to the SortableTable (div tag)
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
   * @desc   Sets the name of the CSS class that will be given to the SortableTable (table tag)
   * @scope  privileged
   * @param  css_class (String)
   * @return void
   */
  this.setTableClass = function(css_class)
  {
    m_table_class = css_class;
  };

  /*
   * @name   setBodyClass
   * @desc   Sets the name of the CSS class that will be given to the SortableTable (tbody tag)
   * @scope  privileged
   * @param  css_class (String)
   * @return void
   */
  this.setBodyClass = function(css_class)
  {
    m_body_class = css_class;
  };

  /*
   * @name   setRowHeaderClass
   * @desc   Sets the name of the CSS class that will be given to the SortableTable row header (tr tag)
   * @scope  privileged
   * @param  css_class (String)
   * @return void
   */
  this.setRowHeaderClass = function(css_class)
  {
    m_row_header_class = css_class;
  };

  /*
   * @name   setColHeaderClass
   * @desc   Sets the name of the CSS class that will be given to the SortableTable col header (th tag)
   * @scope  privileged
   * @param  css_class (String)
   * @return void
   */
  this.setColHeaderClass = function(css_class)
  {
    m_col_header_class = css_class;
  };

  /*
   * @name   setRowHighlightClass
   * @desc   Sets the name of the CSS class that will be given to the SortableTable highlighted rows (tr tag)
   * @scope  privileged
   * @param  css_class (String)
   * @return void
   */
  this.setRowHighlightClass = function(css_class)
  {
    m_row_highlight_class = css_class;
  };

  /*
   * @name   setRowSelectedClass
   * @desc   Sets the name of the CSS class that will be given to the SortableTable selected rows (tr tag)
   * @scope  privileged
   * @param  css_class (String)
   * @return void
   */
  this.setRowSelectedClass = function(css_class)
  {
    m_row_selected_class = css_class;
  };

  /*
   * @name   setRowClass
   * @desc   Sets the name of the CSS class that will be given to the SortableTable rows (tr tag)
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
   * @desc   Sets the name of the CSS class that will be given to the SortableTable alternating rows (tr tag)
   * @scope  privileged
   * @param  css_class (String)
   * @return void
   */
  this.setRowAltClass = function(css_class)
  {
    m_row_alt_class = css_class;
  };

  /*
   * @name   setColClass
   * @desc   Sets the name of the CSS classes that will be given to the SortableTable columns (td tag)
   * @scope  privileged
   * @param  css_class (String)
   * @return void
   */
  this.setColClass = function(css_class)
  {
    try
    {
      m_col_class = [];

      for(var i = 0; i < css_class.length; i++)
      {
        m_col_class[i] = (typeof(css_class) === 'object') ? css_class[i] : css_class;
      }
    }
    catch(Throwable)
    {

    }
  };

  /*
   * @name   setColumnDisplay
   * @desc   Allows for a particular selection of columns to be made visible
   * @scope  privileged
   * @param  col_indexes - An integer Array containing the indicies of which columns should be visible (zero-indexed)
   * @return void
   */
  this.setColumnDisplay = function(col_indexes)
  {
    if(m_dom !== null)
    {
      var table_rows = m_dom.getElementsByTagName('tr');
      var cols = table_rows[0].childNodes.length;
      if(col_indexes !== null)
      {
        m_col_display = [];
      }

      for(var i = 0; i < cols; i++)
      {
        m_col_display[i] = 'none';
      }//Initialize all columns as invisible

      if(col_indexes !== null)
      {
        for(var j = 0; j < col_indexes.length; j++)
        {
          m_col_display[col_indexes[j]] = '';
        }//Set visible columns
      }

      for(var k = 0; k < table_rows.length; k++)
      {
        var row = table_rows[k];

        for(var l = 0; l < m_col_display.length; l++)
        {
          row.childNodes[l].style.display = (m_col_display.length === 0) ? '' : m_col_display[l];
        }
      }//Set column visibility levels
    }
  };

  /*
   * @name   setColumnOrder
   * @desc   Allows for the order of the columns to be switched (always relative to original DataSet)
   * @scope  privileged
   * @param  order - An integer Array containing the indicies for the new column order
   * @return void
   */
  this.setColumnOrder = function(order)
  {
    if(m_dom !== null)
    {
      var table_rows = m_dom.getElementsByTagName('tr');
      var table_cols = [];
      var rows = table_rows.length;
      var size = 0;
      var cols = 0;

      for(var i = 0; i < rows; i++)
      {
        var temp = table_rows[i].childNodes;
        var len = temp.length;

        for(var j = 0; j < len; j++)
        {
          table_cols.push(table_rows[i].removeChild(temp[0]));
        }
      }

      size = table_cols.length;
      cols = (rows === 0) ? 0 : size/rows;

      for(var k = 0; k < cols; k++)
      {
        var l = -1;

        if(m_col_order.length !== 0)
        {
          for(l = 0; l < cols; l++)
          {
            if(m_col_order[l] === order[k])
            {
              break;
            }
          }
        }

        for(var m = 0; m < rows; m++)
        {
          var loc = (l === -1) ? (order[k] + cols*m) : (l + cols*m);
          table_rows[m].appendChild(table_cols[loc]);
        }
      }

      m_col_order = order;
      this.setColumnDisplay(null);
    }
  };

  /*
   * @name   construct
   * @desc   Constructs the SortableTable as DOM (according to HTML Structure)
   * @scope  privileged
   * @param  data_set (DataSet Object)
   * @return DOMElement on success; null otherwise
   */
  this.construct = function(data_set)
  {
    purgeEvents();
    m_last_sort_col_num = null;
    m_sort_style = null;

    var data = data_set.getData();
    var div = document.createElement('div');
    var table = document.createElement('table');
    var thead = document.createElement('thead');
    var tbody = document.createElement('tbody');
    var row_header = document.createElement('tr');

    div.appendChild(table);
    table.appendChild(thead);
    table.appendChild(tbody);
    thead.appendChild(row_header);

    div.id = m_container_id;
    div.className = m_container_class;
    div.style.overflow = 'auto';
    div.style.margin = 0;
    div.style.padding = 0;

    try
    {
      div.attachEvent('onscroll', scrollFix);
      tbody.style.overflow = 'hidden';
    }//IE Fixes
    catch(Throwable)
    {
      div.style.overflow = 'hidden';
      div.style.overflowX = 'auto';
      tbody.style.overflowY = 'auto';
      tbody.style.overflowX = 'hidden';
    }//FF Fixes

    table.id = m_table_id;
    table.className = m_table_class;
    table.style.width = '100%';
    table.cellSpacing = 0;
    table.cellPadding = 0;

    tbody.className = m_body_class;

    for(var i = 0; i < data[0].length; i++)
    {
      var hcol = document.createElement('th');
      hcol.className = m_col_header_class;
      hcol.style.position = 'relative';
      hcol.style.display = (m_col_display.length > i) ? m_col_display[i] : '';
      hcol.innerHTML = data[0][i];

      try
      {
        hcol.addEventListener('click', sortCol, false);
      }
      catch(Throwable)
      {
        hcol.attachEvent('onclick', sortCol);
      }

      row_header.appendChild(hcol);
    }
    row_header.className = m_row_header_class;

    for(i = 1; i < data.length; i++)
    {
      var row = document.createElement('tr');
      row.className = (i % 2 === 0) ? m_row_alt_class : m_row_class;

      for(var j = 0; j < data[i].length; j++)
      {
        var col = document.createElement('td');
        col.className = m_col_class[j];
        col.style.display = (m_col_display.length > j) ? m_col_display[j] : '';
        col.innerHTML = data[i][j];
        row.appendChild(col);
      }

      m_event_types = [];
      for(var k = 0; k < m_row_events.length; k++)
      {
        var exists = false;

        for(var l = 0; l < m_event_types.length; l++)
        {
          if(m_row_events[k][0] === m_event_types[l])
          {
            exists = true;
            break;
          }//type exists
        }

        if(!exists)
        {
          m_event_types.push(m_row_events[k][0]);

          try
          {
            row.addEventListener(m_row_events[k][0], eventQueue, false);
          }
          catch(Throwable)
          {
            row.attachEvent('on' + m_row_events[k][0], eventQueue);
          }
        }//add type, and a listener
      }//One Listener Per Type

      tbody.appendChild(row);
    }

    m_dom = div;
    return m_dom;
  };

  /*
   * @name   destruct
   * @desc   Frees Memory associated with the SortableTable Object
   * @scope  privileged
   * @return void
   */
  this.destruct = function()
  {
    purgeEvents();
    m_dom = null;
  };

  this.addRowListener('click', selectRow, false);
  this.addRowListener('mouseover', highlightRow, false);
  this.addRowListener('mouseout', restoreRow, false);
}