// controllers/factory.js
const asyncHandler = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);

function buildQuery(Model, req, { text = [], filterable = [] } = {}) {
  const { q, page = 1, limit = 50, sort, fields } = req.query;

  // base filter
  const filter = {};
  for (const k of filterable) {
    if (req.query[k]) filter[k] = req.query[k];
  }
  // admite arrays tipo ?materials=acero&materials=vidrio
  for (const k of filterable) {
    if (Array.isArray(req.query[k])) filter[k] = { $in: req.query[k] };
  }

  // text search (regex OR)
  if (q && text.length) {
    filter.$or = text.map((path) => ({ [path]: { $regex: q, $options: 'i' } }));
  }

  const select = fields ? fields.split(',').join(' ') : undefined;
  const sortBy = sort ? sort.split(',').join(' ') : undefined;

  const p = Math.max(parseInt(page, 10), 1);
  const l = Math.min(Math.max(parseInt(limit, 10), 1), 100);
  const skip = (p - 1) * l;

  const cursor = Model.find(filter).select(select).sort(sortBy).skip(skip).limit(l).lean();

  return { filter, cursor, page: p, limit: l };
}

function makeCrudController(Model, opts = {}) {
  const list = asyncHandler(async (req, res) => {
    const { cursor, filter, page, limit } = buildQuery(Model, req, opts);
    const [items, total] = await Promise.all([cursor, Model.countDocuments(filter)]);
    res.json({ items, page, limit, total, pages: Math.ceil(total / limit) });
  });

  const get = asyncHandler(async (req, res) => {
    const doc = await Model.findById(req.params.id).lean();
    if (!doc) return res.status(404).json({ message: 'Not found' });
    res.json(doc);
  });

  const create = asyncHandler(async (req, res) => {
    const doc = await Model.create(req.body);
    res.status(201).json(doc);
  });

  const update = asyncHandler(async (req, res) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }).lean();
    if (!doc) return res.status(404).json({ message: 'Not found' });
    res.json(doc);
  });

  const remove = asyncHandler(async (req, res) => {
    const doc = await Model.findByIdAndDelete(req.params.id).lean();
    if (!doc) return res.status(404).json({ message: 'Not found' });
    res.json({ message: 'Deleted' });
  });

  return { list, get, create, update, remove };
}

module.exports = { makeCrudController };