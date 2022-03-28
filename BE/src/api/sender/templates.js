const mediaStyles = `@media only screen and (max-width: 620px) {
  table[class=body] h1 {
    font-size: 28px !important;
    margin-bottom: 10px !important;
  }

  table[class=body] p,
table[class=body] ul,
table[class=body] ol,
table[class=body] td,
table[class=body] span,
table[class=body] a {
    font-size: 16px !important;
  }

  table[class=body] .wrapper,
table[class=body] .article {
    padding: 10px !important;
  }

  table[class=body] .content {
    padding: 0 !important;
  }

  table[class=body] .container {
    padding: 0 !important;
    width: 100% !important;
  }

  table[class=body] .main {
    border-left-width: 0 !important;
    border-radius: 0 !important;
    border-right-width: 0 !important;
  }

  table[class=body] .btn table {
    width: 100% !important;
  }

  table[class=body] .btn a {
    width: 100% !important;
  }

  table[class=body] .img-responsive {
    height: auto !important;
    max-width: 100% !important;
    width: auto !important;
  }
}
@media all {
  .ExternalClass {
    width: 100%;
  }

  .ExternalClass,
.ExternalClass p,
.ExternalClass span,
.ExternalClass font,
.ExternalClass td,
.ExternalClass div {
    line-height: 100%;
  }

  .apple-link a {
    color: inherit !important;
    font-family: inherit !important;
    font-size: inherit !important;
    font-weight: inherit !important;
    line-height: inherit !important;
    text-decoration: none !important;
  }

  .btn-primary table td:hover {
    background-color: #d5075d !important;
  }

  .btn-primary a:hover {
    background-color: #d5075d !important;
    border-color: #d5075d !important;
  }
}
`;
const frontUrl = process.env.APPLICATION_BASE_URL;

