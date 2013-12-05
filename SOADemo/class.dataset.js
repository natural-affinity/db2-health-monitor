/*
 * @project DataSet JavaScript Class
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
 * @name  DataSet
 * @desc  Construct a set of arrays to represent tablular data by
 *        Appending rows of data to the set 
 * @note  Be sure that the first row is the column names
 * @note  Be sure that each row has the same number of columns
 */
function DataSet()
{
	/* 
	 * @name   m_data
	 * @desc   The tabular data in an array format
	 * @scope  private
	 */
	var m_data = [];
	
	/*
	 * @name   indexCheck
	 * @desc   Ensure that the dataset has the row at the specified index
	 * @scope  private
	 * @param  position - an integer indicating the row to remove
	 * @return boolean  - true if the position is within the acceptable range
	 */  
	 function indexCheck(position)
	 {
		 return ((position < m_data.length) ? true : false);
	 }
	
	/*
	 * @name   typeCheck
	 * @desc   Ensure that an Array type has been passed in
	 * @scope  private
	 * @param  col_array - array of column data to form a single row
	 * @return boolean   - true if correct type, false otherwise
	 */
	function typeCheck(col_array)
	{
		return ((typeof(col_array) === 'object') ? true : false);
	}
	
	/*
	 * @name   colCheck
	 * @desc   Ensure that each Data row has the same number of columns
	 * @scope  private
	 * @param  col_array - array of column data to form a single row
	 * @return boolean   - true if correct number of cols, false otherwise
	 */
	function colCheck(col_array)
	{
		if((m_data.length < 1) || ((m_data.length >= 1) && (col_array.length === m_data[0].length)))
		{
			return true;
		}
		else
		{
			return false;
		}
	}
	
	/*
	 * @name   getData
	 * @desc   Provides access to the actual data
	 * @scope  privileged
	 * @return Array   - the dataset array of string, row-based data
	 */
	this.getData = function()
	{
		return m_data;
	};
	
	/* 
	 * @name   addDataRow
	 * @desc   Add a new Row of Data to DataSet
	 * @scope  privileged
	 * @param  col_array - array of column data to form a single row
	 * @return boolean   - true if successfully added, false otherwise
	 */
	this.addDataRow = function(col_array)
	{
		if(typeCheck(col_array) && colCheck(col_array))
		{
			var old_length = m_data.length;
			var new_length = m_data.push(col_array);

			return ((new_length === old_length + 1) ? true : false);
		}
		else
		{
			return false;
		}
	};

	/*
	 * @name   removeDataRow
	 * @desc   Remove specified Row of Data
	 * @scope  privileged
	 * @param  position - an integer indicating the row to remove
	 * @return boolean  - true if successfully removed, false otherwise
	 */
	 this.removeDataRow = function(position)
	 {
		if(indexCheck(position))
		{
			m_data.splice(position,1);
			return true;
		}
		else
		{
			return false;	
		}	 
	 };
	 
	/*
	 * @name   removeAll
	 * @desc   Remove all Rows in the DataSet
	 * @scope  privileged
	 * @return void
	 */
	 this.removeAll = function()
	 {
		 m_data = [];
	 };
	  
	/*
	 * @name   serialize
	 * @desc   Return a string representation of the data
	 * @scope  privileged
	 * @return string
	 */
	 this.serialize = function()
	 {
		 var str = '';

		 for(var i = 0; i < m_data.length; i++)
		 {
			str += "[Row " + i + " - " + m_data[i].toString() + "]";	 
		 }

		 return str;
	 };
}