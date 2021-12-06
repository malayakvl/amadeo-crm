import '../styles/global.scss';
import { NextIntlProvider } from 'next-intl';
import type { AppProps } from 'next/app';
import { Provider } from 'next-auth/client';
import { Provider as ReduxProvider } from 'react-redux';
import store from '../app/store';
import { Alert } from '../components/services/Alert';
import Layout from '../components/layout/Layout';

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <ReduxProvider store={store}>
            <Provider
                // Provider options are not required but can be useful in situations where
                // you have a short session maxAge time. Shown here with default values.
                options={{
                    // Client Max Age controls how often the useSession in the client should
                    // contact the server to sync the session state. Value in seconds.
                    // e.g.
                    // * 0  - Disabled (always use cache value)
                    // * 60 - Sync session state with server if it's older than 60 seconds
                    clientMaxAge: 0,
                    // Keep Alive tells windows / tabs that are signed in to keep sending
                    // a keep alive request (which extends the current session expiry) to
                    // prevent sessions in open windows from expiring. Value in seconds.
                    //
                    // Note: If a session has expired when keep alive is triggered, all open
                    // windows / tabs will be updated to reflect the user is signed out.
                    keepAlive: 0
                }}
                session={pageProps.session}>
                <NextIntlProvider
                    // To achieve consistent date, time and number formatting
                    // across the app, you can define a set of global formats.
                    formats={{
                        dateTime: {
                            short: {
                                day: 'numeric',
                                month: 'short',
                                year: 'numeric'
                            }
                        }
                    }}
                    messages={pageProps.messages}
                    // Providing an explicit value for `now` ensures consistent formatting of
                    // relative values regardless of the server or client environment.
                    now={new Date(pageProps.now)}
                    // Also an explicit time zone is helpful to ensure dates render the
                    // same way on the client as on the server, which might be located
                    // in a different time zone.
                    timeZone="Europe/Paris">
                    <Layout>
                        <Alert />
                        <Component {...pageProps} />
                    </Layout>
                </NextIntlProvider>
            </Provider>
        </ReduxProvider>
    );
}

export default MyApp;
