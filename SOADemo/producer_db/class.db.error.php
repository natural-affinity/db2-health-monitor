<?php

/**
 * @project PHP DBError Class
 * @author Rizwan Tejpar <rtejpar@ca.ibm.com>
 * @version 1.0
 * @updated 07/22/07
 * @verified 07/22/07 (Zend Studio)
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
 * @package DB2HealthMonitorSample
 * @subpackage WebServiceProducerDB
 */

/**
 * A compact representation of an error that occurs in the Web Service Producer DB package.
 * Stores a set of constants that represent the possible error codes/messages that could arise.
 * @package DB2HealthMonitorSample
 * @subpackage WebServiceProducerDB
 */
class DBError
{
  /**
   * Stores the SOA_ERROR_CODE (Application Specific)
   * @access private
   * @var integer
   */
  private $m_soa_error_code;

  /**
   * Stores the SQL_ERROR_CODE (DB2 Specific)
   * @access private
   * @var integer
   */
  private $m_sql_error_code;

  /**
   * Stores the SOA_ERROR_MESSAGE (Application Specific)
   * @access private
   * @var string
   */
  private $m_soa_error_message;

  /**
   * Stores the SQL_ERROR_MESSAGE (DB2 Specific)
   * @access private
   * @var string
   */
  private $m_sql_error_message;

  /**
   * Stores the Timestamp representing when the error occurred
   * @access private
   * @var string
   */
  private $m_timestamp;

  /**
   * The error code for indicating that everything was processed successfully
   * @var integer
   */
  const DB_SUCCESS_ERROR_CD = 0;

  /**
   * The error code for invalid characters contained in the username
   * @var integer
   */
  const DB_USERNAME_PARAM_ERROR_CD = 100;

  /**
   * The error code for invalid characters contained in the password
   * @var integer
   */
  const DB_PASSWORD_PARAM_ERROR_CD = 101;

  /**
   * The error code for invalid characters contained in the database name
   * @var integer
   */
  const DB_DATABASE_PARAM_ERROR_CD = 102;

  /**
   * The error code for invalid characters contained in the port number
   * @var integer
   */
  const DB_PORT_PARAM_ERROR_CD = 103;

  /**
   * The error code for invalid characters contained in the language code
   * @var integer
   */
  const DB_LANGUAGE_PARAM_ERROR_CD = 104;

  /**
   * The error code for indicating an invalid object type has been set by the developer
   * @var integer
   */
  const DB_OBJTYPE_PARAM_ERROR_CD = 105;

  /**
   * The error code for indicating an invalid definition flag has been set by the developer
   * @var integer
   */
  const DB_DEFFLAG_PARAM_ERROR_CD = 106;

  /**
   * The error code for indicating an invalid details flag has been set by the developer
   * @var integer
   */
  const DB_DETFLAG_PARAM_ERROR_CD = 107;

  /**
   * The error code for indicating an invalid history flag has been set by the developer
   * @var integer
   */
  const DB_HISFLAG_PARAM_ERROR_CD = 108;

  /**
   * The error code for indicating database connection failure
   * @var integer
   */
  const DB_CONNECTION_ERROR_CD = 109;

  /**
   * The error code for indicating the database query could not be prepared
   * @var integer
   */
  const DB_QUERY_PREPARE_ERROR_CD = 110;

  /**
   * The error code for indicating the database query failed to execute
   * @var integer
   */
  const DB_QUERY_EXECUTION_ERROR_CD = 111;

  /**
   * The error message corresponding to DB_SUCCESS_ERROR_CD
   * @see DB_SUCCESS_ERROR_CD
   * @var string
   */
  const DB_SUCCESS_ERROR_MSG = 'The request was processed successfully';

  /**
   * The error message corresponding to DB_USERNAME_PARAM_ERROR_CD
   * @see DB_USERNAME_PARAM_ERROR_CD
   * @var string
   */
  const DB_USERNAME_PARAM_ERROR_MSG = 'Invalid Username Input Detected; Please check the entered username';

  /**
   * The error message corresponding to DB_PASSWORD_PARAM_ERROR_CD
   * @see DB_PASSWORD_PARAM_ERROR_CD
   * @var string
   */
  const DB_PASSWORD_PARAM_ERROR_MSG = 'Invalid Password Input Detected; Please check the entered password';

  /**
   * The error message corresponding to DB_DATABASE_PARAM_ERROR_CD
   * @see DB_DATABASE_PARAM_ERROR_CD
   * @var string
   */
  const DB_DATABASE_PARAM_ERROR_MSG = 'Invalid Database Name Input Detected; Please check the entered database name';

  /**
   * The error message corresponding to DB_PORT_PARAM_ERROR_CD
   * @see DB_PORT_PARAM_ERROR_CD
   * @var string
   */
  const DB_PORT_PARAM_ERROR_MSG = 'Invalid Port Number Input Detected; Please check the entered port number';

  /**
   * The error message corresponding to DB_LANGUAGE_PARAM_ERROR_CD
   * @see DB_LANGUAGE_PARAM_ERROR_CD
   * @var string
   */
  const DB_LANGUAGE_PARAM_ERROR_MSG = 'Invalid Language Code Input Detected; Please check the entered language code';

  /**
   * The error message corresponding to DB_OBJTYPE_PARAM_ERROR_CD
   * @see DB_OBJTYPE_PARAM_ERROR_CD
   * @var string
   */
  const DB_OBJTYPE_PARAM_ERROR_MSG = 'Invalid Object Type Input Detected; Please contact the Web Service Administrator';

