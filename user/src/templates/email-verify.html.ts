import {commonConstants} from "../constants/commonConstants";

const emailVerify = (token) => {

    return (
        '<html xmlns="http://www.w3.org/1999/xhtml">' +
        "" +
        "<head>" +
        '  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />' +
        '  <meta name="viewport" content="width=device-width" />' +
        "  <style>" +
        "    * {" +
        "      margin: 0;" +
        "      padding: 0;" +
        "      font-size: 100%;" +
        '      font-family: "merriweather", "Helvetica Neue", "Helvetica", Helvetica, Arial, sans-serif;' +
        "      line-height: 1.3;" +
        "    }" +
        "    " +
        "    img {" +
        "      max-width: 100%;" +
        "      margin: 0 auto;" +
        "      display: block;" +
        "    }" +
        "    " +
        "    body," +
        "    .body-wrap {" +
        "      width: 100% !important;" +
        "      height: 100%;" +
        "      color: #fff;" +
        "      background: #fff;" +
        "    }" +
        "    " +
        "    a {" +
        "      text-decoration: none;" +
        "      color: #71bc37 !important;" +
        "    }" +
        "    " +
        "    a:hover {" +
        "      text-decoration: underline;" +
        "    }" +
        "    " +
        "    .text-center {" +
        "      text-align: center;" +
        "    }" +
        "    " +
        "    .text-right {" +
        "      text-align: right;" +
        "    }" +
        "    " +
        "    .text-left {" +
        "      text-align: left;" +
        "    }" +
        "    " +
        "    .button {" +
        "      display: inline-block;" +
        "      color: white;" +
        "      background: #71bc37;" +
        "      border: solid #71bc37;" +
        "      border-width: 10px 20px 8px;" +
        "      font-weight: bold;" +
        "      border-radius: 4px;" +
        "    }" +
        "    " +
        "    .button:hover {" +
        "      text-decoration: none;" +
        "    }" +
        "    " +
        "    h1," +
        "    h2," +
        "    h3," +
        "    h4," +
        "    h5," +
        "    h6 {" +
        "      margin-bottom: 20px;" +
        "      line-height: 1.25;" +
        "    }" +
        "    " +
        "    h1 {" +
        "      font-size: 32px;" +
        "    }" +
        "    " +
        "    h2 {" +
        "      font-size: 28px;" +
        "      text-align: center;" +
        "      border-bottom: 1px solid #000;" +
        "      padding-bottom: 12px;" +
        "    }" +
        "    " +
        "    h3 {" +
        "      font-size: 24px;" +
        "    }" +
        "    " +
        "    h4 {" +
        "      font-size: 20px;" +
        "    }" +
        "    " +
        "    h5 {" +
        "      font-size: 16px;" +
        "    }" +
        "    " +
        "    p," +
        "    ul," +
        "    ol {" +
        "      font-size: 16px;" +
        "      font-weight: normal;" +
        "      margin-bottom: 20px;" +
        "    }" +
        "    " +
        "    p {" +
        "      text-align: center;" +
        "    }" +
        "    " +
        "    .container {" +
        "      display: block !important;" +
        "      clear: both !important;" +
        "      margin: 0 auto !important;" +
        "      max-width: 580px !important;" +
        "    }" +
        "    " +
        "    .container table {" +
        "      width: 100% !important;" +
        "      border-collapse: collapse;" +
        "    }" +
        "    " +
        "    .container .masthead {" +
        "      padding: 17px 0;" +
        "      background: #4867AA;" +
        "      color: white;" +
        "    }" +
        "    " +
        "    .container .master-success {" +
        "      padding: 180px 0 20px;" +
        "    }" +
        "    " +
        "    .container .masthead h1 {" +
        "      margin: 0 auto !important;" +
        "      max-width: 90%;" +
        "      text-transform: uppercase;" +
        "    }" +
        "    " +
        "    .container .content {" +
        "      background: #4867AA;" +
        "      padding: 30px 35px;" +
        "    }" +
        "    " +
        "    .container .content.footer {" +
        "      background: none;" +
        "    }" +
        "    " +
        "    .container .content.footer p {" +
        "      margin-bottom: 0;" +
        "      color: #888;" +
        "      text-align: center;" +
        "      font-size: 14px;" +
        "    }" +
        "    " +
        "    .container .content.footer a {" +
        "      color: #888;" +
        "      text-decoration: none;" +
        "      font-weight: bold;" +
        "    }" +
        "    " +
        "    .container .content.footer a:hover {" +
        "      text-decoration: underline;" +
        "    }" +
        "  </style>" +
        "</head>" +
        "" +
        "<body>" +
        '  <table class="body-wrap">' +
        "    <tr>" +
        '      <td class="container">' +
        "        <table>" +
        "          <tr>" +
        '            <td align="center" class="masthead" style=" padding: 17px 0;background: #4867AA;">' +
        `              <h1><img src="${process.env.SERVER_URL}${commonConstants.TEAM_NAME}" alt="${commonConstants.TEAM_NAME}"></h1>` +
        "            </td>" +
        "          </tr>" +
        "          <tr>" +
        '            <td class="content">' +
        `              <h2 style="font-size: 28px; text-align: center; border-bottom: 1px solid #fff; padding-bottom: 12px;">Verify Your Email</h2>` +
        `              <p>Please <a href="${process.env.BASE_URL}/reset-password-basic/${token}">click here</a> to verify your email and reset your password.</p>` +
        `              <p>Your ${commonConstants.TEAM_NAME} team</p>` +
        "            </td>" +
        "          </tr>" +
        "        </table>" +
        "      </td>" +
        "    </tr>" +
        "  </table>" +
        "</body>" +
        "" +
        "</html>")

}
export default emailVerify;
