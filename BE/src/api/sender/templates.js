import emailHtml from "./common-template.js";

const localeDefault = 'fr';
const frontUrl = process.env.APPLICATION_BASE_URL;

export const restoreEmail = async (email = '', link = '', locale = localeDefault) => {
  const { default: t } = await import(`../sender/${locale}.js`);

  return {
    subject: t['Reset your password'],
    body: emailHtml(t, `
    <p>${t['Hello']}</p>
    <p>${t['There was a request to change your password!']}</p>
    <p>
      ${t['Please click this link to change your password']}: <a href='${link}'>${link}</a>
    </p>
    <p>
      ${t['If you did not make this request, you can safely ignore this email']}
    </p>
    <p>
      ${t['See you soon']},
      <br>
      ${t['The Live Pro Shop Team']}
    </p>`)
  };
};

export const welcomeEmail = async (email = '', link = '', locale = localeDefault) => {
  const { default: t } = await import(`../sender/${locale}.js`);

  return {
    subject: t['Account Activation Required'],
    body: emailHtml(t, `
    <p>${t['Hi']}</p>
    <p>
      ${t['Verify yourself below to sign in to your Liveproshop.com account for']} ${email}
    </p>
    <p>
      ${t['Here’s the verification link']}: <a href='${link}'>${t['Click here']}</a>
    </p>
    <p>
      ${t["If you didn't request this verification link, you can safely ignore this email"]}.
    </p>
    <p>
      ${t['The Live Pro Shop Team']}
    </p>`)
  };
};

export const registerEmail = async (email = '', locale = localeDefault) => {
  const { default: t } = await import(`../sender/${locale}.js`);

  return {
    subject: t['Confirmation registration'],
    body: emailHtml(t, `
    <p>${t['Hello']}</p>
    <p>
      ${t['Thank you for joining Live Pro Shop']}. ${t['Your account has been created']}.
    </p>
    <p>
      ${t['To access your account and complete your profile, click on the link below']}: <a href='${frontUrl}'>${t['Click for confirmation']}</a>
    </p>
    <p>
      ${t['If you are having trouble logging into your account, contact us at']} info@liveproshop.com
    </p>
    <p>
      ${t['See you soon']},
      <br>
      ${t['The Live Pro Shop Team']}
    </p>`)
  };
};

export const supportEmail = async (email = '', locale = localeDefault) => {
  const { default: t } = await import(`../sender/${locale}.js`);

  return {
    subject: t['Proshop'],
    body: emailHtml(t, `
    <p>${t['Hi']}, ${email}!</p>
    <p>
      ${t['Your message has been sent to support!']}
    </p>`)
  };
};

export const supportFromEmail = async (email = '', message, locale = localeDefault) => {
  const { default: t } = await import(`../sender/${locale}.js`);

  return {
    subject: t['Support message from'] + ' ' + email,
    body: emailHtml(t, `
    <p>${t['Support message from']} ${email}!</p>
    <p>
      ${message}
    </p>`)
  };
};
export const unsubscriberFromEmail = async (email = '', message, locale = localeDefault) => {
  const { default: t } = await import(`../sender/${locale}.js`);
  
  return {
    subject: t['Unsubscriber message from'] + ' ' + email,
    body: emailHtml(t, `
    <p>${t['Unsubscribe message from']} ${email}!</p>
    <p>
      ${message}
    </p>`)
  };
};
