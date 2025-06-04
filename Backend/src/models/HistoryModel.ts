import { DataTypes, ModelDefined, Optional } from 'sequelize';

import { sequelize } from '../database';
import { IHistoryInterface } from '../interfaces/history.interface';

import { UserModel } from './UserModel';


type HistoryCreationAttributes = Optional<IHistoryInterface, 'id'>;

const HistoryModel: ModelDefined<IHistoryInterface, HistoryCreationAttributes> = sequelize.define('history', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: UserModel,
      key: 'id',
    },
  },
  query: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  response: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  timestamps: true,
})as ModelDefined<IHistoryInterface, HistoryCreationAttributes>;

export { HistoryModel };

UserModel.hasMany(HistoryModel, { foreignKey: 'userId', as: 'histories' });
HistoryModel.belongsTo(UserModel, { foreignKey: 'userId', as: 'user' });
