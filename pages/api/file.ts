import type { NextApiRequest, NextApiResponse } from "next"
import fs from "fs"
import path from "path"

const handler = (req: NextApiRequest, res: NextApiResponse) => {
	const instructions = req.body.instruction
	console.log(instructions)

	const filepath = path.join(
		"C:\\Users\\Luis\\next\\reg-ins",
		"instructions.json"
	)

	let file = null
	try {
		file = fs.readFileSync(filepath, "utf-8")
	} catch (error) {
		console.log("no file exist")
	}
	const arr = JSON.parse(file ?? "[]")
	arr.push(instructions)

	fs.writeFileSync(filepath, JSON.stringify(arr, null, 4), "utf-8")
	res.status(200).json({ arr })
}

export default handler
