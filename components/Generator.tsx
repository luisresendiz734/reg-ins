import { useEffect, useState } from "react"
import { Ins, InsFormat } from "../types/Ins"
import styles from "../styles/Add.module.css"

const Generator = () => {
	const [instructions, setInstructions] = useState<Array<Ins>>([])
	const [ins, setIns] = useState("")
	const [format, setFormat] = useState("")
	const [example, setExample] = useState("")
	const [result, setResult] = useState("")
	const [insf, setInsf] = useState("")
	const [insfLen, setInsfLen] = useState(0)
	const [insFormat, setInsFormat] = useState<Array<string>>([])
	const [insFormatLen, setInsFormatLen] = useState<Array<number>>([])
	const [opCode, setOpCode] = useState(0)

	const addInsFormat = () => {
		setInsFormat([...insFormat, insf])
		setInsFormatLen([...insFormatLen, insfLen])
		setInsf("")
		setInsfLen(0)
	}

	const createInstruction = async () => {
		const insfarr: InsFormat[] = []
		for (let i = 0; i < insFormat.length; ++i) {
			insfarr.push({ name: insFormat[i], length: insFormatLen[i] })
		}
		const instruction: Ins = {
			ins,
			format,
			example,
			result,
			ins_format: [...insfarr],
			op_code: opCode,
		}
		console.log("instruction before send", instruction)

		const res = await fetch("/api/file", {
			method: "POST",
			headers: {
				"content-type": "application/json;charset=UTF-8",
			},
			body: JSON.stringify({ instruction }),
		})
		const data = await res.json()
		console.log("data from server", data)
		setInstructions(data.arr)
		setIns("")
		setFormat("")
		setExample("")
		setResult("")
		setInsFormat([])
		setOpCode(0)
	}

	useEffect(() => {
		console.log(insFormat)
	}, [insFormat])

	return (
		<div style={{ display: "flex" }}>
			<div>
				<input
					placeholder="instruction"
					type="text"
					value={ins}
					onChange={(e) => setIns(e.target.value)}
				/>
				<input
					placeholder="format I, R"
					type="text"
					value={format}
					onChange={(e) => setFormat(e.target.value)}
				/>
				<input
					placeholder="example"
					type="text"
					value={example}
					onChange={(e) => setExample(e.target.value)}
				/>
				<input
					placeholder="result"
					type="text"
					value={result}
					onChange={(e) => setResult(e.target.value)}
				/>
				<input
					placeholder="op code"
					type="text"
					value={opCode}
					onChange={(e) => setOpCode(Number.parseInt(e.target.value))}
				/>
				<p>Instruction format</p>
				<input
					placeholder="set inst name"
					type="text"
					value={insf}
					onChange={(e) => setInsf(e.target.value)}
				/>
				<input
					placeholder="set inst len"
					type="text"
					value={insfLen}
					onChange={(e) =>
						setInsfLen(Number.parseInt(e.target.value))
					}
				/>
				<button onClick={addInsFormat}>add ins format</button>
				<button onClick={createInstruction}>create</button>
			</div>
			<div>
				<table
					summary="Instructions available"
					className={styles.border}
				>
					<caption>Instructions available</caption>
					<thead>
						<tr>
							<th className={styles.border}>Instruction</th>
							<th className={styles.border}>Example</th>
							<th className={styles.border}>Result</th>
							<th className={styles.border}>
								Instruction format
							</th>
							<th className={styles.border}>Format</th>
						</tr>
					</thead>
					<tbody>
						{instructions.map((inst, i) => (
							<tr key={i}>
								<td className={styles.border}>{inst.ins}</td>
								<td className={styles.border}>
									{inst.example}
								</td>
								<td className={styles.border}>{inst.result}</td>
								<td className={styles.border}>
									{inst.ins_format.map((insf, j) => (
										<span key={j}>{insf.name} </span>
									))}
								</td>
								<td className={styles.border}>{inst.format}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	)
}

export default Generator
