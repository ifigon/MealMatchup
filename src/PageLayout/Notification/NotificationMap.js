import { NotificationType,NotificationContentType } from '../../Enums.js';
import truckGreen from '../../icons/green_truck.svg';
import truckGrey from '../../icons/grey_truck.svg';
import truckRed from '../../icons/red_truck.svg';

export const NotificationMap = {
    [NotificationType.RECURRING_PICKUP_REQUEST]: {
        iconSrc: truckGreen,
        msg: 'Recurring pickup requested',
        color: 'green',
        contentType: NotificationContentType.DELIVERY_REQUEST
    },
    [NotificationType.RECURRING_PICKUP_CONFIRMED]: {
        iconSrc: truckGreen,
        msg: 'A recurring pickup has been confirmed and scheduled',
        color: 'green',
        contentType: NotificationContentType.DELIVERY_REQUEST
    },
    [NotificationType.RECURRING_PICKUP_REJECTED_RA]: {
        iconSrc: truckGrey,
        msg: 'A recurring pickup was rejected',
        detailMsg: 'Unfortunately, this recurring pickup was rejected by all notified shelters.',
        color: 'grey',
        contentType: NotificationContentType.DELIVERY_REQUEST
    },
    [NotificationType.RECURRING_PICKUP_REJECTED_DG]: {
        iconSrc: truckGrey,
        msg: 'A recurring pickup was rejected',
        detailMsg: 'Unfortunately, this recurring pickup was rejected by all participating student groups.',
        color: 'grey',
        contentType: NotificationContentType.DELIVERY_REQUEST
    },
    [NotificationType.RECURRING_PICKUP_UNAVAILABLE]: {
        iconSrc: truckGrey,
        msg: 'No available shelters for recurring pickup',
        detailMsg: 'Unfortunately, no participating shelter is available during the requested time.',
        color: 'grey',
        contentType: NotificationContentType.DELIVERY_REQUEST
    },
    [NotificationType.EMERGENCY_PICKUP_REQUESTED]: {
        iconSrc: truckRed,
        msg: 'Emergency pickup requested',
        color: 'red',
        contentType: NotificationType.EMERGENCY_PICKUP_REQUESTED
    }
};