import { BadRequestError, NotFoundError } from '../../errors/error-handlers';
import { IHistoryInterface } from '../../interfaces/history.interface';
import { HistoryModel } from '../../models/HistoryModel';

export const saveHistory = async (historyData: IHistoryInterface) => {
  try {
    const history = await HistoryModel.create(historyData);
    return history;
  } catch (error: unknown) {
    throw new BadRequestError(`Error saving history: ${error}`, 'saveHistory() method');
  }
};

export const getHistory = async (id: string) => {
  try {
    const history = await HistoryModel.findOne({ where: { id }});

    if (!history) {
        throw new NotFoundError('History not found', 'getHistory() method error');
      }

      return history;
  } catch (error: unknown) {
    throw new BadRequestError(`Error: ${error}`, 'getHistory() method');
  }
};

export const getUserHistories = async (userId: string) => {
  try {
    const histories = await HistoryModel.findAll({ where: { userId }});

    if (!histories) {
        throw new NotFoundError('Histories not found', 'getUserHistories() method error');
      }

      return history;
  } catch (error: unknown) {
    throw new BadRequestError(`Error: ${error}`, 'getUserHistories() method');
  }
};
