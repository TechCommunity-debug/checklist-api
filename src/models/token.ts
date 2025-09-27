import { Schema, model, Types } from 'mongoose';

interface IToken {
  userId: Types.ObjectId;
  token: string;
}

const tokenSchema = new Schema<IToken>({
  userId: {
    type: Schema.Types.ObjectId,
    require: true,
  },
  token: {
    type: String,
    require: true,
  },
});

export default model<IToken>('Token', tokenSchema);
