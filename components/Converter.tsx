import { useEffect, useState } from "react"
import json from "../instructions.json"
import { Ins } from "../types/Ins"
import Instruction from "./Instruction"

const Converter = () => {
	const [instructions, setInstructions] = useState<Array<Ins>>([])
	const [ins, setIns] = useState("")
	const [currentIns, setCurrentIns] = useState<Ins>(null)

	useEffect(() => {
		setInstructions(json)
	}, [])

	useEffect(() => {
		setCurrentIns(null)
		const t = setTimeout(() => {
			const found = instructions.find((i) => i.ins === ins)
			if (found) {
				setCurrentIns(found)
			}
		}, 0)

		return () => {
			clearTimeout(t)
		}
	}, [ins])

	return (
		<div>
			<label htmlFor="instruction">Instruction</label>
			<input
				id="instruction"
				type="text"
				value={ins}
				onChange={(e) => setIns(e.target.value)}
				placeholder="Instruction"
			/>
			{currentIns && <Instruction ins={currentIns} />}
		</div>
	)
}

export default Converter
