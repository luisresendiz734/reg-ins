export type InsFormat = {
	name: string
	length: number
}

export type Ins = {
	ins: string
	format: string
	example: string
	result: string
	ins_format: Array<InsFormat>
	op_code: number
}
