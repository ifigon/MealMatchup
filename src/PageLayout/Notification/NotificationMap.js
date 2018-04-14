import { NotificationType } from '../../Enums.js';
import truckG from '../../icons/green_truck.svg';

export const NotificationMap = {
    [NotificationType.RECURRING_PICKUP_REQUEST]: {
        iconSrc: truckG,
        msg: 'Recurring pickup requested'
    },
    [NotificationType.RECURRING_PICKUP_CONFIRMED]: {
        iconSrc: truckG,
        msg: 'A recurring pickup has been claimed'
    }
};