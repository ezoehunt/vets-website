import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import {
  isPendingTransaction,
  isFailedTransaction
} from '../util/transactions';

import Vet360TransactionInlineErrorMessage from './Vet360TransactionInlineErrorMessage';
import Vet360TransactionPending from './Vet360TransactionPending';

export default class Vet360Transaction extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    refreshTransaction: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    transaction: PropTypes.object
  };

  render() {
    const {
      children,
      refreshTransaction,
      title,
      transaction
    } = this.props;

    const hasError = transaction && isFailedTransaction(transaction);
    const classes = classNames('vet360-profile-field-content', {
      'usa-input-error': hasError
    });

    return (
      <div className={classes}>
        {hasError && <Vet360TransactionInlineErrorMessage {...this.props}/>}
        {transaction && isPendingTransaction(transaction) ? (
          <Vet360TransactionPending title={title} refreshTransaction={refreshTransaction}/>
        ) : children}
      </div>
    );
  }
}
