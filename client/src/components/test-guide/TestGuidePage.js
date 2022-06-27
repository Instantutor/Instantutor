import React, { Fragment } from "react";
import TestGuideStep from "./TestGuideStep";

const TestGuide = () => {

	const s1 = ["1. Create your profile.", (
		<>
			<p>Greetings!</p>
			<p>Again!!</p>
			<ul>
				<li>Woot</li>
				<li>Woot2</li>
				<li>Woot23</li>
				<li>Woot234</li>
				<li>Woot2345</li>
			</ul>
		</>
	)];

	const s2 = ["2. Create your profile.", (
		<>
			<p>Greetings!</p>
			<p>Again!!</p>
			<ul>
				<li>Woot</li>
				<li>Woot2</li>
				<li>Woot23</li>
				<li>Woot234</li>
				<li>Woot2345</li>
			</ul>
		</>
	)];

	return (
		<>
			<h1>Test User Guide</h1>

			<TestGuideStep step={s1[0]} content={s1[1]} />
			<TestGuideStep step={s2[0]} content={s2[1]} />
		</>
	);
};

export default TestGuide;