import mongoose from 'mongoose';

const kvSchema = new mongoose.Schema({
    key: { type: String, required: true, unique: true },
    value: { type: String, required: true }
});

const KVStore = mongoose.model('KVStore', kvSchema);
export default KVStore;
