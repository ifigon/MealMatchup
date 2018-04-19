import { NotificationType } from '../../Enums.js';
import truckGreen from '../../icons/green_truck.svg';
import truckGrey from '../../icons/grey_truck.svg';

export const NotificationMap = {
    [NotificationType.RECURRING_PICKUP_REQUEST]: {
        iconSrc: truckGreen,
        msg: 'Recurring pickup requested'
    },
    [NotificationType.RECURRING_PICKUP_CONFIRMED]: {
        iconSrc: truckGreen,
        msg: 'A recurring pickup has been claimed'
    },
    [NotificationType.RECURRING_PICKUP_REJECTED_RA]: {
        iconSrc: truckGrey,
        msg: 'A recurring pickup was rejected',
        detailMsg: 'Unfortunately, this recurring pickup was rejected by all notified shelters.'
    },
    [NotificationType.RECURRING_PICKUP_REJECTED_DG]: {
        iconSrc: truckGrey,
        msg: 'A recurring pickup was rejected',
        detailMsg: 'Unfortunately, this recurring pickup was rejected by all participating student groups.'
    },
    [NotificationType.RECURRING_PICKUP_UNAVAILABLE]: {
        iconSrc: truckGrey,
        msg: 'A recurring pickup has been claimed',
        detailMsg: 'Unfortunately, no participating shelter is available during the requested time.'
    }
};