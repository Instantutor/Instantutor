import React, { useEffect, useState } from "react";

const TestGuideStep = ({step, content}) => {

	const [btnState, setBtnState] = useState(false);

	useEffect(() => {
		document.getElementById(step).style.display = btnState ? "block" : "none";
	}, [btnState]);

	return (
		<>
			<button data-toggle="collapse" data-target={"#" + {step}} className="collapsible" onClick={() => setBtnState(!btnState)}>{step}</button>
			<div id={step} className="collapsible content"><div></div>{content}</div>
		</>
	);
};

export default TestGuideStep;