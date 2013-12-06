<?php

/**
 * @project PHP DBRender Class
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
 * Acts as a unified implementation for all Web Service functions.
 */

require_once('../producer_db/class.db.error.php');         /** Requires the DBError Class */
require_once('../producer_db/class.db.worker.connection.php'); /** Requires the DBConnection Class */
require_once('../producer_db/class.db.worker.query.php');      /** Requires the DBQuery Class */

/**
 * The centralized mechanism through which Web Service function inputs are received and validated,
 * connections are established and freed, queries are built and excuted, and results are returned.
 * It serves as a single backend implementation for all of the exposed web service functions.
 * @static
 * @package DB2HealthMonitor
 * @subpackage WebServiceProducerDB
 */
class DBRender
{
  /**
   * A regular expression used to scan database parameters for invalid/too many characters
   * @var string
   */
  const REGEX_DATABASE_PARAMETER = '/^[a-zA-Z0-9_]{0,30}$/';

  /**
   * A regular expression used to scan the database port parameter for invalid/too many characters
   * @var string
   */
   const REGEX_PORT_PARAMETER = '/^[0-9]{0,5}$/';

  /**
   * A regular expression used to scan for the allowable language code format
   * @var string
   */
  const REGEX_LANGUAGE_CODE = '/^[a-zA-Z]{2}_[a-zA-Z]{2}$/';

  /**
   * A regular expression used to scan for the allowable object type flags used for query parameter selection
   * @var string
   */
  const REGEX_OBJECT_TYPE = '/^(all|instance|database|container|tablespace)$/';

  /**
   * Validates all Web Service Function input, and developer inputs.
   * @access private
   * @param string $user username used to access the database
   * @param string $pass password that corresponds with the above username
   * @param string $db the name of the database to connect to
   * @param string $port the port number under which the database resides
   * @param boolean $def the definition request flag used to build the query
   * @param boolean $det the details request flag used to build the query
   * @param boolean $his the history request flag used to build the query
   * @param string $lang the language code used to build the query
   * @param string $type the type flag used to select the appropriate query and parameters
   * @return mixed (true on success; {@link DBError} object on failure)
   */
  private static function DBValidate($user, $pass, $db, $port, $def, $det, $his, $lang, $type)
  {
    //Database Username Validation
    if(!preg_match(self::REGEX_DATABASE_PARAMETER, $user))
      return new DBError(DBError::DB_USERNAME_PARAM_ERROR_CD, DBError::DB_USERNAME_PARAM_ERROR_MSG, null, null);

    //Database Password Validation
    if(!preg_match(self::REGEX_DATABASE_PARAMETER, $pass))
      return new DBError(DBError::DB_PASSWORD_PARAM_ERROR_CD, DBError::DB_PASSWORD_PARAM_ERROR_MSG, null, null);

    //Database Name Validation
    if(!preg_match(self::REGEX_DATABASE_PARAMETER, $db))
      return new DBError(DBError::DB_DATABASE_PARAM_ERROR_CD, DBError::DB_DATABASE_PARAM_ERROR_MSG, null, null);

    //Database Port Validation
    if(!preg_match(self::REGEX_PORT_PARAMETER, $port))
      return new DBError(DBError::DB_PORT_PARAM_ERROR_CD, DBError::DB_PORT_PARAM_ERROR_MSG, null, null);

    //Database Language Code Validation
    if(!preg_match(self::REGEX_LANGUAGE_CODE, $lang))
      return new DBError(DBError::DB_LANGUAGE_PARAM_ERROR_CD, DBError::DB_LANGUAGE_PARAM_ERROR_MSG, null, null);

    //Object Type Parameter Validation
    if(!preg_match(self::REGEX_OBJECT_TYPE, $type))
      return new DBError(DBError::DB_OBJTYPE_PARAM_ERROR_CD, DBError::DB_OBJTYPE_PARAM_ERROR_MSG, null, null);

    //Definition Flag Validation
    if(gettype($def) != 'boolean')
      return new DBError(DBError::DB_DEFFLAG_PARAM_ERROR_CD,DBError::DB_DEFFLAG_PARAM_ERROR_MSG, null, null);

    //Details Flag Validation
    if(gettype($det) != 'boolean')
      return new DBError(DBError::DB_DETFLAG_PARAM_ERROR_CD, DBError::DB_DETFLAG_PARAM_ERROR_MSG, null, null);

    //History Flag Validation
    if(gettype($his) != 'boolean')
      return new DBError(DBError::DB_HISFLAG_PARAM_ERROR_CD, DBError::DB_HISFLAG_PARAM_ERROR_MSG, null, null);

    return true;
  }

  /**
   * Utilizes the {@link DBConnectionWorker} and the {@link DBQueryWorker} classes, along with input validation
   * mechanisms, to obtain an XML representation of the DB2 Health Report.
   * @access public
   * @param string $user username used to access the database
   * @param string $pass password that corresponds with the above username
   * @param string $db the name of the database to connect to
   * @param string $port the port number under which the database resides
   * @param boolean $def the definition request flag used to build the query
   * @param boolean $det the details request flag used to build the query
   * @param boolean $his the history request flag used to build the query
   * @param string $lang the language code used to build the query
   * @param string $type the type flag used to select the appropriate query and parameters
   * @return string
   */
  public static function DBReport($user, $pass, $db, $port, $def, $det, $his, $lang, $type)
  {
    $xml = '';
    $sql = '';
    $connection = null;

    //Validate all input parameters
    $result = self::DBValidate($user, $pass, $db, $port, $def, $det, $his, $lang, $type);

    //Build the appropriate query and establish a database connection
    if(!($result instanceof DBError))
    {
      $sql = ($type == 'all')
            ? DBQueryWorker::DBXQueryAssembleAll($db, $lang, $def, $det, $his)
            : DBQueryWorker::DBXQueryAssembleType($db, $lang, $def, $det, $his, $type);

      $result = DBConnectionWorker::DBConnect($user, $pass, $db, $port);
    }

    //Execute a DB2 Stored Procedure to prepare the data for the XQUERY to follow
    if(!($result instanceof DBError))
    {
      $connection = $result;
      $result = DBQueryWorker::DBQuerySize($connection);
    }

    //Prepare and Execute the desired Query
    if(!($result instanceof DBError))
    {
      $result = DBQueryWorker::DBXQuery($connection, $sql);
    }

    //Store the Result if the Query was successful
    if(!($result instanceof DBError))
    {
      $xml = $result;
    }
    else
    {
      $xml = $result->__toString();
      $result->logError($xml);
    }

    //Close the Database Connection
    DBConnectionWorker::DBClose($connection);

    return $xml;
  }
}

?>