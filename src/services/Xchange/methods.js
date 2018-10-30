const check = {
	ENUM: (list) => (a) => list.includes(a) ? a : false,
	Number: (a) => Number.isNaN(Number(a)) ? false : Number(a),
	Optional: (defaultValue) => (a) => a || defaultValue
};
export default [
	// ADMIN ONLY
	{
		name: "balance.update",
		role: "admin",
		tokens: [
			"uid",
			"asset",
			"business_type",
			"business_id",
			"change_str",
			"detail"
		],
		handle: {
			uid: check.Number,
			business_id: check.Number,
			change_str: String
		}
	},
	// user scope
	{
		name: "balance.query",
		role: "user",
		tokens: ["uid"],
		handle: {
			uid: check.Number
		}
	},
	{
		name: "balance.history",
		role: "user",
		tokens: [
			"uid",
			"asset",
			"business_type",
			"start_time",
			"end_time",
			"offset",
			"limit"
		],
		handle: {
			uid: check.Number,
			start_time: check.Number,
			end_time: check.Number,
			offset: check.Number,
			limit: check.Number
		}
	},
	{
		name: "order.put_limit",
		role: "user",
		tokens: [
			"uid",
			"market",
			"side",
			"amount",
			"price",
			"taker_fee_rate",
			"maker_fee_rate",
			"source"
		],
		handle: {
			uid: check.Number,
			side: check.Number
			// ENUM([1, 2])
		},
		predefined: {
			taker_fee_rate: "0.0002",
			maker_fee_rate: "0.0001"
		}
	},

	{
		name: "order.pending",
		role: "user",
		tokens: [
			"uid",
			"market",
			"offset",
			"limit"
		],
		handle: {
			uid: check.Number,
			offset: check.Number,
			limit: check.Number
		}
	},
	{
		name: "market.user_deals",
		role: "user",
		tokens: [
			"uid",
			"market",
			"offset",
			"limit"
		],
		handle: {
			uid: check.Number,
			offset: check.Number,
			limit: check.Number
		}
	},
	{
		name: "order.finished",
		role: "user",
		tokens: [
			"uid",
			"market",
			"start_time",
			"end_time",
			"offset",
			"limit",
			"side"
		],
		handle: {
			uid: check.Number,
			side: check.Number,
			start_time: check.Number,
			end_time: check.Number,
			offset: check.Number,
			limit: check.Number

			// ENUM([1, 2])
		}
	},
	{
		name: "order.cancel",
		role: "user",
		tokens: [
			"uid",
			"market",
			"order_id"
		],
		handle: {
			uid: check.Number,
			order_id: check.Number

			// ENUM([1, 2])
		}
	},
	{
		name: "order.put_market",
		role: "user",
		tokens: [
			"uid",
			"market",
			"side",
			"amount",
			"taker_fee_rate",
			"source"
		],
		handle: {
			uid: check.Number,
			side: check.Number
			// ENUM([1, 2])
		},
		predefined: {
			taker_fee_rate: "0.0002"
		}
	},
	// public scope
	{
		name: "asset.list",
		role: "public",
		tokens: []
	},
	{
		name: "asset.summary",
		role: "public",
		tokens: []
	},
	{
		name: "order.depth",
		role: "public",
		tokens: [
			"market",
			"limit",
			"interval"
		],
		handle: {
			limit: check.Number,
			interval: check.Optional("0")
		}
	},
	{
		name: "market.last",
		role: "public",
		tokens: ["market"]
	},
	{
		name: "market.list",
		role: "public",
		tokens: []
	},
	{
		name: "market.deals",
		role: "public",
		tokens: [
			"market",
			"limit",
			"last_id"
		],
		handle: {
			limit: check.Number,
			last_id: check.Number
		}
	},
	{
		name: "market.status_today",
		role: "public",
		tokens: ["market"]
	},
	{
		name: "market.summary",
		role: "public",
		tokens: ["market"]
	},
	{
		name: "order.finished_detail",
		role: "public",
		tokens: ["order_id"],
		handle: {
			order_id: check.Number
		}
	},

	//ws methods
	{
		name: "server.ping",
		role: "public",
		tokens: []
	},
	{
		name: "depth.subscribe",
		role: "public",
		tokens: []
	},
	{
		name: "market.status",
		role: "public",
		tokens: [
			"market",
			"period"
		],
		handle: {
			period: check.Number
		}
	},
	{
		name: "market.kline",
		role: "public",
		tokens: [
			"market",
			"start",
			"end",
			"interval"
		],
		handle: {
			start: check.Number,
			end: check.Number,
			interval: check.Number
		}
	},
	{
		name: "order.pending_detail",
		role: "public",
		tokens: [
			"market",
			"order_id"
		],
		handle: {
			order_id: check.Number
		}
	},
	{
		name: "order.book",
		role: "public",
		tokens: [
			"market",
			"side",
			"offset",
			"limit"
		],
		handle: {
			side: check.Number,
			offset: check.Number,
			limit: check.Number
		}
	},
	{
		name: "order.deals",
		role: "public",
		tokens: [
			"order_id",
			"offset",
			"limit"
		],
		handle: {
			side: check.Number,
			order_id: check.Number,
			limit: check.Number
		}
	}
];
