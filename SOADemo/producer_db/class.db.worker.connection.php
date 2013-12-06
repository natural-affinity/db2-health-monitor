<?php

/**
 * @project PHP DBConnectionWorker Class
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
 * A class that provides database connection and is able to free the connection when it is not longer needed.
 * @static
 * @package DB2HealthMonitorSample
 * @subpackage WebServiceProducerDB
 */
class DBConnectionWorker
{
  /**
   * Attempts to establish a connection to the specified DB2 database
   * @access public
   * @param string $username the username to use for connecting to the database
   * @param string $password the password that corresponds to the above username
   * @param string $database the name of the database to which a connection will be established
   * @param string $port the port number under which the database resides
   * @return mixed (db2 connection resource on success; {@link DBError} object on failure)
   */
  public static function DBConnect($username, $password, $database, $port)
  {
    //Attempt to establish a connection to the DB2 database (Assume Cataloged)
    $connection = db2_pconnect($database, $username, $password);

    //Attempt to establish a connection to the DB2 database (Assume Uncataloged)
    if(!$connection)
    {
      $connection_string = "DRIVER={IBM DB2 ODBC DRIVER};DATABASE=$database;";
      $connection_string .= "HOSTNAME=localhost;PORT=$port;PROTOCOL=TCPIP;";
      $connection_string .= "UID=$username;PWD=$password";

      $connection = db2_pconnect($connection_string, '', '');
    }//Local Database Only

    //Ensure the connection succeeded
    if(!$connection)
    {
      return new DBError(DBError::DB_CONNECTION_ERROR_CD,DBError::DB_CONNECTION_ERROR_MSG,
                 db2_conn_error(), db2_conn_errormsg());
    }

    return $connection;
  }

  /**
   * Attempts to close the connection to the DB2 database
   * @access public
   * @param reference &$connection active connection to the DB2 database
   * @return void
   */
  public static function DBClose(&$connection)
  {
    if(!is_null($connection))
    {
      db2_close($connection);
    }
  }
}

?>