export const welcomeEmailHtml = (name = '', link = '', content = '') => `
<!doctype html>
<html>
  <head>
    <meta name="viewport" content="width=device-width">
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>Amadeo</title>
  <style>
    ${mediaStyles}
</style></head>
  <body class style="background-color: #eaebed; font-family: sans-serif; -webkit-font-smoothing: antialiased; font-size: 14px; line-height: 1.4; margin: 0; padding: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;">
    <table role="presentation" border="0" cellpadding="0" cellspacing="0" class="body" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; min-width: 100%; background-color: #eaebed; width: 100%;" width="100%" bgcolor="#eaebed">
      <tr>
        <td style="font-family: sans-serif; font-size: 14px; vertical-align: top;" valign="top">&nbsp;</td>
        <td class="container" style="font-family: sans-serif; font-size: 14px; vertical-align: top; display: block; max-width: 580px; padding: 10px; width: 580px; Margin: 0 auto;" width="580" valign="top">
          <div class="header" style="padding: 20px 0;">
            <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; min-width: 100%; width: 100%;">
              <tr>
                <td class="align-center" width="100%" style="font-family: sans-serif; font-size: 14px; vertical-align: top; text-align: center;" valign="top" align="center">
                  <a href="${frontUrl}" style="color: #ec0867; text-decoration: underline;">
                    <img src="https://cdn.postdrop.io/starter-templates-v0/postdrop-logo-dark.png" height="40" alt="Proshop" style="border: none; -ms-interpolation-mode: bicubic; max-width: 100%;">
                  </a>
                </td>
              </tr>
            </table>
          </div>
          <div class="content" style="box-sizing: border-box; display: block; Margin: 0 auto; max-width: 580px; padding: 10px;">

            <!-- START CENTERED WHITE CONTAINER -->
            <span class="preheader" style="color: transparent; display: none; height: 0; max-height: 0; max-width: 0; opacity: 0; overflow: hidden; mso-hide: all; visibility: hidden; width: 0;">
                    This is preheader text. Some clients will show this text as a preview.
            </span>
            <table role="presentation" class="main" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; min-width: 100%; background: #ffffff; border-radius: 3px; width: 100%;" width="100%">

              <!-- START MAIN CONTENT AREA -->
              <tr>
                <td class="wrapper" style="font-family: sans-serif; font-size: 14px; vertical-align: top; box-sizing: border-box; padding: 20px;" valign="top">
                  <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; min-width: 100%; width: 100%;" width="100%">
                    <tr>
                      <td style="font-family: sans-serif; font-size: 14px; vertical-align: top;" valign="top">
                        <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; margin-bottom: 15px;">👋&nbsp; Welcome at Proshop, ${name}!</p>
                        <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; margin-bottom: 15px;">✨&nbsp; Here’s the verification link - <a href='${link}'>${link}</a>.<p>Please, complete the registration via this link</p>
                        <table role="presentation" border="0" cellpadding="0" cellspacing="0" class="btn btn-primary" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; min-width: 100%; box-sizing: border-box; width: 100%;" width="100%">
                          <tbody>
                            <tr>
                              <td align="center" style="font-family: sans-serif; font-size: 14px; vertical-align: top; padding-bottom: 15px;" valign="top">
                                <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; min-width: auto; width: auto;">
                                  <tbody>
                                    <tr>
                                      <td style="font-family: sans-serif; font-size: 14px; vertical-align: top; border-radius: 5px; text-align: center; background-color: #ec0867;" valign="top" align="center" bgcolor="#ec0867">
                                        <a href="${frontUrl}" target="_blank" style="border: solid 1px #ec0867; border-radius: 5px; box-sizing: border-box; cursor: pointer; display: inline-block; font-size: 14px; font-weight: bold; margin: 0; padding: 12px 25px; text-decoration: none; text-transform: capitalize; background-color: #ec0867; border-color: #ec0867; color: #ffffff;">
                                            Go To Proshop
                                        </a>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                        <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; margin-bottom: 15px;">💃&nbsp; That's it. Enjoy!!!.</p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>

            <!-- END MAIN CONTENT AREA -->
            </table>

            <!-- START FOOTER -->
            <div class="footer" style="clear: both; Margin-top: 10px; text-align: center; width: 100%;">
              <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; min-width: 100%; width: 100%;" width="100%">
                <tr>
                  <td class="content-block" style="font-family: sans-serif; vertical-align: top; padding-bottom: 10px; padding-top: 10px; color: #9a9ea6; font-size: 12px; text-align: center;" valign="top" align="center">
                    <span class="apple-link" style="color: #9a9ea6; font-size: 12px; text-align: center;">Regards, Proshop Team</span>
<!--                    <br> And <a href="https://postdrop.io" style="text-decoration: underline; color: #9a9ea6; font-size: 12px; text-align: center;">unsubscribe link</a> here.-->
                  </td>
                </tr>
                <tr>
                  <td class="content-block powered-by" style="font-family: sans-serif; vertical-align: top; padding-bottom: 10px; padding-top: 10px; color: #9a9ea6; font-size: 12px; text-align: center;" valign="top" align="center">
                    Powered by <a href="https://postdrop.io" style="color: #9a9ea6; font-size: 12px; text-align: center; text-decoration: none;">Amadeo Proshop</a>.
                  </td>
                </tr>
              </table>
            </div>
            <!-- END FOOTER -->

          <!-- END CENTERED WHITE CONTAINER -->
          </div>
        </td>
        <td style="font-family: sans-serif; font-size: 14px; vertical-align: top;" valign="top">&nbsp;</td>
      </tr>
    </table>
  </body>
</html>
`;

