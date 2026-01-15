import KVStore from '../models/KVStore.js';

const list = async (req, res) => {
    try {
        const { pattern } = req.query;
        let filter = {};

        if (pattern) {
            const escaped = pattern.replace(/[.+^${}()|[\]\\]/g, '\\$&');
            const regexStr = '^' + escaped.replace(/\*/g, '.*');
            filter = { key: { $regex: new RegExp(regexStr) } };
        }

        const items = await KVStore.find(filter);

        if (req.query.returnValues === 'true') {
            res.json(items.map(i => ({ key: i.key, value: i.value })));
        } else {
            res.json(items.map(i => i.key));
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
};

const get = async (req, res) => {
    try {
        const item = await KVStore.findOne({ key: req.params.key });
        res.json(item ? item.value : null);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const set = async (req, res) => {
    const { key, value } = req.body;
    try {
        await KVStore.findOneAndUpdate(
            { key },
            { value },
            { upsert: true, new: true }
        );
        res.json({ success: true });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
};

export { list, get, set };
