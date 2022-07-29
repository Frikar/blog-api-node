const {Counters} = require("../models");

/**
 * @description      Metodo para crear valores autoinc para usar en los _id
 */
async function getNextSequenceValue(sequenceName) {
	let sequenceDocument = await Counters.findOneAndUpdate(
		{_id: sequenceName},
		{$inc: {sequence_value: 1}}, {new: true})
	return sequenceDocument.sequence_value
}

module.exports = {
	getNextSequenceValue
}