export const trialWelcomeEmailHtml = (logo = '', name = '', content = '') => `
<!DOCTYPE html>
<html>

<head>
    <title>Welcome to FuseGIS!</title>
</head>

<body>
    <img class="center" src="${logo}" alt="FuseGIS Logo">
    <p> Welcome trial, ${name},</p>
    <p>
        We are so glad to have you check out our FuseGIS map application. We think you’ll
        find it a timesaver in doing your research and analysis.
    </p>
    <p>
        And we are just getting started. Our team is hard at work preparing the next set of
        features and data layers we’d like to release to you to enrich your experience. We
        will also be providing training videos and tutorials to help you get the most out of
        your subscription with us. Stay tuned!
    </p>
    Click <a href="${content}">here</a> for activating your account!
    
</body>

</html>
`;

export const trialEndingEmailHtml = (logo = '', name = '') => `
<!DOCTYPE html>
<html>

<head>
    <title>Welcome to FuseGIS!</title>
    
</head>

<body>
    <img class="center" src="${logo}" alt="FuseGIS Logo">
    <p> Welcome trial, ${name},</p>
    <p>
        We are so glad to have you check out our FuseGIS map application. We think you’ll
        find it a timesaver in doing your research and analysis.
    </p>
</body>

</html>
`;

export const trialOneDayInEmailHtml = (logo = '', name = '') => `
<!DOCTYPE html>
<html>

<head>
    <title>Welcome to FuseGIS!</title>
</head>

<body>
    <img class="center" src="${logo}" alt="FuseGIS Logo">
    <p> Welcome trial, ${name},</p>
    <p>
        We are so glad to have you check out our FuseGIS map application. We think you’ll
        find it a timesaver in doing your research and analysis.
    </p>
    
</body>

</html>
`;

export const trialOneDayLeftEmailHtml = (logo = '', name = '') => `
<!DOCTYPE html>
<html>

<head>
    <title>Welcome to FuseGIS!</title>
</head>

<body>
    <img class="center" src="${logo}" alt="FuseGIS Logo">
    <p> Welcome trial, ${name},</p>
    <p>
        We are so glad to have you check out our FuseGIS map application. We think you’ll
        find it a timesaver in doing your research and analysis.
    </p>
    
</body>

</html>
`;

export const unsubscribeEmailHtml = (logo = '') => `
<!DOCTYPE html>
<html>

<head>
    <title>Sorry to see you go - FuseGIS</title>
</head>

<body>
    <div class="main">
        <img class="center" src="${logo}" alt="FuseGIS Logo">
        <br>
        <p>
            We received your <b>Unsubscribe</b> request and are sorry to see you go. We'd love to understand what was
            missing
            that would have kept you with us. Reply to this e-mail and we can see how we can meet your needs now or in
            the
            future.
        </p>
    </div>
</body>

</html>
`;

export const feedbackEmailHtml = (logo = '', name = '', content = '') => `
<!DOCTYPE html>
<html>

<head>
    <title>Your Feedback on FuseGIS</title>
</head>

<body>
    <div class="main">
        <img class="center" src="${logo}" alt="FuseGIS Logo">
        <br>
        <p> Hello, ${name},</p>
        <p> We received your feedack: </p>
        <p>
            <blockquote class="w3-panel w3-leftbar w3-light-grey">
                <span style="font-size:80px;line-height:0.6em;opacity:0.2">❝</span>
                <p>
                    ${content}
                </p>
            </blockquote>
        </p>
    </div>
</body>

</html>
`;

export const supportInformHtml = (action, user, content = '') => `
<!DOCTYPE html>
<html>

<head>
    <title>From FuseGIS - ${user.email} ${action} </title>
    
</head>
<body>
    <div class="main">
        <p> Hi, Team! <p>
        <p> <b> User: </b>  ${user.firstname} ${user.lastname}</p>
        <p> <b> User ID: </b>  ${user.id}</p>
        <p> <b> Email: </b> <a class="email" href="mailto:${user.email}">${user.email}</a></p>
        <p> <b> Role: </b> ${user.role} </p>
        <p> <b> MSAs: </b> ${user.msas} </p>
        <br>
        <p><b> ${action} </b></p>
        <p> ${content} </p>
    </div>
</body>

</html>
`;
