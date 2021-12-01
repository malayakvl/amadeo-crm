import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faExclamationTriangle,
    faCheckCircle,
    faTimesCircle,
    faInfoCircle
} from '@fortawesome/free-solid-svg-icons';
import { alertService, AlertType } from '../../services';

export { Alert };

Alert.propTypes = {
    id: PropTypes.string,
    fade: PropTypes.bool
};

Alert.defaultProps = {
    id: 'default-alert',
    fade: true
};

function Alert({ id, fade }: { id: string; fade: boolean }) {
    const router = useRouter();
    const [alerts, setAlerts] = useState([]);
    // const t = useTranslations();
    useEffect(() => {
        // subscribe to new alert notifications
        const subscription = alertService.onAlert(id).subscribe((alert: any) => {
            // clear alerts when an empty alert is received
            if (!alert.message) {
                setAlerts((alerts) => {
                    // filter out alerts without 'keepAfterRouteChange' flag
                    const filteredAlerts = alerts.filter((x: any) => x.keepAfterRouteChange);

                    // set 'keepAfterRouteChange' flag to false on the rest
                    filteredAlerts.forEach((x: any) => delete x.keepAfterRouteChange);
                    return filteredAlerts;
                });
            } else {
                // add alert to array
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                setAlerts((alerts) => [...alerts, alert]);

                // auto close alert if required
                if (alert.autoClose) {
                    setTimeout(() => removeAlert(alert), 3000);
                }
            }
        });

        // clear alerts on location change
        const clearAlerts = () => {
            setTimeout(() => alertService.clear(id));
        };
        router.events.on('routeChangeStart', clearAlerts);

        // clean up function that runs when the component unmounts
        return () => {
            // unsubscribe to avoid memory leaks
            subscription.unsubscribe();
            router.events.off('routeChangeStart', clearAlerts);
        };
    }, []);

    const removeAlert = (alert: any) => {
        if (fade) {
            // fade out alert
            const alertWithFade = { ...alert, fade: true };
            setAlerts((alerts: any) => alerts.map((x: any) => (x === alert ? alertWithFade : x)));

            // remove alert after faded out
            setTimeout(() => {
                setAlerts((alerts) => alerts.filter((x) => x !== alertWithFade));
            }, 250);
        } else {
            // remove alert
            setAlerts((alerts) => alerts.filter((x) => x !== alert));
        }
    };

    const cssClasses = (alert: any) => {
        if (!alert) return;

        const classes = ['alert', 'alert-dismissable'];
        const alertTypeClass = {
            [AlertType.Success]: 'alert-success',
            [AlertType.Error]: 'alert-danger',
            [AlertType.Info]: 'alert-info',
            [AlertType.Warning]: 'alert-warning'
        };
        classes.push(alertTypeClass[alert.type]);
        if (alert.fade) {
            classes.push('fade');
        }

        return classes.join(' ');
    };

    if (!alerts.length) return null;

    return (
        <>
            {alerts.map((alert: any, index: number) => (
                <div key={index} className={cssClasses(alert)}>
                    <div className="flex p-3">
                        {alert.type === 'Success' && (
                            <FontAwesomeIcon
                                icon={faCheckCircle}
                                className="h-4 mt-0.5 flex items-center"
                            />
                        )}
                        {alert.type === 'Error' && (
                            <FontAwesomeIcon
                                icon={faTimesCircle}
                                className="h-4 mt-0.5 flex items-center"
                            />
                        )}
                        {alert.type === 'Info' && (
                            <FontAwesomeIcon
                                icon={faInfoCircle}
                                className="h-4 mt-0.5 flex items-center"
                            />
                        )}
                        {alert.type === 'Warning' && (
                            <FontAwesomeIcon
                                icon={faExclamationTriangle}
                                className="h-4 mt-0.5 flex items-center"
                            />
                        )}
                        <p
                            className="text-sm flex-grow ml-3"
                            dangerouslySetInnerHTML={{ __html: alert.message }}
                        />
                    </div>
                </div>
            ))}
        </>
    );
}