  /**
   * The error message corresponding to DB_DEFFLAG_PARAM_ERROR_CD
   * @see DB_DEFFLAG_PARAM_ERROR_CD
   * @var string
   */
  const DB_DEFFLAG_PARAM_ERROR_MSG = 'Invalid Health Definition Request Detected; Please check the entered definition request';

  /**
   * The error message corresponding to DB_DETFLAG_PARAM_ERROR_CD
   * @see DB_DETFLAG_PARAM_ERROR_CD
   * @var string
   */
  const DB_DETFLAG_PARAM_ERROR_MSG = 'Invalid Health Detail Request Detected; Please contact the Web service administrator';

  /**
   * The error message corresponding to DB_HISFLAG_PARAM_ERROR_CD
   * @see DB_HISFLAG_PARAM_ERROR_CD
   * @var string
   */
  const DB_HISFLAG_PARAM_ERROR_MSG = 'Invalid Health History Request Detected; Please constact the Web service administator';

  /**
   * The error message corresponding to DB_CONNECTION_ERROR_CD
   * @see DB_CONNECTION_ERROR_CD
   * @var string
   */
  const DB_CONNECTION_ERROR_MSG = 'Could not establish a connection to the specified Database';

  /**
   * The error message corresponding to DB_QUERY_PREPARE_ERROR_CD
   * @see DB_QUERY_PREPARE_ERROR_CD
   * @var string
   */
  const DB_QUERY_PREPARE_ERROR_MSG = 'Failed to Prepare DB2 Query Statement; Please check query statement for errors';

  /**
   * The error message corresponding to DB_QUERY_EXECUTION_ERROR_CD
   * @see DB_QUERY_EXECUTION_ERROR_CD
   * @var string
   */
  const DB_QUERY_EXECUTION_ERROR_MSG = 'Failed to Execute Desired Query Statement';

  /**
   * The name and relative path of the Web Service Producer DB error log
   * @var string
   */
  const DB_ERROR_LOG_FILE_NM = './healthmon_error.log';

  /**
   * DBError Constructor
   * Sets up {@link $m_soa_error_code}
   * Sets up {@link $m_soa_error_message}
   * Sets up {@link $m_sql_error_code}
   * Sets up {@link $m_sql_error_message}
   * Sets up {@link $m_timestamp}
   * @param integer $soa_error_code The SOA application error code for the Web Service Producer DB
   * @param string $soa_error_message The SOA application error message for the Web Service Producer DB
   * @param integer $sql_error_code The DB2 error code for the Web Service Producer DB
   * @param string $sql_error_message The DB2 error code for the Web Service Producer DB
   */
  public function __construct($soa_error_code, $soa_error_message, $sql_error_code, $sql_error_message)
  {
    $this->m_soa_error_code = $soa_error_code;
    $this->m_soa_error_message = $soa_error_message;
    $this->m_sql_error_code = $sql_error_code;
    $this->m_sql_error_message = $sql_error_message;
    $this->m_timestamp = date('Y-m-d').'T'.date('h:i:s');
  }

  /**
   * Frees any memory associated with the ClientError Object
   */
  public function __destruct()
  {
  }

  /**
   * Returns the SOA application error code {@link $m_soa_error_code}
   * @return integer
   */
  public function getSOACode()
  {
    return $this->m_soa_error_code;
  }

  /**
   * Returns the DB2 (SQLSTATE) error code {@link $m_sql_error_code}
   * @return integer
   */
  public function getSQLCode()
  {
    return $this->m_sql_error_code;
  }

  /**
   * Returns the SOA application error message {@link $m_soa_error_message}
   * @return string
   */
  public function getSOAMessage()
  {
    return $this->m_soa_error_message;
  }

  /**
   * Returns the DB2 (SQLSTATE) error message {@link $m_sql_error_message}
   * @return string
   */
  public function getSQLMessage()
  {
    return $this->m_sql_error_message;
  }

  /**
   * Returns the timestamp representing the time at which the error occurred {@link $m_timestamp}
   * @return string
   */
  public function getTimestamp()
  {
    return $this->m_timestamp;
  }

  /**
   * Returns an XML string representation of the DBError Object (conforms to WSDL/XSD)
   * Appends the appropriate DB2/SQLSATE error code and message where applicable
   * @return string
   */
  public function __toString()
  {
    $error = '<DB2Health_Report schemaVersion="1.0" highestAlertState="unknown" ';
    $error .= 'timestamp="'.$this->m_timestamp.'">';
    $error .= '<InfoSet /><HIDefinitionSet /><AlertSet />';
    $error .= '<ErrorSet>';
    $error .= '<SOA_ERROR_CODE>'.$this->m_soa_error_code.'</SOA_ERROR_CODE>';
    $error .= '<SOA_ERROR_MESSAGE>'.$this->m_soa_error_message.'</SOA_ERROR_MESSAGE>';

    if(!is_null($this->m_sql_error_code) && !empty($this->m_soa_error_code))
    {
      $error .= '<SQL_ERROR_CODE>'.$this->m_sql_error_code.'</SQL_ERROR_CODE>';
      $error .= '<SQL_ERROR_MESSAGE>'.$this->m_sql_error_message.'</SQL_ERROR_MESSAGE>';
    }

    $error .= '</ErrorSet>';
    $error .= '</DB2Health_Report>';

    return $error;
  }

  /**
   * Logs the string representation of the DBError Object to disk
   * @see DB_ERROR_LOG_FILE_NM
   * @param string $error Any string representation of the error
   * @return void
   */
  public function logError($error)
  {
    error_log($error."\r\n", 3, self::DB_ERROR_LOG_FILE_NM);
  }
}

?>