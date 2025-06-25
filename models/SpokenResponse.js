// ====== models/SpokenResponse.js ======
const spokenSchema = new mongoose.Schema({
  userId: String,
  mockIdRef: String,
  question: String,
  transcript: String,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("SpokenResponse", spokenSchema);
