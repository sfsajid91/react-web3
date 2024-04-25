import { buildModule } from '@nomicfoundation/hardhat-ignition/modules';

const TransactionsModule = buildModule('TransactionsModule', (m) => {
    const transaction = m.contract('Transactions');

    return { transaction };
});

export default TransactionsModule;
