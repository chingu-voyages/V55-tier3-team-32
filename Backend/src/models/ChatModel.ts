import { DataTypes, ModelDefined, Optional } from 'sequelize';

import { sequelize } from '../database';
import { IChatInterface } from '../interfaces/chat.interface';

import { UserModel } from './UserModel';


type ChatCreationAttributes = Optional<IChatInterface, 'id'>;

const ChatModel: ModelDefined<IChatInterface, ChatCreationAttributes> = sequelize.define('chat', {
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
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  history: {
    type: DataTypes.ARRAY(DataTypes.JSON),
    allowNull: false,
    defaultValue: [],
  },
}, {
  timestamps: true,
})as ModelDefined<IChatInterface, ChatCreationAttributes>;

export { ChatModel };

UserModel.hasMany(ChatModel, { foreignKey: 'userId', as: 'chats' });
