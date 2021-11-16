import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useTranslations } from "next-intl";
import { alertService, AlertType } from "../../services";

export { Alert };

Alert.propTypes = {
    id: PropTypes.string,
    fade: PropTypes.bool
};

Alert.defaultProps = {
    id: 'default-alert',
    fade: true
};

function Alert({ id, fade } : { id: string, fade: boolean }) {
    const router = useRouter();
    const [alerts, setAlerts] = useState([]);
    const t = useTranslations();

    useEffect(() => {
        // subscribe to new alert notifications
        const subscription = alertService.onAlert(id)
            .subscribe((alert:any) => {
                // clear alerts when an empty alert is received
                if (!alert.message) {
                    setAlerts(alerts => {
                        // filter out alerts without 'keepAfterRouteChange' flag
                        const filteredAlerts = alerts.filter((x:any) => x.keepAfterRouteChange);

                        // set 'keepAfterRouteChange' flag to false on the rest
                        filteredAlerts.forEach((x:any) => delete x.keepAfterRouteChange);
                        return filteredAlerts;
                    });
                } else {
                    // add alert to array
                    // @ts-ignore
                    setAlerts(alerts => ([...alerts, alert]));

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

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const removeAlert = (alert:any) => {
        if (fade) {
            // fade out alert
            const alertWithFade = { ...alert, fade: true };
            setAlerts((alerts:any) => alerts.map((x:any) => x === alert ? alertWithFade : x));

            // remove alert after faded out
            setTimeout(() => {
                setAlerts(alerts => alerts.filter(x => x !== alertWithFade));
            }, 250);
        } else {
            // remove alert
            setAlerts(alerts => alerts.filter(x => x !== alert));
        }
    }

    const cssClasses = (alert:any) => {
        if (!alert) return;

        const classes = ['alert', 'alert-dismissable'];
        const alertTypeClass = {
            [AlertType.Success]: 'alert-success',
            [AlertType.Error]: 'alert-danger',
            [AlertType.Info]: 'alert-info',
            [AlertType.Warning]: 'alert-warning'
        }
        classes.push(alertTypeClass[alert.type]);
        if (alert.fade) {
            classes.push('fade');
        }

        return classes.join(' ');
    }

    const messageHeader = (alert:any) => {
        if (!alert) return;

        const titles = [];
        const alertTypeClass = {
            [AlertType.Success]: 'Success message',
            [AlertType.Error]: 'alert-danger',
            [AlertType.Info]: 'alert-info',
            [AlertType.Warning]: 'alert-warning'
        }
        titles.push(alertTypeClass[alert.type]);

        return titles.join(' ');
    }

    if (!alerts.length) return null;

    return (
        <>
            {alerts.map((alert:any, index:number) =>
                <div key={index} className={cssClasses(alert)}>
                    <div className="flex">
                        <div>
                            <p className="font-bold">{t(messageHeader(alert)||'')}</p>
                            <p className="text-sm" dangerouslySetInnerHTML={{ __html: alert.message }} />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
