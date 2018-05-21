import { expect } from 'chai';
import scheduledDowntime from '../reducer';
import { RECEIVE_SCHEDULED_DOWNTIME } from '../actions';

describe('Downtime Notification Reducer', () => {
  describe('scheduledDowntime', () => {
    const scheduledDowntimeInterface = ['isReady', 'serviceMap'];
    it('returns the initial state', () => {
      const result = scheduledDowntime(undefined, { type: 'SHOULD_NOT_MATTER' });
      expect(result).to.have.all.keys(scheduledDowntimeInterface);
    });
    it('flips the isReady flag and sets value when RECEIVE_SCHEDULED_DOWNTIME is dispatched', () => {
      const map = new Map();
      const action = { type: RECEIVE_SCHEDULED_DOWNTIME, map };
      const result = scheduledDowntime(undefined, action);

      expect(result).to.have.all.keys(scheduledDowntimeInterface);
      expect(result.serviceMap).to.be.equal(map);
    });
  });
});
