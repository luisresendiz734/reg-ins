import { FC, useEffect, useState } from "react"
import { Ins } from "../types/Ins"

const completeBinaryTo = (str: string, len: number) => {
	let ans = ""
	while (ans.length < len - str.length) ans += "0"
	return ans + str
}

const format = (number: string, length: number) => {
	let str = ""
	if (length > 10) {
		const arr = number.split("")
		arr.forEach((n) => {
			str += completeBinaryTo(Number(n).toString(2), 4)
		})

		return completeBinaryTo(str, length)
	}
	console.log(number, Number(number).toString(2))
	return completeBinaryTo(Number(number).toString(2), length)
}

const Instruction: FC<{ ins: Ins }> = ({ ins }) => {
	const [state, setState] = useState<Array<{ value: string; len: number }>>(
		[]
	)

	const handleChange = (value: string, index: number, len: number) => {
		const arr = [...state]
		arr[index] = {
			value,
			len,
		}
		setState([...arr])
	}

	useEffect(() => {
		setState([
			{
				value: ins.ins_format[0].name,
				len: ins.ins_format[0].length,
			},
			{
				value: "",
				len: 0,
			},
			{
				value: "",
				len: 0,
			},
			{
				value: "",
				len: 0,
			},
			{
				value: "",
				len: 0,
			},
			{
				value: "",
				len: 0,
			},
			{
				value: "",
				len: 0,
			},
			{
				value: "",
				len: 0,
			},
			{
				value: "",
				len: 0,
			},
			{
				value: "",
				len: 0,
			},
		])
	}, [])

	return (
		<div>
			<div>
				<label htmlFor={ins.ins}>OP CODE</label>
				<input id={ins.ins} type="text" value={ins.op_code} readOnly />
			</div>
			{ins.ins_format.map((inf, i) => {
				if (i > 0) {
					return (
						<div key={i}>
							<label htmlFor={inf.name}>{inf.name}</label>
							<input
								type="text"
								id={inf.name}
								name={inf.name}
								placeholder={inf.name}
								value={state[i]?.value ?? ""}
								onChange={(e) =>
									handleChange(e.target.value, i, inf.length)
								}
							/>
						</div>
					)
				}

				return null
			})}
			<h3>Result</h3>
			<p>{ins.result}</p>
			<h3>Memory instructions</h3>
			<p>
				{state?.length > 0 &&
					state.map((el, i) => {
						if (!el.value.length) return null
						return <span key={i}>{format(el.value, el.len)} </span>
					})}
			</p>
		</div>
	)
}

export default Instruction
